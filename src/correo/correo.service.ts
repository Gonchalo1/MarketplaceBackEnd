import { Injectable, NotFoundException } from '@nestjs/common';
import { CorreoDto } from './dto/correo.dto';

import { Resend  } from 'resend' ; 

@Injectable()
export class CorreoService {

    resend = new Resend(process.env.SMTP_KEY);   

    async enviarCorreo ({para, mensaje, asunto}:CorreoDto) {
        const { data, error } = await this.resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [para],
          subject: asunto,
          html: mensaje,
        });
      
        if (error) {
          console.error({ error });
          throw new NotFoundException(`Error al enviar correo: ${error.name}, ${error.message}`)
        }

        console.log(data);
        
      };
}
