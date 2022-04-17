import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){

    }

    async validateUserByPassword(loginAttempt: LoginUserDto) {

        // This will be used for the initial login
        let userToAttempt:any = await this.usersService.findOneByEmail(loginAttempt.email);
        return new Promise( (resolve) => {
            if(userToAttempt)
            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, async (err, isMatch) => {
                if(err) resolve( new UnauthorizedException(
                    "an error has been occured, please try again"
                ));    
                if(isMatch){
                    // If there is a successful match, generate a JWT for the user
                    if(await this.usersService.CheckVerified(loginAttempt.email))
                    resolve(this.createJwtPayload(userToAttempt));
                    else 
                    resolve(new UnauthorizedException(
                        "You have to verify your email first"
                    ))
    
                } else {
                    resolve(new UnauthorizedException(
                        "password is wrong"
                    )
                      );
                }
    
            });
            else
            resolve (
                new HttpException(
                    'Email is wrong',
                     HttpStatus.NOT_FOUND,)
            )
        });

    }

    async validateUserByJwt(payload: JwtPayload) { 

        // This will be used when the user has already logged in and has a JWT
        let user = await this.usersService.findOneByEmail(payload.email);

        if(user){
            return this.createJwtPayload(user);
        } else {

            return new UnauthorizedException(
                "User doesn't exist"
            ) ;
        }

    }

    createJwtPayload(user){

        let data: JwtPayload = {
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt , 
            user: user ,         
        }

    }

}
