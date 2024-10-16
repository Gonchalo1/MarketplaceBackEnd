import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Envios } from './entidad/envios.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnviosDto } from './dto/envios.dto';
import { EstadoEnvio } from './enum/estadoEnvio.enum';
import { CorreoService } from 'src/correo/correo.service';
import { CorreoDto } from 'src/correo/dto/correo.dto';

const url_base:string = 'http://localhost:3000/envios';

@Injectable()
export class EnviosService {
    constructor(
        @InjectRepository(Envios) private readonly enviosRepository: Repository<Envios>,
        private readonly correoService:CorreoService
    ) {}
    
    async getEnvios(): Promise<Envios[]> {
        try {
            const envios: Envios[] = await this.enviosRepository.find();
            return envios;
        } catch (error) {
            throw this.handleExceptions(error, `Error al intentar leer el listado de envíos`);
        }
    }

    async getEnviosById(id:number): Promise<Envios | null> {
        try {
            const criterio: FindOneOptions = { where: {idEnvio : id}}
            const envio: Envios = await this.enviosRepository.findOne(criterio);
            return envio;
        } catch (error) {
            throw this.handleExceptions(error, `Error al intentar leer el envío de id: ${id}`);
        }
    }

    async createEnvio(dtoEnvio:EnviosDto): Promise<Envios> {
        try {
            const newEnvio:Envios = new Envios(
                dtoEnvio.idCliente, dtoEnvio.idPedido, dtoEnvio.tiempoEstimado,
                dtoEnvio.direccionEnvio, dtoEnvio.companiaTransporte,
                dtoEnvio.numeroSeguimiento
            );
            if (!newEnvio) throw new NotFoundException('Problemas al crear el envío');

            const envioCreado: Envios = await this.enviosRepository.save(newEnvio);
            return envioCreado;
        } catch (error) {
            throw this.handleExceptions(error, `Error al intentar crear el envío`);
        }
    }

    async updeateEnvio(id:number, dtoEnvio:EnviosDto): Promise<Envios> {
        try {
            const envio: Envios = await this.getEnviosById(id);
            if (!envio) throw new NotFoundException(`El envio de id ${id} que intenta actualizar no existe`);

            envio.idCliente = dtoEnvio.idCliente || envio.idCliente;
            envio.idPedido = dtoEnvio.idPedido || envio.idPedido;
            envio.tiempoEstimado = dtoEnvio.tiempoEstimado || envio.tiempoEstimado;
            envio.direccionEnvio = dtoEnvio.direccionEnvio || envio.direccionEnvio;
            envio.companiaTransporte = dtoEnvio.companiaTransporte || envio.companiaTransporte;
            envio.numeroSeguimiento = dtoEnvio.numeroSeguimiento || envio.numeroSeguimiento;

            const envioActualizado: Envios = await this.enviosRepository.save(envio);

            return envioActualizado;

        } catch (error) {
            throw this.handleExceptions(error, `Error al intentar actualizar el envío de id: ${id}`);
        }
    }

    async deleteEnvio(id:number):Promise <boolean> {
        try {
            const envio: Envios = await this.getEnviosById(id);
            if (!envio) throw new NotFoundException(`El envio de id ${id} que intenta eliminar no existe`);

            await this.enviosRepository.remove(envio);
            return true;
        } catch (error) {
            throw this.handleExceptions(error, `Error al intentar eliminar el envío de id: ${id}`);
        }
    }

    async getEnviosPaginados(pagina: number, limite: number): Promise<{ data: Envios[], total: number }> {
        const skip = (pagina - 1) * limite;
        
        const [data, total] = await this.enviosRepository.createQueryBuilder('envios')
          .orderBy('envios.createdAt', 'DESC')
          .skip(skip)
          .take(limite)
          .getManyAndCount(); 
    
        return { data, total };
      }
    
    async cambiarEstado(id:number, estado:EstadoEnvio):Promise<Envios>{
        try {
            const envio: Envios = await this.getEnviosById(id);
            if (!envio) throw new NotFoundException(`El envio de id ${id} que intenta modificar el estado no existe`);
            if (envio.estado===estado) throw new ConflictException(`El envío ${id} ya estaba en ${estado} previamente`)
            envio.estado=estado;

            const envioModificado:Envios = await this.enviosRepository.save(envio);
            return envioModificado;

        } catch (error) {
            throw this.handleExceptions(error, `Error al intentar eliminar el envío de id: ${id}`);
        }
    }

    async cancelarPedido(id:number):Promise<Envios>{
        try {
            const envio: Envios = await this.getEnviosById(id);
            if (!envio) throw new NotFoundException(`El envio de id ${id} que intenta contactar por correo no existe`);
            
        const email:string = `<div><p>Hola ${envio.idCliente} muchas gracias por confiar en nuestro servicios,
        te comentamos que tu pedido ${envio.idPedido} ha sido cancelado.</p>
        
        <p>Que tenga un lindo día</p></div>`;

        const envioEnTransito:Envios = await this.cambiarEstado(id, EstadoEnvio.CANCELADO);

        const dtoCorreo: CorreoDto = { para:envio.idCliente, asunto:'Envío cancelado', mensaje:email }
        await this.correoService.enviarCorreo(dtoCorreo);

        return envioEnTransito;

    } catch (error) {
        throw this.handleExceptions(error, `Error al intentar enviar correo para el envio: ${id}`);
    }
    }

    async pedidoEnTransito(id:number):Promise<Envios>{ 
        try {
            const envio: Envios = await this.getEnviosById(id);
            if (!envio) throw new NotFoundException(`El envio de id ${id} que intenta contactar por correo no existe`);
            
        const email:string = `<div><p>Hola ${envio.idCliente} muchas gracias por confiar en nuestro servicios,
        te comentamos que tu pedido ${envio.idPedido} se encuentra en ${envio.estado} y llegara a la 
        ${envio.direccionEnvio} en ${envio.tiempoEstimado}. </p>

        <p>La compañía encargada del traslado es ${envio.companiaTransporte} y su número de seguimiento
        ${envio.numeroSeguimiento}. </p>
        
        <p>Si desea cancelar el pedido sin el reembolso puede hacerlo siguiendo este enlace </p>
        
        <a href="${url_base}/${id}?estado=cancelado">Cancelar pedido</a>
        
        <p>muchas gracias, que tenga un lindo día</p></div>`;

        const envioEnTransito:Envios = await this.cambiarEstado(id, EstadoEnvio.EN_TRANSITO);

        const dtoCorreo: CorreoDto = { para:envio.idCliente, asunto:'Estado de tu Envío', mensaje:email }
        await this.correoService.enviarCorreo(dtoCorreo);

        return envioEnTransito;

    } catch (error) {
        throw this.handleExceptions(error, `Error al intentar enviar correo para el envio: ${id}`);
    }
    }

    private handleExceptions(error: any, customMessage: string): never {
        if (error instanceof HttpException) {
            throw error;
        } else if (error instanceof ConflictException) {
            throw new HttpException({ status: HttpStatus.CONFLICT, error: error.message }, HttpStatus.CONFLICT);
        } else {
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: `${customMessage}: ${error}` }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
