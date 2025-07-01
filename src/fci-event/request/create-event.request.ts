import { IsNotNullOrUndefined } from "src/validator/Is-not-null-or-undefined.decorator";

export class CreateEventRequest {
    @IsNotNullOrUndefined()
    title: string;

    @IsNotNullOrUndefined()
    description: string;

    @IsNotNullOrUndefined()
    date: Date;

    @IsNotNullOrUndefined()
    type: string;

    imageUrl?: string; 
}