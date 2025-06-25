import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterUserRequest } from './request/register-user.request';
import { UserAlreadyExistException } from './exception/user-is-already-exist.exception';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from './request/login.request';
import { EmailNotFoundException } from './exception/email-not-found.exception';
import { InvalidPasswordException } from './exception/invalid-password.exception';
import { Roles } from 'src/user/role.enum';
import { RegisterAdminRequest } from './request/register-admin.request';
import { UserNotFoundException } from 'src/user/exception/user-not-found.exception';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) { }

    async registerUser(data: RegisterUserRequest) {
        const existingUser = await this.userService.findByEmail(data.email);

        if (existingUser) {
            throw new UserAlreadyExistException(data.email);
        }

        const hashedPassword = await this.hashPassword(data.password);

        return await this.userService.createUser({
            ...data,
            password: hashedPassword,
        });
    }

    async registerAdmin(data: RegisterAdminRequest) {
        const existingUser = await this.userService.findByEmail(data.email);

        if (existingUser) {
            throw new UserAlreadyExistException(data.email);
        }

        const hashedPassword = await this.hashPassword(data.password);

        return await this.userService.createUser({
            ...data,
            password: hashedPassword,
            role: Roles.ADMIN,
        });
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
        return await bcrypt.hash(password, saltRounds);
    }

    async isPasswordMatches(password: string, storedHashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, storedHashedPassword);
    }

    createToken(id: number, email: string, role: Roles): string {
        return this.jwtService.sign({ id, email, role });
    }

    async loginUser(data: LoginRequest): Promise<string> {
        const user = await this.userService.findByEmail(data.email);

        if (!user) {
            throw new EmailNotFoundException();
        }

        if (user.role !== Roles.USER) {
            throw new UnauthorizedException('You are not authorized to access this resource');
        }

        const isPasswordMatches = await this.isPasswordMatches(data.password, user.password);

        if (!isPasswordMatches) {
            throw new InvalidPasswordException();
        }

        return this.createToken(user.id, user.email, user.role);
    }

    async loginAdmin(data: LoginRequest): Promise<string> {
        const user = await this.userService.findByEmail(data.email);

        if (!user) {
            throw new EmailNotFoundException();
        }

        if (user.role !== Roles.ADMIN) {
            throw new UnauthorizedException('You are not authorized to access this resource');
        }

        const isPasswordMatches = await this.isPasswordMatches(data.password, user.password);

        if (!isPasswordMatches) {
            throw new InvalidPasswordException();
        }

        return this.createToken(user.id, user.email, user.role);
    }

    async requestPasswordReset(email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UserNotFoundException(email);

        const code = crypto.randomBytes(3).toString('hex');
        const expiresAt = dayjs().add(15, 'minute').toDate();

        user.resetCode = code;
        user.resetCodeExpiresAt = expiresAt;
        user.isResetCodeUsed = false;

        await this.userService.save(user);

        await this.mailService.sendResetCode(email, code);

        return { message: 'Reset code sent to your email.' };
    }

    async verifyResetCode(email: string, code: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UserNotFoundException(email);

        if (!user.resetCode || user.resetCode !== code) {
            throw new BadRequestException('Invalid reset code');
        }

        if (user.isResetCodeUsed) {
            throw new BadRequestException('Code already used');
        }

        const now = new Date();
        if (user.resetCodeExpiresAt < now) {
            throw new BadRequestException('Code expired');
        }

        return { message: 'Code is valid. You can now reset your password.' };
    }

    async resetPassword(email: string, code: string, newPassword: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UserNotFoundException(email);

        if (!user.resetCode || user.resetCode !== code) {
            throw new BadRequestException('Invalid reset code');
        }

        if (user.isResetCodeUsed) {
            throw new BadRequestException('Code already used');
        }

        const now = new Date();
        if (user.resetCodeExpiresAt < now) {
            throw new BadRequestException('Code expired');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.isResetCodeUsed = true;
        user.resetCode = null;
        user.resetCodeExpiresAt = null;

        await this.userService.save(user);

        return { message: 'Password reset successfully.' };
    }
}
