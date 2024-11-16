import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailDto } from './dto/correo.dto';

import { Resend  } from 'resend' ; 

@Injectable()
export class EmailService {

    resend = new Resend(process.env.SMTP_KEY);   

    async sendEmail ({to, message, subject}:EmailDto) {
        const { data, error } = await this.resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [to],
          subject: subject,
          html: message,
        });
      
        if (error) {
          console.error({ error });
          throw new NotFoundException(`Error sending email: ${error.name}, ${error.message}`)
        }

        console.log(data);
        
      };
}
