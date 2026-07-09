type SendInviteEmailInput = {
  to: string;
  parentName: string | null;
  playerName: string;
  inviteLink: string;
};

type SendAdminLoginEmailInput = {
  loginLink: string;
  to: string;
};

type ResendEmailResponse = {
  id?: string;
  message?: string;
  name?: string;
};

async function readResendResponse(response: Response) {
  try {
    return (await response.json()) as ResendEmailResponse;
  } catch {
    return {} as ResendEmailResponse;
  }
}

function getRequiredEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim().replace(/^Bearer\s+/i, "");
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    return null;
  }

  return {
    apiKey,
    from,
    replyTo: process.env.RESEND_REPLY_TO_EMAIL?.trim() || undefined,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendParentInviteEmail({
  to,
  parentName,
  playerName,
  inviteLink,
}: SendInviteEmailInput) {
  const config = getRequiredEmailConfig();

  if (!config) {
    return {
      ok: false,
      error: "Resend environment variables are not available yet.",
    };
  }

  const greetingName = parentName?.trim() || "there";
  const escapedGreetingName = escapeHtml(greetingName);
  const escapedPlayerName = escapeHtml(playerName);
  const escapedInviteLink = escapeHtml(inviteLink);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to,
      reply_to: config.replyTo,
      subject: "Join Top Dog Hoops",
      html: `
        <div style="font-family: Arial, sans-serif; color: #241000; line-height: 1.5;">
          <h1 style="font-size: 28px; margin-bottom: 12px;">Top Dog Hoops</h1>
          <p>Hi ${escapedGreetingName},</p>
          <p>${escapedPlayerName} has been invited to join Top Dog Hoops. Tap below to confirm the player profile and get started.</p>
          <p style="margin: 28px 0;">
            <a href="${escapedInviteLink}" style="background: #167b3a; color: #ffffff; padding: 14px 18px; border-radius: 10px; display: inline-block; font-weight: 700; text-decoration: none;">
              Join Top Dog Hoops
            </a>
          </p>
          <p>If the button does not work, copy and paste this link into your browser:</p>
          <p><a href="${escapedInviteLink}">${escapedInviteLink}</a></p>
        </div>
      `,
      text: `Hi ${greetingName},

${playerName} has been invited to join Top Dog Hoops. Tap below to confirm the player profile and get started.

${inviteLink}`,
    }),
  });

  const result = await readResendResponse(response);

  if (!response.ok) {
    return {
      ok: false,
      error: result.message ?? result.name ?? "Resend could not send email.",
    };
  }

  return {
    ok: true,
    id: result.id,
  };
}

export async function sendAdminLoginEmail({
  loginLink,
  to,
}: SendAdminLoginEmailInput) {
  const config = getRequiredEmailConfig();

  if (!config) {
    return {
      ok: false,
      error: "Resend environment variables are not available yet.",
    };
  }

  const escapedLoginLink = escapeHtml(loginLink);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to,
      reply_to: config.replyTo,
      subject: "Your Top Dog Hoops admin sign-in link",
      html: `
        <div style="font-family: Arial, sans-serif; color: #241000; line-height: 1.5;">
          <h1 style="font-size: 28px; margin-bottom: 12px;">Top Dog Hoops Admin</h1>
          <p>Use this secure link to sign in to the admin dashboard. It expires in 15 minutes.</p>
          <p style="margin: 28px 0;">
            <a href="${escapedLoginLink}" style="background: #167b3a; color: #ffffff; padding: 14px 18px; border-radius: 10px; display: inline-block; font-weight: 700; text-decoration: none;">
              Sign In To Admin
            </a>
          </p>
          <p>If you did not request this, you can ignore this email.</p>
          <p>If the button does not work, copy and paste this link into your browser:</p>
          <p><a href="${escapedLoginLink}">${escapedLoginLink}</a></p>
        </div>
      `,
      text: `Use this secure link to sign in to the Top Dog Hoops admin dashboard. It expires in 15 minutes.

${loginLink}

If you did not request this, you can ignore this email.`,
    }),
  });

  const result = await readResendResponse(response);

  if (!response.ok) {
    return {
      ok: false,
      error: result.message ?? result.name ?? "Resend could not send email.",
    };
  }

  return {
    ok: true,
    id: result.id,
  };
}
