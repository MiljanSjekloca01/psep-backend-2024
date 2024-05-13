import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Service } from "./Service";

@Index("uq_user_userName", ["userName"], { unique: true })
@Entity("user", { schema: "psep_2024_project" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "userName", unique: true, length: 255 })
  userName: string;

  @Column("varchar", { name: "password", length: 45 })
  password: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("bool", { name: "active", default: () => true })
  active: boolean;

  @OneToMany(() => Service, (service) => service.createdByUser)
  createdByServices: Service[];

  @OneToMany(() => Service, (service) => service.updatedByUser)
  updatedByServices: Service[];
}
