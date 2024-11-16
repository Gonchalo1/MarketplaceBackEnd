import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailService } from './correo/correo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PagosModule } from './pagos/pagos.module';
import { Shipments } from './envios/entidad/envios.entity';
import { ShipmentsModule } from './envios/envios.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'index'),
      serveRoot: '/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Shipments],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app') }),
    ShipmentsModule,
    PagosModule,
  ],
  controllers: [AppController],
  providers: [EmailService],
})
export class AppModule { }
