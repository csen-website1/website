// import connectToDatabase from "@/lib/db";

// import type { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/user";

// export default async function POST(req: NextRequest, res: NextResponse) {
//   const { body } = req;
//   const { email, message } = body;

//   if (!email || !email.includes("@")) {
//     return res.json();
//   }

//   if (!message || message.trim() === "") {
//     return res.json();
//   }

//   try {
//     await connectToDatabase();

//     const existingUser = await User.findOne({
//       email: email,
//     });
//     if (!existingUser) {
//       const user = await User.create({
//         ...body,
//         message: [
//           {
//             text: message,
//             date: new Date(),
//           },
//         ],
//       });
//       await user.save();
//       return res.json();
//     }
//     existingUser.message.push({
//       text: message,
//       date: new Date(),
//     });
//     await existingUser.save();
//     return res.json();
//   } catch (error) {
//     return res.json();
//   }
// }

// // export async function POST(req: NextApiRequest, res: NextApiResponse) {
// //   // ...

// //   try {
// //     await connectToDatabase();

// //     const existingUser = await User.findOne({
// //       email: req.body.email,
// //     });
// //     if (!existingUser) {
// //       const user = await User.create({
// //         ...req.body,
// //         message: [
// //           {
// //             text: req.body.message,
// //             date: new Date(),
// //           },
// //         ],
// //       });
// //       await user.save();
// //       res.status(200).json({ message: "User created" });
// //       return;
// //     }
// //     existingUser.message.push({
// //       text: req.body.message,
// //       date: new Date(),
// //     });
// //     await existingUser.save();
// //     res.status(200).json({ message: "Message added" });
// //     return;
// //   } catch (error) {
// //     res.status(500).json({ error: error });
// //   }
// // }
