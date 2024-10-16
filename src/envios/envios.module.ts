import { Module } from '@nestjs/common';
import { EnviosController } from './envios.controller';
import { EnviosService } from './envios.service';
import { CorreoService } from 'src/correo/correo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Envios } from './entidad/envios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Envios])],
  controllers: [EnviosController],
  providers: [EnviosService, CorreoService]
})
export class EnviosModule {}
