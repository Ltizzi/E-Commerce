import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "../models/Review";

@Entity("reviews")
export class ReviewEntity implements Review {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column({ nullable: false })
  user_id!: number;

  @Column({ nullable: false })
  product_id!: number;
  @Column({ nullable: false, default: 0 })
  rating!: number;

  @Column({ nullable: true })
  text!: string;
}
