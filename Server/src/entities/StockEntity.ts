import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "../models/Product";
import { Stock } from "../models/Stock";
import { StockEntry } from "../models/StockEntry";
import { ProductEntity } from "./ProductEntity";
import { StockEntryEntity } from "./StockEntryEntity";

@Entity("stocks")
export class StockEntity implements Stock {
  @PrimaryGeneratedColumn()
  stock_id!: number;

  @OneToOne(() => ProductEntity, { eager: true, nullable: false })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column()
  cantidad!: number;

  @OneToMany(() => StockEntryEntity, (entry) => entry.stock, { eager: true })
  @JoinColumn({ name: "stock_id" })
  entries!: StockEntry[];

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
