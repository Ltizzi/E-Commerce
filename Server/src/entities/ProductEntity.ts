import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "../models/Product";
import { ProductType } from "../models/ProductType";
import { ProductTypeEntity } from "./ProductTypeEntity";

@Entity("products")
export class ProductEntity implements Product {
  @PrimaryGeneratedColumn()
  product_id!: number;

  @Column({
    type: "varchar",
    default: "test",
  })
  name!: string;

  @Column({
    type: "varchar",
    default: "test",
  })
  brand!: string;

  @Column({
    type: "varchar",
    default: "test",
  })
  about!: string;

  @Column("text", { array: true, nullable: true })
  imageUrl!: string[];

  @Column({
    type: "numeric",
    default: "1.00",
  })
  price!: number;

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
  updatedAt!: Date;

  @Column({ default: false })
  soft_delete!: boolean;

  @ManyToOne(() => ProductTypeEntity, { eager: true, nullable: false })
  @JoinColumn({ name: "prod_type_id" })
  type!: ProductType;
}
