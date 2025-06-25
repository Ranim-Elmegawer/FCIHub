import { IsNotEmpty } from "class-validator";
import { IsNotNullOrUndefined } from "src/validator/Is-not-null-or-undefined.decorator";

export class CreateMajorRequest {
    @IsNotNullOrUndefined()
    @IsNotEmpty()
    title: string;
}