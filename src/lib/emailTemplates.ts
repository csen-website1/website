// Pre-built email templates for admin replies with HTML formatting

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

// Available placeholders: {{name}}, {{firstName}}, {{lastName}}, {{company}}, {{email}}, {{interest}}
export const emailTemplates: EmailTemplate[] = [
  {
    id: "thank-you",
    name: "Accusé de réception",
    subject: "Merci pour votre message - CSEN",
    body: `Nous avons bien reçu votre message et nous vous en remercions.

Notre équipe examine actuellement votre demande concernant <strong>{{interest}}</strong> et reviendra vers vous dans les plus brefs délais.

N'hésitez pas à nous contacter si vous avez des questions supplémentaires.`,
  },
  {
    id: "quote-request",
    name: "Demande de devis",
    subject: "Demande d'informations complémentaires - CSEN",
    body: `Merci pour l'intérêt que vous portez à nos services.

Afin de vous établir un devis personnalisé pour <strong>{{interest}}</strong>, nous aurions besoin de quelques informations complémentaires :

<ul>
  <li>Description détaillée du projet</li>
  <li>Délais souhaités</li>
  <li>Budget estimatif</li>
</ul>

N'hésitez pas à nous répondre directement à cet email avec ces informations.`,
  },
  {
    id: "follow-up",
    name: "Suivi de demande",
    subject: "Suivi de votre demande - CSEN",
    body: `Nous faisons suite à votre demande concernant <strong>{{interest}}</strong>.

Nous souhaitions vous informer que votre dossier est en cours de traitement. Notre équipe technique analyse vos besoins et vous contactera prochainement avec une proposition adaptée.

Si vous avez des questions entre-temps, n'hésitez pas à nous contacter.`,
  },
  {
    id: "service-info",
    name: "Information services",
    subject: "Informations sur nos services - CSEN",
    body: `Merci pour votre intérêt pour nos solutions en <strong>{{interest}}</strong>.

CSEN propose une gamme complète de services en ingénierie structurelle et analyse numérique :

<ul>
  <li><strong>Études et calculs de structures</strong> - Analyse avancée de structures</li>
  <li><strong>Modélisation numérique</strong> - Simulations et optimisations</li>
  <li><strong>Plugin RPA</strong> - Pour Robot Structural Analysis</li>
  <li><strong>CSEN Cloud</strong> - Solutions en ligne innovantes</li>
</ul>

Nous serions ravis de discuter de votre projet plus en détail. <strong>Êtes-vous disponible pour un appel cette semaine ?</strong>`,
  },
  {
    id: "custom",
    name: "Message personnalisé",
    subject: "CSEN - ",
    body: ``,
  },
];

// Replace placeholders in template with actual user data
export function applyTemplatePlaceholders(
  template: string,
  userData: {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    email?: string;
    interest?: string;
  }
): string {
  let result = template;
  
  result = result.replace(/\{\{name\}\}/g, `${userData.firstName || ""} ${userData.lastName || ""}`.trim());
  result = result.replace(/\{\{firstName\}\}/g, userData.firstName || "");
  result = result.replace(/\{\{lastName\}\}/g, userData.lastName || "");
  result = result.replace(/\{\{company\}\}/g, userData.companyName || "votre entreprise");
  result = result.replace(/\{\{email\}\}/g, userData.email || "");
  result = result.replace(/\{\{interest\}\}/g, userData.interest || "nos services");
  
  return result;
}

// Get template by ID
export function getTemplateById(id: string): EmailTemplate | undefined {
  return emailTemplates.find((t) => t.id === id);
}

// Generate full HTML email with CSEN branding
export function generateHTMLEmail(firstName: string, content: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f6f9fc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 32px 40px; text-align: center;">
              <img src="https://csen-dz.com/csen_logo_w.png" alt="CSEN" width="120" style="display: block; margin: 0 auto;">
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 18px; font-weight: 600; color: #1e3a5f; margin: 0 0 24px 0; line-height: 28px;">
                Bonjour ${firstName},
              </p>
              <div style="font-size: 16px; line-height: 26px; color: #374151;">
                ${content.replace(/\n/g, "<br/>")}
              </div>
            </td>
          </tr>
          
          <!-- Signature -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="font-size: 16px; line-height: 26px; color: #374151; margin: 32px 0 0 0;">
                Cordialement,<br/>
                <strong>L'équipe CSEN</strong>
              </p>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0;">
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px 40px; text-align: center;">
              <img src="https://csen-dz.com/csen_logo.png" alt="CSEN" width="80" style="display: block; margin: 0 auto 16px auto; opacity: 0.8;">
              <p style="font-size: 14px; color: #6b7280; margin: 0 0 8px 0;">
                CSEN - Structural Engineering & Numerical Solutions
              </p>
              <p style="font-size: 14px; color: #6b7280; margin: 0 0 16px 0;">
                <a href="https://csen-dz.com" style="color: #3b82f6; text-decoration: none;">Site Web</a>
                &nbsp;•&nbsp;
                <a href="mailto:contact@csen-dz.com" style="color: #3b82f6; text-decoration: none;">Contact</a>
              </p>
              <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                © 2024 CSEN. Tous droits réservés.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
