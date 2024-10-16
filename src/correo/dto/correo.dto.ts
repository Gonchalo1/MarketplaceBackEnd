import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CorreoDto {
    @IsEmail()
    @IsNotEmpty()
    para: string;

    @IsString()
    @IsNotEmpty()
    asunto: string;

    @IsString()
    @IsNotEmpty()
    mensaje: string;
}
