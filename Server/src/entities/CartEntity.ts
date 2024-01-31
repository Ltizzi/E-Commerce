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

  @ManyToOne(() => ProductEntity, { eager: true, nullable: false })
  @JoinColumn({ name: "product", referencedColumnName: "product_id" })
  product!: Product;

  @Column()
  cantidad!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => UserEntity, (user) => user.carts, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "user_id" })
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
