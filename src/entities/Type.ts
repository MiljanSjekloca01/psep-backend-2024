import {BeforeInsert, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Model } from "./Model";
import { IsEmail, IsNotEmpty } from "class-validator";
@Index("uq_type_name", ["name"], { unique: true })
@Entity("type", { schema: "psep_2024_project" })
export class Type {
  @PrimaryGeneratedColumn({ type: "int", name: "type_id", unsigned: true })
  typeId: number;

  @Column("varchar", { name: "name", unique: true, length: 255})
  @IsNotEmpty()
  name: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date;

  @OneToMany(() => Model, (model) => model.type)
  models: Model[];
  /*
  @BeforeInsert()
  async doSomethingBeforeInsert() {
      throw new Error("Name is required");
  }
  */


}
