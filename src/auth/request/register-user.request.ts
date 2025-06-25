import { IsEmail, IsNumber, IsOptional, MaxLength, Min, MinLength } from "class-validator";
import { Roles } from "src/user/role.enum";
import { IsNotNullOrUndefined } from "src/validator/Is-not-null-or-undefined.decorator";

export class RegisterUserRequest {
    @IsNotNullOrUndefined()
    name: string;

    @IsNotNullOrUndefined()
    gender: string;

    @IsNotNullOrUndefined()
    collage: string;

    @IsNotNullOrUndefined()
    university: string;

    @IsNotNullOrUndefined()
    level: string;

    @IsNotNullOrUndefined()
    major: string;

    @IsNumber()
    @IsNotNullOrUndefined()
    universityId: number;

    @IsNumber()
    @IsNotNullOrUndefined()
    @Min(0)
    GPA: number;

    @IsEmail()
    email: string;


    @MinLength(6)
    @MaxLength(30)
    @IsNotNullOrUndefined()
    password: string;

    @IsOptional()   
    role: Roles;
}