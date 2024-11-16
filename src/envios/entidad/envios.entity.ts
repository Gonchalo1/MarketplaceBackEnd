import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { shipmentStatus } from "../enum/estadoEnvio.enum";

@Entity('Shipments')
export class Shipments {
  @PrimaryGeneratedColumn()
  shipmentId: number;

  @Column()
  @IsNotEmpty()
  customerId: string;

  @Column()
  @IsNotEmpty()
  orderId: string; 

  @Column({ type: 'enum', enum:shipmentStatus, default:shipmentStatus.PENDING })
 status:shipmentStatus;

  @Column({ default: 'two to three business days' })
  estimatedTime: string;

  @Column({ nullable: true })
  shippingAddress: string;

  @Column({ nullable: true })
  transportCompany: string;

  @Column({ nullable: true })
  trackingNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(customerId:string, orderId:string, estimatedTime:string, shippingAddress: string, compTrans: string,  trackingNumber:string){
    this.customerId = customerId;
    this.orderId= orderId;
    this.status =shipmentStatus.PENDING;
    this.estimatedTime = estimatedTime;
    this.shippingAddress = shippingAddress;
    this.transportCompany = compTrans;
    this.trackingNumber = trackingNumber;
  }
}
