import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Purchase } from "../models/Purchase";
import { ShopOrder } from "../models/ShopOrder";
import { User } from "../models/User";
import { ShopOrderEntity } from "./ShopOrderEntity";
import { UserEntity } from "./UserEntity";

@Entity("purchases")
export class PurchaseEntity implements Purchase {
  @PrimaryGeneratedColumn()
  purchase_id!: number;

  @OneToMany(() => ShopOrderEntity, (order) => order.shop_order_id, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  orders!: ShopOrder[];

  @Column()
  total_income!: number;

  @ManyToOne(() => UserEntity, { nullable: false })
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
