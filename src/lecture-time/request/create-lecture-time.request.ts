import { IsString } from "class-validator";
import { IsNotNullOrUndefined } from "src/validator/Is-not-null-or-undefined.decorator";

export class CreateLectureTimeRequest {
    @IsNotNullOrUndefined()
    @IsString()
    courseName: string;

    @IsNotNullOrUndefined()
    @IsString()
    DoctorName: string;

    @IsNotNullOrUndefined()
    @IsString()
    rangeTime: string;
}