import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Deal } from "../models/Deal";
import { Product } from "../models/Product";
import { ProductEntity } from "./ProductEntity";

@Entity("deals")
export class DealEntity implements Deal {
  @PrimaryGeneratedColumn()
  deal_id!: number;

  @Column({ nullable: false })
  product_id!: number;

  @ManyToMany(() => ProductEntity, { eager: true, nullable: false })
  @JoinTable()
  product!: Product;

  @Column({ default: 0, nullable: true })
  units!: number;

  @Column({ default: 5.0, nullable: false, type: "numeric" })
  discount!: number;

  @Column({ nullable: true, type: "numeric" })
  discountedPrice!: number;

  @Column({ nullable: false })
  fullPrice!: number;

  @Column({ default: 48, nullable: false })
  duration!: number;

  @Column({ type: "timestamp" })
  startAt!: Date;

  @Column({ type: "timestamp" })
  endAt!: Date;

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
}
