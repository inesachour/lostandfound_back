import * as nodemailer from 'nodemailer';
import { default as config } from '../config';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/user.interface';
import { EmailVerification } from './interfaces/emailverification.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VerifyemailService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('EmailVerification')
    private readonly emailVerificationModel: Model<EmailVerification>,
  ) {}

  async createEmailToken(email: string) {
    const emailVerification = await this.emailVerificationModel.findOne({
      email: email,
    });
    if (
      emailVerification &&
      (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 <
        10
    ) {
      throw new HttpException(
        'LOGIN.EMAIL_SENT_RECENTLY',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      const emailVerificationModel =
        await this.emailVerificationModel.findOneAndUpdate(
          { email: email },
          {
            email: email,
            emailToken: (
              Math.floor(Math.random() * 9000000) + 1000000
            ).toString(), //Generate 7 digits number
            timestamp: new Date(),
          },
          { upsert: true },
        );
      return true;
    }
  }

  async verifyEmail(token: string) {
    const emailVerif = await this.emailVerificationModel.findOne({
      emailToken: token,
    });
    if (emailVerif && emailVerif.email) {
      const userFromDb = await this.userModel.findOne({
        email: emailVerif.email,
      });
      if (userFromDb) {
        userFromDb.verified = true;
        const savedUser = await userFromDb.save();
        await emailVerif.remove();
        return !!savedUser;
      }
    } else {
      throw new HttpException(
        'LOGIN.EMAIL_CODE_NOT_VALID',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async sendEmailVerification(email: string) {
    const model = await this.emailVerificationModel.findOne({ email: email });
    console.log('loggin hereeeeeeeeeeeee');
    console.log(model);
    console.log(model.email);

    if (model && model.emailToken) {
      const transporter = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        secure: config.mail.secure, // true for 465, false for other ports
        auth: {
          user: config.mail.user,
          pass: config.mail.pass,
        },
      });

      const mailOptions = {
        from: 'lostandfoundgl3@gmail.com',
        to: model.email, // list of receivers (separated by ,)
        subject: 'Verify Email',
        text: 'Verify Email',
        html:
          'Salut! <br><br> Merci pour nous rejoindre !<br><br>' +
          '<a href=' +
          config.host.url +
          ':' +
          config.host.port +
          '/auth/v2/email/verify/' +
          model.emailToken +
          '>Cliquer ici pour activer votre compte</a>', // html body
      };

      const sent = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent i guess: %s', info.messageId);
          resolve(true);
        });
      });

      return sent;
    } else {
      throw new HttpException(
        'REGISTER.USER_NOT_REGISTERED',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
