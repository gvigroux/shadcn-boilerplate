"use server";

import { PasswordResetToken, User, VerificationToken } from "@prisma/client";
import { promises as fs } from "fs";

var nodemailer = require("nodemailer");

export async function sendPasswordResetEmail(
  user: User,
  token: PasswordResetToken
) {
  const resetLink =
    process.env.NEXTAUTH_URL + "/auth/new-password?token=" + token.token || "";

  let htmlContent = await fs.readFile(
    process.cwd() + "/templates/verification.html",
    "utf8"
  );

  htmlContent = htmlContent.replaceAll("{name}", user.name || "");
  htmlContent = htmlContent.replaceAll("{url}", resetLink);

  sendEmail(user.email || "", "Reset your password", "nothing", htmlContent);
}

export async function sendVerificationEmail(
  user: User,
  token: VerificationToken
) {
  let htmlContent = await fs.readFile(
    process.cwd() + "/templates/verification.html",
    "utf8"
  );

  htmlContent = htmlContent.replaceAll("{name}", user.name || "");
  htmlContent = htmlContent.replaceAll(
    "{url}",
    process.env.NEXTAUTH_URL + "/auth/verification?token=" + token.token || ""
  );

  sendEmail(user.email || "", "Email verification", "nothing", htmlContent);
}

export async function sendEmail(
  email: string,
  subject: string,
  text: string | undefined,
  html: string | undefined
) {
  var transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.SMTP_HOST,
    port: +(process.env.SMTP_PORT || 0),
    secure: (process.env.SMTP_SECURE || "").toLowerCase() == "true", // use TLS
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SMTP_OPTIONS_FROM,
    to: email,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
