import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/correo/correo.service';
import { EmailDto } from 'src/correo/dto/correo.dto';
import { ShipmentsDto } from './dto/envios.dto';
import { shipmentStatus } from './enum/estadoEnvio.enum';
import { Shipments } from './entidad/envios.entity';

const url_base:string = 'http://localhost:3000/Shipments';

@Injectable()
export class shipmentsService {
    constructor(
        @InjectRepository(Shipments) private readonly ShipmentsRepository: Repository<Shipments>,
        private readonly emailService:EmailService
    ) {}
    
    async getShipments(): Promise<Shipments[]> {
        try {
            const Shipments: Shipments[] = await this.ShipmentsRepository.find();
            return Shipments;
        } catch (error) {
            throw this.handleExceptions(error, `Error trying to read the shipment list`);
        }
    }

    async getShipmentsById(id:number): Promise<Shipments | null> {
        try {
            const criteria: FindOneOptions = { where: {shipmentId : id}}
            const shipment: Shipments = await this.ShipmentsRepository.findOne(criteria);
            return shipment;
        } catch (error) {
            throw this.handleExceptions(error, `Error trying to read the shipment with id: ${id}`);
        }
    }

    async createShipment(dtoShipment:ShipmentsDto): Promise<Shipments> {
        try {
            const newShipment:Shipments = new Shipments(
                dtoShipment.customerId, dtoShipment.orderId, dtoShipment.estimatedTime,
                dtoShipment.shippingAddress, dtoShipment.transportCompany,
                dtoShipment.trackingNumber
            );
            if (!newShipment) throw new NotFoundException('Problems creating the shipment');

            const shipmentCreado: Shipments = await this.ShipmentsRepository.save(newShipment);
            return shipmentCreado;
        } catch (error) {
            throw this.handleExceptions(error, `Error trying to create the shipment`);
        }
    }

    async updateShipment(id:number, dtoShipment:ShipmentsDto): Promise<Shipments> {
        try {
            const shipment: Shipments = await this.getShipmentsById(id);
            if (!shipment) throw new NotFoundException(`The shipment with id ${id} you are trying to update does not exist`);

            shipment.customerId = dtoShipment.customerId || shipment.customerId;
            shipment.orderId = dtoShipment.orderId || shipment.orderId;
            shipment.estimatedTime = dtoShipment.estimatedTime || shipment.estimatedTime;
            shipment.shippingAddress = dtoShipment.shippingAddress || shipment.shippingAddress;
            shipment.transportCompany = dtoShipment.transportCompany || shipment.transportCompany;
            shipment.trackingNumber = dtoShipment.trackingNumber || shipment.trackingNumber;

            const updatedShipment: Shipments = await this.ShipmentsRepository.save(shipment);

            return updatedShipment;

        } catch (error) {
            throw this.handleExceptions(error, `Error trying to update the shipment with id: ${id}`);
        }
    }

    async deleteShipment(id:number):Promise <boolean> {
        try {
            const shipment: Shipments = await this.getShipmentsById(id);
            if (!shipment) throw new NotFoundException(`The shipment with id ${id} you are trying to delete does not exist`);

            await this.ShipmentsRepository.remove(shipment);
            return true;
        } catch (error) {
            throw this.handleExceptions(error, `Error trying to delete the shipment with id: ${id}`);
        }
    }

    async getPaginatedShipments(page: number, limit: number): Promise<{ data: Shipments[], total: number }> {
        const skip = (page - 1) * limit;
        
        const [data, total] = await this.ShipmentsRepository.createQueryBuilder('Shipments')
          .orderBy('Shipments.createdAt', 'DESC')
          .skip(skip)
          .take(limit)
          .getManyAndCount(); 
    
        return { data, total };
      }
    
    async changeStatus(id:number,status:shipmentStatus):Promise<Shipments>{
        try {
            const shipment: Shipments = await this.getShipmentsById(id);
            if (!shipment) throw new NotFoundException(`The shipment with id ${id} you are trying to modify the status for does not exist`);
            if (shipment.status===status) throw new ConflictException(`The shipment ${id} was already in ${status} previously`)
            shipment.status=status;

            const shipmentModificado:Shipments = await this.ShipmentsRepository.save(shipment);
            return shipmentModificado;

        } catch (error) {
            throw this.handleExceptions(error, `Error trying to delete the shipment with id: ${id}`);
        }
    }

    async cancelOrder(id:number):Promise<Shipments>{
        try {
            const shipment: Shipments = await this.getShipmentsById(id);
            if (!shipment) throw new NotFoundException(`The shipment with id ${id} you are trying to contact by email does not exist`);
            
        const email:string = `<div>
  <p>Hello ${shipment.customerId}, thank you very much for trusting our services. We would like to inform you that your order ${shipment.orderId} has been CANCELED.</p>
  <p>Have a great day!</p>
</div>`;

        const shipmentInTransit:Shipments = await this.changeStatus(id,shipmentStatus.CANCELED);

        const dtoEmail: EmailDto = { to:shipment.customerId, subject:'Shipment canceled', message:email }
        await this.emailService.sendEmail(dtoEmail);

        return shipmentInTransit;

    } catch (error) {
        throw this.handleExceptions(error, `Error trying to send email for the shipment: ${id}`);
    }
    }

    async orderInTransit(id:number):Promise<Shipments>{ 
        try {
            const shipment: Shipments = await this.getShipmentsById(id);
            if (!shipment) throw new NotFoundException(`The shipment with id ${id} you are trying to contact by email does not exist`);
            
        const email:string = `<div>
  <p>Hello ${shipment.customerId}, thank you very much for trusting our services. We would like to inform you that your order ${shipment.orderId} is currently in ${shipment.status} and will arrive at ${shipment.shippingAddress} in ${shipment.estimatedTime}.</p>
  
  <p>The company responsible for the transportation is ${shipment.transportCompany}, and its tracking number is ${shipment.trackingNumber}.</p>
  
  <p>If you wish to cancel the order without a refund, you can do so by following this link:</p>
  
  <a href="${url_base}/${id}?status=CANCELED">Cancel order</a>
  
  <p>Thank you very much, have a great day!</p>
</div>`;

        const shipmentInTransit:Shipments = await this.changeStatus(id,shipmentStatus.IN_TRANSIT);

        const dtoEmail: EmailDto = { to:shipment.customerId, subject:'status of your Shipment', message:email }
        await this.emailService.sendEmail(dtoEmail);

        return shipmentInTransit;

    } catch (error) {
        throw this.handleExceptions(error, `Error trying to send email for the shipment: ${id}`);
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
