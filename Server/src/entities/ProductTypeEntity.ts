import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductType } from "../models/ProductType";

@Entity("product_types")
export class ProductTypeEntity implements ProductType {
  @PrimaryGeneratedColumn()
  prod_type_id!: number;

  @Column({
    type: "varchar",
    default: "default_type",
  })
  name!: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updateAt!: Date;

  @Column({ default: false })
  soft_delete!: boolean;
}
