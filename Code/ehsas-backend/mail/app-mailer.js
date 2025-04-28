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

async function SendMailRejectUser(name, email, comment) {
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
            <p>Thank you for your interest in joining Ehsas Hub. Unfortunately, we are unable to approve your account at this. </p>
            <p><strong>Reason:</strong> We regret to inform you that your account request does not meet the required criteria or is incomplete due to ${comment}. Please feel free to reach out for further clarification or reapply if you believe your request meets the necessary requirements.</p>
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
            
            <p> Please use the verification code below to complete your reset password process.</p>
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

async function SendMailApproveBookDonation(name, email, bookTitle) {
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
    subject: `Congratulations! Your Book Donation Request for "${bookTitle}" Has Been Approved`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Book Donation Approved</title>
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
            <h2>Book Donation Request Approved!</h2>
            <p>Dear ${name},</p>
            <p>We are thrilled to inform you that your book donation request for the book titled <strong>"${bookTitle}"</strong> has been approved!</p>
            <p>Thank you for your generous donation, and we appreciate your contribution to our cause. Your book will make a significant impact in the lives of those who need it the most.</p>
            <p><strong>Next Steps:</strong> Please drop off the book at our donation center, or we will contact you for the pickup details soon.</p>
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

async function SendMailRejectBookDonation(name, email, bookTitle) {
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
    subject: `Update on Your Book Donation Request for "${bookTitle}"`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Book Donation Request Rejected</title>
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
                background-color:  #dc3545;
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
                color:  #dc3545;
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
            <h2>Book Donation Request Rejected</h2>
            <p>Dear ${name},</p>
            <p>We regret to inform you that your book donation request for the book titled <strong>"${bookTitle}"</strong> has not been approved at this time.</p>
            <p>Unfortunately, your request did not meet all of our criteria. We appreciate your willingness to support our cause, and we encourage you to consider donating other books that may align more closely with our community's needs.</p>
            <p>If you would like more information or have any questions, please feel free to reach out to us at <a href="mailto:support@ehsashub.com">support@ehsashub.com</a>.</p>
            <p>Thank you for your understanding and support!</p>
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

async function SendMailVolunteerAccepted(name, email, bookTitle) {
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
    subject: `Great News! A Volunteer Has Accepted Your Donation Request`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Volunteer Accepted Donation</title>
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
                background-color:  #28a745;
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
                color:  #28a745;
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
                background-color: #17a2b8;
                text-decoration: none;
                border-radius: 5px;
            }
            .btn:hover {
                background-color: #138496;
            }
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="email-header">
            <h1>Ehsas Hub</h1>
        </div>
        <div class="email-body">
            <h2>Volunteer Assigned!</h2>
            <p>Dear ${name},</p>
            <p>We are happy to inform you that your book donation request for the book titled <strong>"${bookTitle}"</strong> has been accepted by one of our volunteers.</p>
            <p>The volunteer will contact you shortly to arrange the pickup or coordinate the delivery details.</p>
            <p>Thank you for your generosity and for supporting our cause!</p>
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

async function SendMailBookReceived(name, email, bookTitle) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp' for custom configuration
    auth: {
      user: process.env.MAILUSER, // Your email
      pass: process.env.MAILPASS, // Your email password,
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Ehsas Hub <ehsashubb@gmail.com>",
    to: email,
    subject: `Thank You! We Have Received Your Book Donation`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Book Donation Received</title>
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
                background-color: #20c997;
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
                color: #20c997;
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
                background-color: #0d6efd;
                text-decoration: none;
                border-radius: 5px;
            }
            .btn:hover {
                background-color: #0b5ed7;
            }
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="email-header">
            <h1>Ehsas Hub</h1>
        </div>
        <div class="email-body">
            <h2>Thank You for Your Donation!</h2>
            <p>Dear ${name},</p>
            <p>We are thrilled to let you know that we have successfully received your book donation: <strong>"${bookTitle}"</strong>.</p>
            <p>Your generous contribution will help make a real difference in the lives of those who need it most. We truly appreciate your support and kindness.</p>
            <p>Stay connected with Ehsas Hub to see the impact of your donation!</p>
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

async function SendMailBookRequest(name, email, bookTitle) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Ehsas Hub <ehsashubb@gmail.com>",
    to: email,
    subject: `Request Received: "${bookTitle}"`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Book Request Received</title>
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
                background-color: #ffc107;
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
                color: #ffc107;
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
                background-color: #0d6efd;
                text-decoration: none;
                border-radius: 5px;
            }
            .btn:hover {
                background-color: #0b5ed7;
            }
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="email-header">
            <h1>Ehsas Hub</h1>
        </div>
        <div class="email-body">
            <h2>Book Request Received!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for requesting the book: <strong>"${bookTitle}"</strong>.</p>
            <p>We have received your request and our team is processing it. We will contact you soon once the book is available and ready for you.</p>
            <p>Thank you for trusting Ehsas Hub. We are committed to helping you access the resources you need!</p>
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

async function SendMailBookRequestApproved(name, email, bookTitle) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Ehsas Hub <ehsashubb@gmail.com>",
    to: email,
    subject: `Your Book Request Has Been Approved!`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Book Request Approved</title>
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
                background-color: #198754;
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
                color: #198754;
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
                background-color: #0d6efd;
                text-decoration: none;
                border-radius: 5px;
            }
            .btn:hover {
                background-color: #0b5ed7;
            }
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="email-header">
            <h1>Ehsas Hub</h1>
        </div>
        <div class="email-body">
            <h2>Great News!</h2>
            <p>Dear ${name},</p>
            <p>We are pleased to inform you that your request for the book <strong>"${bookTitle}"</strong> has been <strong>approved</strong>!</p>
            <p>Your book will be delivered to you shortly via <strong>Leopard Courier Service</strong>.</p>
            <p><strong>Please Note:</strong> Courier charges will apply according to your location, and will be payable by you at the time of delivery.</p>
            <p>Thank you for being a part of the Ehsas Hub community. We hope this book benefits you greatly!</p>
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
  SendMailApproveBookDonation,
  SendMailRejectBookDonation,
  SendMailVolunteerAccepted,
  SendMailBookReceived,
  SendMailBookRequest,
  SendMailBookRequestApproved
};
