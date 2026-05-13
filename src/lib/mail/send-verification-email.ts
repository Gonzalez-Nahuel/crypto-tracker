import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Props = {
  email: string;
  token: string;
};

export const sendVerificationEmail = async ({ email, token }: Props) => {
  const verifyURL = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `
        <h1> Verify your email </h1>

        <a href="${verifyURL}">Click here to verify your account </a>
        `,
  });
};
