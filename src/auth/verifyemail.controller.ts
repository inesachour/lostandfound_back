import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { VerifyemailService } from './verifyemail.service';
import { UsersService } from '../users/users.service';
import { ResponseError, ResponseSuccess } from './reponse.dto';

@Controller('auth/v2/')
export class verifyemailController {
  constructor(
    private readonly verifyemailService: VerifyemailService,
    private readonly userService: UsersService,
  ) {}

  @Post('email/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      await this.verifyemailService.createEmailToken(newUser.email);
      console.log('ok');
      const sent = await this.verifyemailService.sendEmailVerification(
        newUser.email,
      );
      console.log('ok');
      if (sent) {
        return newUser;
      } else {
        return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
      }
    } catch (error) {
      return new ResponseError('REGISTRATION.ERROR.GENERIC_ERROR');
    }
  }

  @Get('email/verify/:token')
  public async verifyEmail(@Param() params) {
    try {
      const isEmailVerified = await this.verifyemailService.verifyEmail(
        params.token,
      );
      return new ResponseSuccess('LOGIN.EMAIL_VERIFIED');
    } catch (error) {
      return new ResponseError('LOGIN.ERROR');
    }
  }

  @Get('email/resend-verification/:email')
  public async sendEmailVerification(@Param() params) {
    try {
      await this.verifyemailService.createEmailToken(params.email);
      const isEmailSent = await this.verifyemailService.sendEmailVerification(
        params.email,
      );
      if (isEmailSent) {
        return new ResponseSuccess('LOGIN.EMAIL_RESENT');
      } else {
        return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
      }
    } catch (error) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL');
    }
  }
}