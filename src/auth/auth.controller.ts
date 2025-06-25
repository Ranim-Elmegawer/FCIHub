import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './request/login.request';
import { Response } from 'express';
import { RegisterUserRequest } from './request/register-user.request';
import { UserResponse } from 'src/user/response/user.response';
import { Public } from './decorator/public.decorator';
import { RegisterAdminRequest } from './request/register-admin.request';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post('login-user')
    async loginUser(@Body() data: LoginRequest, @Res() res: Response) {
        const token = await this.authService.loginUser(data);

        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    }

    @Public()
    @Post('login-admin')
    async loginAdmin(@Body() data: LoginRequest, @Res() res: Response) {
        const token = await this.authService.loginAdmin(data);
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    }



    @Post('register-user')
    @Public()
    async register(@Body() data: RegisterUserRequest, @Res() res: Response) {
        const user = await this.authService.registerUser(data);

        return res.status(201).json({
            message: 'User registered successfully',
            data: new UserResponse(user),
        });
    }

    @Post('register-admin')
    @Public()
    async registerAdmin(@Body() data: RegisterAdminRequest, @Res() res: Response) {
        const user = await this.authService.registerAdmin(data);

        return res.status(201).json({
            message: 'Admin registered successfully',
            data: new UserResponse(user),
        });
    }

    @Post('forgot-password')
    @Public()
    async forgotPassword(@Body('email') email: string) {
        return this.authService.requestPasswordReset(email);
    }

    @Post('verify-reset-code')
    @Public()
    async verifyCode(@Body('email') email: string, @Body('code') code: string) {
        return this.authService.verifyResetCode(email, code);
    }

    @Post('reset-password')
    @Public()
    async resetPassword(
        @Body('email') email: string,
        @Body('code') code: string,
        @Body('newPassword') newPassword: string
    ) {
        return this.authService.resetPassword(email, code, newPassword);
    }





}
