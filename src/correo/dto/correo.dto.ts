import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailDto {
    @IsEmail()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    subject : string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
