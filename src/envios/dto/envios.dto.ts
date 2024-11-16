import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class ShipmentsDto {
    @IsEmail()
    @IsNotEmpty()
    customerId: string;

    @IsString()
    @IsNotEmpty()
    orderId:string;

    @IsString()
    @IsEmpty()
    estimatedTime:string;

    @IsString()
    @IsEmpty()
    shippingAddress:string;

    @IsString()
    @IsEmpty()
    transportCompany: string;
  
    @IsString()
    @IsEmpty()
    trackingNumber: string;
}