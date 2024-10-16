import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EstadoEnvio } from "../enum/estadoEnvio.enum";
import { IsNotEmpty } from "class-validator";

@Entity('envios')
export class Envios {
  @PrimaryGeneratedColumn()
  idEnvio: number;

  @Column()
  @IsNotEmpty()
  idCliente: string;

  @Column()
  @IsNotEmpty()
  idPedido: string; 

  @Column({ type: 'enum', enum: EstadoEnvio, default: EstadoEnvio.PENDIENTE })
  estado: EstadoEnvio;

  @Column({ default: 'dos a tres días habiles' })
  tiempoEstimado: string;

  @Column({ nullable: true })
  direccionEnvio: string;

  @Column({ nullable: true })
  companiaTransporte: string;

  @Column({ nullable: true })
  numeroSeguimiento: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(idCliente:string, idPedido:string, tiempoEstimado:string, dir: string, compTrans: string,  nSeguimiento:string){
    this.idCliente = idCliente;
    this.idPedido= idPedido;
    this.estado = EstadoEnvio.PENDIENTE;
    this.tiempoEstimado = tiempoEstimado;
    this.direccionEnvio = dir;
    this.companiaTransporte = compTrans;
    this.numeroSeguimiento = nSeguimiento;
  }
}
