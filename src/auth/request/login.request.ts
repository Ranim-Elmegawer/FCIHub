import { IsEmail, IsNotEmpty } from "class-validator";
import { IsNotNullOrUndefined } from "src/validator/Is-not-null-or-undefined.decorator";

export class LoginRequest {
    @IsEmail()
    @IsNotEmpty()
    @IsNotNullOrUndefined()
    email: string;

    @IsNotEmpty()
    @IsNotNullOrUndefined()
    password: string;
}