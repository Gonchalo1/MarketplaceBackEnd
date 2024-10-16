import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { EnviosService } from './envios.service';
import { Envios } from './entidad/envios.entity';
import { EnviosDto } from './dto/envios.dto';
import { EstadoEnvio } from './enum/estadoEnvio.enum';
import { Not } from 'typeorm';
import { NotFoundError } from 'rxjs';

const limiteGenerico:number = 100;

@Controller('envios')
export class EnviosController {
    constructor(private readonly enviosService:EnviosService){}

    @Get()
    @HttpCode(200)
    async getEnvios(
        @Query('pagina') pagina: number = 1,
        @Query('limite') limite: number = limiteGenerico
    ): Promise<{data:Envios[], total:number}> {

        return await this.enviosService.getEnviosPaginados(pagina, limite);
    }

    @Get(':id')
    @HttpCode(200)
    async getEnviosById(
        @Param('id', new ParseIntPipe({ 
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
        })) id: number,
        @Query('estado') estado: EstadoEnvio,
    ): Promise<Envios> {
        if (!estado) return await this.enviosService.getEnviosById(id);
        if (estado === EstadoEnvio.EN_TRANSITO) return await this.enviosService.pedidoEnTransito(id);
        if (estado === EstadoEnvio.CANCELADO) return await this.enviosService.cancelarPedido(id);
        if (estado === EstadoEnvio.ENTREGADO) return await this.enviosService.cambiarEstado(id, estado);

        throw new NotFoundException(`Necesita confirmar un estado valido en la petición`);
    }

    @Post()
    async createEnvio(
        @Body() datos: EnviosDto): Promise<Envios> {

        return await this.enviosService.createEnvio(datos);
    }

    @Put(':id')
    async updeateEnvio(
        @Param('id', new ParseIntPipe({ 
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
        })) id: number, 
        @Body() datos: EnviosDto): Promise<Envios> {

        return await this.enviosService.updeateEnvio(id, datos);
    }

    @Delete(':id')
    async deleteEnvio(
        @Param('id', new ParseIntPipe({ 
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
        })) id: number): Promise<Boolean> {

        return await this.enviosService.deleteEnvio(id);
    }

}
