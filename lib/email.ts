import nodemailer from 'nodemailer';

interface SendOtpEmailParams {
  to: string;
  otp: string;
  recipientName?: string;
}

export async function sendOtpEmail({ to, otp, recipientName }: SendOtpEmailParams): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const smtpUser = (process.env.GMAIL_USER || process.env.SMTP_USER || '').trim();
    const smtpPass = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

    // Check if email credentials are configured
    if (!smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP/Gmail credentials not configured in .env (GMAIL_USER and GMAIL_APP_PASSWORD).');
      console.log(`[Bank Nova] Real OTP generated for ${to}: ${otp}`);
      return {
        success: true,
        message: `Verification code generated for ${to}.`,
      };
    }

    // Use Gmail service transport or custom SMTP host
    const transporter = smtpUser.includes('@gmail.com')
      ? nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })
      : nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

    const displayName = recipientName ? recipientName : 'Valued Customer';

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bank Nova - Verification Code</title>
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; color: #1e293b; }
        .wrapper { max-width: 580px; margin: 30px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #017bf5 0%, #0052cc 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 36px 32px; text-align: center; }
        .greeting { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
        .message { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 28px; }
        .otp-box { background: #f0f7ff; border: 2px dashed #93c5fd; border-radius: 16px; padding: 22px; display: inline-block; margin-bottom: 26px; min-width: 220px; }
        .otp-code { font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #017bf5; font-family: 'Courier New', Courier, monospace; margin: 0; }
        .expiry { font-size: 12px; color: #64748b; margin-top: 8px; }
        .security-notice { background: #f8fafc; border-radius: 12px; padding: 16px; font-size: 12px; color: #64748b; text-align: left; border-left: 4px solid #017bf5; margin-top: 20px; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Bank Nova</h1>
          <p>Security & Verification</p>
        </div>
        <div class="content">
          <div class="greeting">Hello, ${displayName}</div>
          <p class="message">Thank you for opening an account with Bank Nova. Please use the 6-digit verification code below to verify your email address and complete your registration.</p>
          
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <div class="expiry">Valid for 10 minutes</div>
          </div>

          <div class="security-notice">
            <strong>Security Reminder:</strong> Never share this verification code or your password with anyone. Bank Nova employees will never ask for your one-time password.
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Bank Nova Inc. All rights reserved.<br/>
          Secure Next-Generation Banking
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
      from: `"Bank Nova Security" <${smtpUser}>`,
      to: to.trim(),
      subject: `Your Bank Nova Verification Code: ${otp}`,
      text: `Hello ${displayName},\n\nYour 6-digit Bank Nova verification code is: ${otp}\n\nThis code will expire in 10 minutes. If you did not request this code, please ignore this email.\n\nBank Nova Team`,
      html: htmlContent,
    });

    console.log(`[Bank Nova] Real OTP email successfully delivered to ${to}`);
    return {
      success: true,
      message: `A 6-digit verification code has been sent to ${to}.`,
    };
  } catch (error: any) {
    console.error('Error sending OTP email via nodemailer:', error);
    return {
      success: false,
      error: error?.message || 'Failed to dispatch email verification code.',
      message: 'Failed to send OTP to email.',
    };
  }
}

export async function sendPasswordResetLinkEmail({ to, resetUrl, recipientName }: { to: string; resetUrl: string; recipientName?: string }): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const smtpUser = (process.env.GMAIL_USER || process.env.SMTP_USER || '').trim();
    const smtpPass = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

    if (!smtpUser || !smtpPass) {
      console.log(`[Bank Nova] Password reset link for ${to}: ${resetUrl}`);
      return {
        success: true,
        message: `Password reset link created for ${to}: ${resetUrl}`,
      };
    }

    const transporter = smtpUser.includes('@gmail.com')
      ? nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })
      : nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

    const displayName = recipientName ? recipientName : 'Valued Customer';

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Bank Nova - Password Reset</title>
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; color: #1e293b; }
        .wrapper { max-width: 580px; margin: 30px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #017bf5 0%, #0052cc 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; }
        .content { padding: 36px 32px; text-align: center; }
        .btn { display: inline-block; background-color: #017bf5; color: #ffffff !important; padding: 14px 32px; font-size: 15px; font-weight: 700; border-radius: 12px; text-decoration: none; margin: 24px 0; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Bank Nova</h1>
          <p>Password Reset Request</p>
        </div>
        <div class="content">
          <h2>Hello, ${displayName}</h2>
          <p>We received a request to reset the password for your Bank Nova account.</p>
          <a href="${resetUrl}" class="btn" style="color:#ffffff;">Reset My Password</a>
          <p style="font-size: 12px; color: #64748b; margin-top: 20px;">If you did not request this reset, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Bank Nova Inc. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
      from: `"Bank Nova Security" <${smtpUser}>`,
      to: to.trim(),
      subject: "Reset Your Bank Nova Password",
      text: `Hello ${displayName},\n\nClick the link below to reset your password:\n${resetUrl}\n\nBank Nova Team`,
      html: htmlContent,
    });

    return {
      success: true,
      message: `Password reset instructions have been sent to ${to}.`,
    };
  } catch (err: any) {
    console.error("Error sending reset password email:", err);
    return {
      success: false,
      error: err?.message,
      message: "Failed to dispatch password reset email.",
    };
  }
}
