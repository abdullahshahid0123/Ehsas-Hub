const nodemailer = require("nodemailer");
require("dotenv").config();

async function SendMailRequest(name, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp' for custom configuration
    auth: {
      user: process.env.MAILUSER, // Your email
      pass: process.env.MAILPASS, // Your email password
    },
  });





  
  // Define the email options
  const mailOptions = {
    from: "Ehsas Hub <ehsashubb@gmail.com>",
    to: email,
    subject: "Your Registration Request Has Been Submitted Successfully!",
    html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Request Submitted</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .email-header {
              background-color: #0d6efd;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .email-body {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
          }
          .email-body h2 {
              color: #0d6efd;
          }
          .email-footer {
              background-color: #f1f1f1;
              padding: 15px;
              text-align: center;
              color: #666666;
              font-size: 14px;
          }
      </style>
  </head>
  <body>

  <div class="email-container">
      <div class="email-header">
          <h1>Ehsas Hub</h1>
      </div>
      <div class="email-body">
          <h2>Registration Request Submitted Successfully</h2>
          <p>Dear ${name},</p>
          <p>We have received your registration request for Ehsas Hub. Our team is currently reviewing your application.</p>
          <p>Please allow some time for the approval process. Once your account is approved, you will receive an email notification, and you will be able to log in to your account.</p>
          <p>If you have any questions in the meantime, feel free to contact our support team.</p>
      </div>
      <div class="email-footer">
          &copy; 2024 Ehsas Hub. All rights reserved.
      </div>
  </div>

  </body>
  </html>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

async function SendMailApproveUser(name, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp' for custom configuration
    auth: {
      user: process.env.MAILUSER, // Your email
      pass: process.env.MAILPASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Ehsas Hub <ehsashubb@gmail.com>",
    to: email,
    subject: "Congratulations! Your Ehsas Hub Account Has Been Approved",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Approved Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .email-header {
                background-color:  #0d6efd;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .email-body {
                padding: 20px;
                color: #333333;
                line-height: 1.6;
            }
            .email-body h2 {
                color:  #0d6efd;
            }
            .email-footer {
                background-color: #f1f1f1;
                padding: 15px;
                text-align: center;
                color: #666666;
                font-size: 14px;
            }
            .btn {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #ffc107;
                text-decoration: none;
                border-radius: 5px;
            }
            .btn:hover {
                background-color: #e0a800;
            }
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="email-header">
            <h1>Ehsas Hub</h1>
        </div>
        <div class="email-body">
            <h2>Account Approved!</h2>
            <p>Dear ${name},</p>
            <p>We are excited to inform you that your account has been approved! You can now log in and start exploring our platform.</p>
            <p><strong>Reason:</strong> Your application met all our criteria and is aligned with our community goals.</p>
            <a href="https://ehsashub.com/login" class="btn">Log In to Your Account</a>
        </div>
        <div class="email-footer">
            &copy; 2024 Ehsas Hub. All rights reserved.
        </div>
    </div>

    </body>
    </html>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

async function SendMailRejectUser(name, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp' for custom configuration
    auth: {
      user: process.env.MAILUSER, // Your email
      pass: process.env.MAILPASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Ehsas Hub <ehsashubb@gmail.com>",
    to: email,
    subject: "Important Update on Your Ehsas Hub Account Application",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Rejected Email</title>
        <style>
            :root {
                --theme-color: #0d6efd;
                --theme-color2: #ffc107;
            }
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .email-header {
                background-color: var(--theme-color);
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .email-body {
                padding: 20px;
                color: #333333;
                line-height: 1.6;
            }
            .email-body h2 {
                color: var(--theme-color);
            }
            .email-footer {
                background-color: #f1f1f1;
                padding: 15px;
                text-align: center;
                color: #666666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="email-header">
            <h1>Ehsas Hub</h1>
        </div>
        <div class="email-body">
            <h2>Account Rejected</h2>
            <p>Dear ${name}</p>
            <p>Thank you for your interest in joining Ehsas Hub. Unfortunately, we are unable to approve your account at this time.</p>
            <p><strong>Reason:</strong> We regret to inform you that your account request does not meet the required criteria or is incomplete. Please feel free to reach out for further clarification or reapply if you believe your request meets the necessary requirements.</p>
            <p>If you have any questions or would like further clarification, feel free to reach out to us.</p>
        </div>
        <div class="email-footer">
            &copy; 2024 Ehsas Hub. All rights reserved.
        </div>
    </div>

    </body>
    </html>
      `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

async function SendMailVerifyEmail(email) {
  const code = Math.floor(1000 + Math.random() * 9000);

  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp' for custom configuration

    auth: {
      user: process.env.MAILUSER, // Your email
      pass: process.env.MAILPASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.MAILUSER,
    to: email,
    subject: "Verify Your Email Address for Ehsas Hub",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code Email</title>
        <style>
            :root {
                --theme-color: #0d6efd;
                --theme-color2: #ffc107;
            }
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .email-header {
                background-color: var(--theme-color);
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .email-body {
                padding: 20px;
                color: #333333;
                line-height: 1.6;
            }
            .email-body h2 {
                color: var(--theme-color);
            }
            .verification-code {
                display: inline-block;
                background-color: var(--theme-color2);
                color:rgb(88, 88, 88);
                font-size: 18px;
                font-weight: bold;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
            }
            .email-footer {
                background-color: #f1f1f1;
                padding: 15px;
                text-align: center;
                color: #666666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="email-header">
            <h1>Ehsas Hub</h1>
        </div>
        <div class="email-body">
            <h2>Verify Your Email Address</h2>
            
            <p>Thank you for signing up with Ehsas Hub. Please use the verification code below to complete your registration process.</p>
            <div class="verification-code ">${code}</div>
            <p>If you did not request this code, please ignore this email or contact our support team for assistance.</p>
        </div>
        <div class="email-footer">
            &copy; 2024 Ehsas Hub. All rights reserved.
        </div>
    </div>

    </body>
    </html>
    `,
  };

  // Send the email
  try {
    // ✅ Wrap sendMail in a Promise
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    console.log("Email sent:", info.response);
    return code; // ✅ Return the code after email sends
  } catch (error) {
    console.log("Error:", error);
    return null; // Return null on failure
  }
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log("Error:", error);
  //   } else {
  //     console.log("Email sent:", info.response);
  //     return code;
  //   }
  // });
}

async function SendMailFreeze(name, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp' for custom configuration
    auth: {
      user: process.env.MAILUSER, // Your email
      pass: process.env.MAILPASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Ehsas Hub <ehsashubb@gmail.com>",
    to: email,
    subject: "Account Frozen Notice",
    html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Frozen</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .email-header {
              background-color: #17a2b8;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .email-body {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
          }
          .email-body h2 {
              color: #17a2b8;
          }
          .email-footer {
              background-color: #f1f1f1;
              padding: 15px;
              text-align: center;
              color: #666666;
              font-size: 14px;
          }
      </style>
  </head>
  <body>

  <div class="email-container">
      <div class="email-header">
          <h1>Ehsas Hub</h1>
      </div>
      <div class="email-body">
          <h2>Account Frozen Notice</h2>
          <p>Dear ${name},</p>
          <p>We are writing to inform you that your account with Ehsas Hub has been temporarily frozen.</p>
          <p>If you believe this action was taken in error or if you have any questions, please don't hesitate to reach out to our support team for clarification and assistance.</p>
          <p>We apologize for any inconvenience this may cause and thank you for your understanding.</p>
      </div>
      <div class="email-footer">
          &copy; 2024 Ehsas Hub. All rights reserved.
      </div>
  </div>

  </body>
  </html>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = {
  SendMailRequest,
  SendMailApproveUser,
  SendMailRejectUser,
  SendMailVerifyEmail,
  SendMailFreeze,
};
