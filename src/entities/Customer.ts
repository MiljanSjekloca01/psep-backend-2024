import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Device } from "./Device";

@Index("uq_customer_email", ["email"], { unique: true })
@Entity("customer", { schema: "psep_2024_project" })
export class Customer {
  @PrimaryGeneratedColumn({ type: "int", name: "customer_id", unsigned: true })
  customerId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "phone", length: 255 })
  phone: string;

  @Column("int", { name: "tax_id", nullable: true, unsigned: true })
  taxId: number | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at" })
  updatedAt: Date;

  @Column("datetime", { name: "deleted_at" })
  deletedAt: Date;

  @OneToMany(() => Device, (device) => device.customer)
  devices: Device[];
}
