import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Customer } from "./Customer";
import { Model } from "./Model";
import { Service } from "./Service";

@Index("uq_device_sn", ["sn"], { unique: true })
@Index("fk_device_model_model_id", ["modelId"], {})
@Index("fk_device_customer_customer_id", ["customerId"], {})
@Entity("device", { schema: "psep_2024_project" })
export class Device {
  @PrimaryGeneratedColumn({ type: "int", name: "device_id", unsigned: true })
  deviceId: number;

  @Column("varchar", { name: "sn", unique: true, length: 255 })
  sn: string;

  @Column("int", { name: "model_id", unsigned: true })
  modelId: number;

  @Column("int", { name: "customer_id", unsigned: true })
  customerId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Customer, (customer) => customer.devices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "customer_id", referencedColumnName: "customerId" }])
  customer: Customer;

  @ManyToOne(() => Model, (model) => model.devices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "model_id", referencedColumnName: "modelId" }])
  model: Model;

  @OneToMany(() => Service, (service) => service.device)
  services: Service[];
}
