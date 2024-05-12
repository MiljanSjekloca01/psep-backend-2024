import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./Service";

@Entity("state", { schema: "psep_2024_project" })
export class State {
  @PrimaryGeneratedColumn({ type: "int", name: "state_id", unsigned: true })
  stateId: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at" })
  updatedAt: Date;

  @Column("datetime", { name: "deleted_at" })
  deletedAt: Date;

  @OneToMany(() => Service, (service) => service.state)
  services: Service[];
}
