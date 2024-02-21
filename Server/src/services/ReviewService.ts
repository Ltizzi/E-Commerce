import { AppDataSource } from "../data-source";
import { ReviewEntity } from "../entities/ReviewEntity";
import { Review } from "../models/Review";
import { ProductService } from "./ProductService";
import { UserService } from "./UserService";

const prodServ = new ProductService();
const userServ = new UserService();

export class ReviewService {
  private reviewRepo = AppDataSource.getRepository(ReviewEntity);

  async getAllReviews(): Promise<Array<Review>> {
    const reviews = await this.reviewRepo.find({
      order: { review_id: "ASC" },
    });
    return reviews;
  }

  async getReviewsWithPagination(
    page: number,
    pageSize: number
  ): Promise<Array<Review>> {
    const skip = (page - 1) * pageSize;

    const reviews = await this.reviewRepo.find({
      skip: skip,
      take: pageSize,
      order: { review_id: "ASC" },
    });
    return reviews;
  }

  async getReviewById(review_id: number): Promise<Review | null> {
    return await this.reviewRepo.findOneBy({
      review_id: review_id,
    });
  }

  async getReviewsFromUserWithPagination(
    user_id: number,
    page: number,
    pageSize: number
  ): Promise<Array<Review>> {
    const skip = (page - 1) * pageSize;
    const reviews = await this.reviewRepo.find({
      where: { user_id: user_id },
      skip: skip,
      take: pageSize,
      order: { review_id: "ASC" },
    });
    return reviews;
  }

  async getReviewsFromUser(user_id: number): Promise<Array<Review>> {
    const reviews = await this.reviewRepo.find({ where: { user_id: user_id } });
    return reviews;
  }

  async getProductReviewsWithPagination(
    product_id: number,
    page: number,
    pageSize: number
  ): Promise<Array<Review>> {
    const skip = (page - 1) * pageSize;
    const reviews = await this.reviewRepo.find({
      where: { product_id: product_id },
      skip: skip,
      take: pageSize,
      order: { review_id: "ASC" },
    });
    return reviews;
  }

  async getProductReviews(product_id: number): Promise<Array<Review>> {
    return await this.reviewRepo.find({ where: { product_id: product_id } });
  }

  async getTotalReviewsNumber(): Promise<number> {
    return await this.reviewRepo.count();
  }

  async getTotalReviewsFromUser(user_id: number): Promise<number> {
    return await this.reviewRepo.count({ where: { user_id: user_id } });
  }

  async checkAlreadyReviewed(
    user_id: number,
    product_id: number
  ): Promise<boolean> {
    const review = await this.reviewRepo.findOneBy({
      user_id: user_id,
      product_id: product_id,
    });
    if (review) return true;
    else return false;
  }

  async saveReview(review: Review): Promise<Review | Error> {
    try {
      const user = await userServ.getUserById(review.user_id);
      const product = await prodServ.getProductById(review.product_id);
      const reviews = await this.getProductReviews(review.product_id);
      let userReviews = (await this.getReviewsFromUser(
        review.user_id
      )) as Array<Review>;
      if (user && product) {
        userReviews.push(review);
        user.reviews = userReviews;
        userServ.saveUser(user);
        product.total_reviews += 1;
        product.rating = this.calcRating(
          reviews,
          review,
          product.total_reviews
        );
        prodServ.updateProduct(product);
        return await this.reviewRepo.save(review);
      } else throw new Error("User not found");
    } catch (err: any) {
      return err;
    }
  }
  async updatedReview(review: Review): Promise<Review | Error> {
    try {
      const oldReview = await this.getReviewById(review.review_id);
      if (oldReview) {
        const user = await userServ.getUserById(review.user_id);
        const product = await prodServ.getProductById(review.product_id);
        const reviews = await this.getProductReviews(review.product_id);
        if (user && product) {
          let userReviews = await this.getReviewsFromUser(review.user_id);
          let reviewsWithoutUpdatedReview = userReviews.filter(
            (savedReview: Review) => savedReview.review_id != review.review_id
          );
          reviewsWithoutUpdatedReview.push(review);
          user.reviews = reviewsWithoutUpdatedReview;
          userServ.updateUser(user);
          const rating = this.calcRating(
            reviews,
            review,
            product.total_reviews
          );
          product.rating = rating;
          prodServ.updateProduct(product);
          return await this.reviewRepo.save(review);
        } else throw new Error("something went wrong");
      } else throw new Error("Review not found");
    } catch (err: any) {
      return err;
    }
  }

  calcRating(
    reviews: Array<Review>,
    updatedReview: Review,
    total: number
  ): number {
    if (reviews.length > 0) {
      const reviewWithoutUpdatedReview = reviews.filter(
        (rev: Review) => rev.review_id != updatedReview.review_id
      );
      let ratingSum = 0;
      reviewWithoutUpdatedReview.forEach((rev: Review) => {
        ratingSum += rev.rating;
      });
      return (ratingSum + updatedReview.rating) / total;
    } else return updatedReview.rating;
  }
}
