import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import db from '../models/db.js';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    
    const [userRows] = await db.promise().query('SELECT * FROM user_credintial WHERE email = ?', [email]);
    const user = userRows[0];

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000); 

   
    await db.promise().execute(
      'UPDATE user_credintial SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?',
      [token, expires, email]
    );

   
    const transporter = nodemailer.createTransport({
      
      service: 'Gmail',
      auth: {
        user: 'kh.lasandirandini@gmail.com',
        pass: 'pere cbhd hokw ssbi',
      },
    });

   
    // const mailOptions = {
    //     to: user.email,
    //     from: 'kh.lasandirandini@gmail.com',
    //     subject: 'Password Reset Request',
    //     text: `You are receiving this email because you (or someone else) has requested a password reset. Please click the following link, or paste it into your browser, to complete the process:\n\n
    //     http://localhost:3001/api/passwordRoutes/reset-password?token=${token}\n\n
    //     If you did not request this, please ignore this email and your password will remain unchanged.`,
    //   };
    const mailOptions = {
        to: user.email,
        from: 'kh.lasandirandini@gmail.com',
        subject: 'Password Reset Request',
        text: `You are receiving this email because you (or someone else) has requested a password reset. Please click the following link, or paste it into your browser, to complete the process:\n\n
        http://localhost:5174/PasswordReset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.`,
      };
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).send({ error: 'Failed to send email' });
      }
      res.send({ message: 'Password reset email sent' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};


export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find user by reset token and ensure token hasn't expired
    const [userRows] = await db.promise().query(
      'SELECT * FROM user_credintial WHERE resetPasswordToken = ? AND resetPasswordExpires > ?',
      [token, new Date()]
    );
    const user = userRows[0];

    if (!user) {
      return res.status(400).send({ error: 'Password reset token is invalid or has expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token
    await db.promise().execute(
      'UPDATE user_credintial SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE user_id = ?',
      [hashedPassword, user.user_id]
    );

    res.send({ message: 'Password has been reset successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};
