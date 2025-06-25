import { IsNumber, IsOptional } from "class-validator";
import { IsNotNullOrUndefined } from "src/validator/Is-not-null-or-undefined.decorator";

export class CreateCourseRequest {
    @IsNotNullOrUndefined()
    title: string;
    
    @IsNumber()
    levelId: number;

    @IsOptional()
    @IsNumber()
    majorId?: number;

    @IsOptional()
    @IsNumber()
    subMajorId?: number;
  }
  