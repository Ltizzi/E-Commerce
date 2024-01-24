import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ShopOrder } from "../models/ShopOrder";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { ProductEntity } from "./ProductEntity";
import { UserEntity } from "./UserEntity";

@Entity("shop_orders")
export class ShopOrderEntity implements ShopOrder {
  @PrimaryGeneratedColumn()
  shop_order_id!: number;

  @Column("integer", { nullable: true })
  total!: number;

  @OneToOne(() => ProductEntity, { nullable: false })
  product!: Product;

  @Column()
  cantidad!: number;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({
    type: "varchar",
    default: "PENDING",
  })
  order_state!: string;

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
