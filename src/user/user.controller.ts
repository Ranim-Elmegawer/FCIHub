import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { isValidId } from 'src/validator/is-valid-id.decorator';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { RolesDec } from 'src/auth/decorator/roles.decorator';
import { Roles } from './role.enum';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async createUser(@Body() user: any, @Res() res: Response){
        const createdUser = await this.userService.createUser(user);

        return res.status(201).json({
            message: 'User created successfully',
            user: createdUser,
        });
    }

    @Get('profile')
    @RolesDec(Roles.USER)
    async getUser(@CurrentUser() user, @Res() res: Response) {
        const userData = await this.userService.getUserProfileById(user.id);

        return res.status(200).json({
            message: 'User retrieved successfully',
            userData,
        });
    }

    @Get('admin/profile')
    @RolesDec(Roles.ADMIN)
    async getAdmin(@CurrentUser() user, @Res() res: Response) {
    
        const userData = await this.userService.getAdminProfileById(user.id);

        return res.status(200).json({
            message: 'Admin retrieved successfully',
            userData,
        });
    }

    @Get()
    async getAllUsers(@Res() res: Response) {
        const users = await this.userService.findAll();

        return res.status(200).json({
            message: 'Users retrieved successfully',
            users,
        });
    }

}
