import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Device } from "./Device";
import { State } from "./State";
import { User } from "./User";

@Index("fk_service_device_device_id", ["deviceId"], {})
@Index("fk_service_state_state_id", ["stateId"], {})
@Index("fk_service_user_created_by", ["createdBy"], {})
@Index("fk_service_user_updated_by", ["updatedBy"], {})
@Entity("service", { schema: "psep_2024_project" })
export class Service {
  @PrimaryGeneratedColumn({ type: "int", name: "service_id", unsigned: true })
  serviceId: number;

  @Column("int", { name: "device_id", unsigned: true })
  deviceId: number;

  @Column("int", { name: "state_id", unsigned: true, default: () => "'1'" })
  stateId: number;

  @Column("int", { name: "created_by", unsigned: true })
  createdBy: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("int", { name: "updated_by", nullable: true, unsigned: true })
  updatedBy: number | null;

  @Column("datetime", { name: "updated_at" })
  updatedAt: Date;

  @Column("datetime", { name: "deleted_at" })
  deletedAt: Date;

  @ManyToOne(() => Device, (device) => device.services, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "device_id", referencedColumnName: "deviceId" }])
  device: Device;

  @ManyToOne(() => State, (state) => state.services, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "state_id", referencedColumnName: "stateId" }])
  state: State;

  @ManyToOne(() => User, (user) => user.createdByServices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "userId" }])
  createdByUser: User;

  @ManyToOne(() => User, (user) => user.updatedByServices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "updated_by", referencedColumnName: "userId" }])
  updatedByUser: User;
}
