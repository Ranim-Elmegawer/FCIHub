import { IsEmail, IsNotEmpty } from "class-validator";
import { IsNotNullOrUndefined } from "src/validator/Is-not-null-or-undefined.decorator";

export class RegisterAdminRequest {
    @IsNotEmpty()
    @IsNotNullOrUndefined()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsNotNullOrUndefined()
    email: string;

    @IsNotEmpty()
    @IsNotNullOrUndefined()
    password: string;

    @IsNotEmpty()
    @IsNotNullOrUndefined()
    gender: string;
}