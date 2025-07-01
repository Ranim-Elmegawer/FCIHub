import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { SubMajorService } from './sub-major.service';
import { CreateSubMajorRequest } from './request/create-sub-major.request';
import { Response } from 'express';
import { isValidId } from 'src/validator/is-valid-id.decorator';
import { RolesDec } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/user/role.enum';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('sub-major')
export class SubMajorController {
    constructor(
        private readonly subMajorService: SubMajorService,
    ) {}

    @Post()
    @RolesDec(Roles.ADMIN)
    async createSubMajor(@Body() subMajor: CreateSubMajorRequest, @Res() res: Response) {
        const newSubMajor = await this.subMajorService.create(subMajor);
        res.status(201).json(newSubMajor);
    }

    @Get()
    @Public()
    async findAll() {
        return this.subMajorService.findAll();
    }

    @Get(':id')
    @Public()
    async findById(@isValidId() id: number) {
        return this.subMajorService.findById(id);
    }
}
