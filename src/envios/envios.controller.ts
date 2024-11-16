import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { shipmentStatus } from './enum/estadoEnvio.enum';
import { shipmentsService } from './envios.service';
import { Shipments } from './entidad/envios.entity';
import { ShipmentsDto } from './dto/envios.dto';

const genericLimit:number = 100;

@Controller('shipments')
export class ShipmentsController {
    constructor(private readonly shipmentsService:shipmentsService){}

    @Get()
    @HttpCode(200)
    async getShipments(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = genericLimit
    ): Promise<{data:Shipments[], total:number}> {

        return await this.shipmentsService.getPaginatedShipments(page, limit);
    }

    @Get(':id')
    @HttpCode(200)
    async getShipmentsById(
        @Param('id', new ParseIntPipe({ 
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
        })) id: number,
        @Query('status')status:shipmentStatus,
    ): Promise<Shipments> {
        if (!status) return await this.shipmentsService.getShipmentsById(id);
        if (status ===shipmentStatus.IN_TRANSIT) return await this.shipmentsService.orderInTransit(id);
        if (status ===shipmentStatus.CANCELED) return await this.shipmentsService.cancelOrder(id);
        if (status ===shipmentStatus.DELIVERED) return await this.shipmentsService.changeStatus(id,status);

        throw new NotFoundException(`Needs to confirm a valid status in the request`);
    }

    @Post()
    async createShipment(
        @Body() information: ShipmentsDto): Promise<Shipments> {

        return await this.shipmentsService.createShipment(information);
    }

    @Put(':id')
    async updateShipment(
        @Param('id', new ParseIntPipe({ 
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
        })) id: number, 
        @Body() information: ShipmentsDto): Promise<Shipments> {

        return await this.shipmentsService.updateShipment(id, information);
    }

    @Delete(':id')
    async deleteShipment(
        @Param('id', new ParseIntPipe({ 
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
        })) id: number): Promise<Boolean> {

        return await this.shipmentsService.deleteShipment(id);
    }

}
