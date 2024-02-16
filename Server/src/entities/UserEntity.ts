import { Cart } from "../models/Cart";
import { Purchase } from "../models/Purchase";
import { RoleEnum } from "../models/RoleEnum";
import { User } from "../models/User";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { CartEntity } from "./CartEntity";
import { PurchaseEntity } from "./PurchaseEntity";
import { Product } from "../models/Product";
import { ProductEntity } from "./ProductEntity";
import { Review } from "../models/Review";
import { ReviewEntity } from "./ReviewEntity";

@Entity("users")
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column("varchar", { nullable: true })
  username!: string;

  @Column("varchar", { nullable: true })
  name!: string;

  @Column("varchar", { nullable: true })
  lastname!: string;

  @Column("varchar", { nullable: true })
  email!: string;

  @Column("integer", { nullable: true })
  googleId!: number;

  @Column({
    type: "enum",
    enum: RoleEnum,
    array: true,
    default: [RoleEnum.USER],
  })
  roles!: RoleEnum[];

  @Column("varchar", { nullable: true })
  avatar!: string;

  @Column("varchar", { nullable: true })
  birthday!: Date;

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

  @OneToMany(() => CartEntity, (cart) => cart.user, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "carts", referencedColumnName: "cart_id" })
  carts!: Cart[];

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.user, {
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: "purchases", referencedColumnName: "purchase_id" })
  purchases!: Purchase[];

  @ManyToMany(() => ProductEntity, { eager: true })
  @JoinTable()
  favourites!: Product[];

  @ManyToMany(() => ReviewEntity, (review) => review.user_id, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  reviews!: Review[];
}
