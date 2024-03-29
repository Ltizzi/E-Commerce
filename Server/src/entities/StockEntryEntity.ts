import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "../models/Product";
import { Stock } from "../models/Stock";
import { StockEntry } from "../models/StockEntry";
import { ProductEntity } from "./ProductEntity";
import { StockEntity } from "./StockEntity";

@Entity("stock_entries")
export class StockEntryEntity implements StockEntry {
  @PrimaryGeneratedColumn()
  entry_id!: number;

  @ManyToOne(() => ProductEntity, { eager: false, nullable: true })
  @JoinColumn({ name: "product_id", referencedColumnName: "product_id" })
  product!: Product;

  @Column()
  cantidad!: number;

  @Column()
  stock_id!: number;

  @ManyToOne(() => StockEntity, { eager: true, nullable: false })
  @JoinColumn({ name: "stock", referencedColumnName: "stock_id" })
  stock!: Stock;

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
