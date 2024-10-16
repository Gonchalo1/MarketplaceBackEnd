import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CorreoService } from './correo/correo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnviosModule } from './envios/envios.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Envios } from './envios/entidad/envios.entity';


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
        entities: [Envios],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app') }),
    EnviosModule,
  ],
  controllers: [AppController],
  providers: [AppService, CorreoService],
})
export class AppModule { }
