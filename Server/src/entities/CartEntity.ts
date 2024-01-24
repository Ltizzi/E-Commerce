import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { UserEntity } from "./UserEntity";
import { ProductEntity } from "./ProductEntity";

@Entity("carts")
export class CartEntity implements Cart {
  @PrimaryGeneratedColumn()
  cart_id!: number;

  @Column()
  total!: number;

  @OneToOne(() => ProductEntity, { nullable: true })
  product!: Product;

  @Column()
  cantidad!: number;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

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
