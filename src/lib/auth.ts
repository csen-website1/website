import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import connectToDatabase from "./db";
import { AdminModel, IAdmin } from "@/models/Admin";

const SALT_ROUNDS = 12;
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Default admin credentials (change these in production via environment variables)
const DEFAULT_ADMIN = {
  email: process.env.DEFAULT_ADMIN_EMAIL || "admin@csen.com",
  password: process.env.DEFAULT_ADMIN_PASSWORD || "Admin@123456",
  firstName: "Super",
  lastName: "Admin",
  role: "superadmin" as const,
};

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare password with hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a simple session token
 */
function generateSessionToken(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const randomPart2 = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}-${randomPart2}`;
}

/**
 * Create a session for an admin user
 */
export async function createSession(adminId: string): Promise<string> {
  const token = generateSessionToken();
  const sessionData = JSON.stringify({
    adminId,
    token,
    createdAt: Date.now(),
  });

  // Encode session data in base64
  const encodedSession = Buffer.from(sessionData).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, encodedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return token;
}

/**
 * Get current session from cookies
 */
export async function getSession(): Promise<{
  adminId: string;
  token: string;
  createdAt: number;
} | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    const sessionData = Buffer.from(sessionCookie.value, "base64").toString(
      "utf-8"
    );
    const session = JSON.parse(sessionData);

    // Check if session is expired (7 days)
    if (Date.now() - session.createdAt > SESSION_MAX_AGE * 1000) {
      await destroySession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Destroy current session (logout)
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Get current authenticated admin
 */
export async function getCurrentAdmin(): Promise<IAdmin | null> {
  const session = await getSession();
  if (!session) return null;

  await connectToDatabase();
  const admin = await AdminModel.findById(session.adminId).select("-password");
  return admin;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const admin = await getCurrentAdmin();
  return admin !== null && admin.isActive;
}

/**
 * Authenticate admin with email and password
 */
export async function authenticateAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; admin?: IAdmin; error?: string }> {
  try {
    await connectToDatabase();

    const admin = await AdminModel.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return { success: false, error: "Invalid email or password" };
    }

    if (!admin.isActive) {
      return { success: false, error: "Account is deactivated" };
    }

    const isValid = await verifyPassword(password, admin.password);

    if (!isValid) {
      return { success: false, error: "Invalid email or password" };
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Create session
    await createSession(admin._id.toString());

    // Return admin without password
    const adminWithoutPassword = admin.toObject();
    delete adminWithoutPassword.password;

    return { success: true, admin: adminWithoutPassword };
  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, error: "Authentication failed" };
  }
}

/**
 * Initialize default admin if no admins exist
 * This should be called on app startup
 */
export async function initializeDefaultAdmin(): Promise<void> {
  try {
    await connectToDatabase();

    const adminCount = await AdminModel.countDocuments();

    if (adminCount === 0) {
      const hashedPassword = await hashPassword(DEFAULT_ADMIN.password);

      await AdminModel.create({
        email: DEFAULT_ADMIN.email,
        password: hashedPassword,
        firstName: DEFAULT_ADMIN.firstName,
        lastName: DEFAULT_ADMIN.lastName,
        role: DEFAULT_ADMIN.role,
        isActive: true,
      });

      console.log("✅ Default admin created successfully");
      console.log(`   Email: ${DEFAULT_ADMIN.email}`);
      console.log(`   Password: ${DEFAULT_ADMIN.password}`);
      console.log("   ⚠️  Please change these credentials after first login!");
    }
  } catch (error) {
    console.error("Error initializing default admin:", error);
  }
}
