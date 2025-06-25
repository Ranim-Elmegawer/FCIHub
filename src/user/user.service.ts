import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserNotFoundException } from './exception/user-not-found.exception';
import { UserResponse } from './response/user.response';
import { AdminResponse } from './response/admin.response';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async createUser(user: any): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new UserNotFoundException(id);
        }

        return user;
    }

    async getUserProfileById(id: number): Promise<UserResponse> {
        const user = await this.findById(id);

        if (!user) {
            throw new UserNotFoundException(id);
        }

        return new UserResponse(user);
    }

    async getAdminProfileById(id: number): Promise<AdminResponse> {
        const user = await this.findById(id);

        if (!user) {
            throw new UserNotFoundException(id);
        }

        return new AdminResponse(user);
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async save(user: any): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

}
