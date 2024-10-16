import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class EnviosDto {
    @IsEmail()
    @IsNotEmpty()
    idCliente: string;

    @IsString()
    @IsNotEmpty()
    idPedido:string;

    @IsString()
    @IsEmpty()
    tiempoEstimado:string;

    @IsString()
    @IsEmpty()
    direccionEnvio:string;

    @IsString()
    @IsEmpty()
    companiaTransporte: string;
  
    @IsString()
    @IsEmpty()
    numeroSeguimiento: string;
}