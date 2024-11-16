import { Module } from '@nestjs/common';
import { EmailService } from 'src/correo/correo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipments } from './entidad/envios.entity';
import { ShipmentsController } from './envios.controller';
import { shipmentsService } from './envios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shipments])],
  controllers: [ShipmentsController],
  providers: [shipmentsService, EmailService]
})
export class ShipmentsModule {}
