import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(
    () => ShopOrderEntity,
    { eager: true, nullable: false }

    // {cascade: true,
    // eager: true,
    // nullable: false,
    // onDelete: "CASCADE",}
  )
  // @JoinColumn({ name: "orders", referencedColumnName: "shop_order_id" })
  @JoinTable()
  orders!: ShopOrder[];

  @Column({ type: "numeric" })
  total_income!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => UserEntity, (user) => user.purchases, {
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
