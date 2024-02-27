import { Request, Response } from "express";
import { ReviewService } from "../services/ReviewService";
import {
  PaginationParams,
  PaginationParamsWithProduct,
  PaginationParamsWithUser,
} from "../models/utils/PaginationParams";
import { Review } from "../models/Review";

const reviewServ = new ReviewService();

export class ReviewController {
  async httpGetAllReviews(req: Request, res: Response): Promise<Response> {
    try {
      const reviews = await reviewServ.getAllReviews();
      return res.status(200).json(reviews);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetReviewsWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const reviews = await reviewServ.getReviewsWithPagination(page, pageSize);
      return res.status(200).json(reviews);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetReviewById(req: Request, res: Response): Promise<Response> {
    try {
      const review_id = req.query.review_id as unknown as number;
      const review = await reviewServ.getReviewById(review_id);
      return res.status(200).json(review);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetReviewsFromUserWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize, user_id } =
        req.query as unknown as PaginationParamsWithUser;
      //   const user_id = req.query.user_id as unknown as number;
      const reviews = await reviewServ.getReviewsFromUserWithPagination(
        user_id,
        page,
        pageSize
      );
      return res.status(200).json(reviews);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetProductReviewsWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize, product_id } =
        req.query as unknown as PaginationParamsWithProduct;
      const reviews = await reviewServ.getProductReviewsWithPagination(
        product_id,
        page,
        pageSize
      );
      return res.status(200).json(reviews);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTotalReviewsNumber(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const total = await reviewServ.getTotalReviewsNumber();
      return res.status(200).json({ total: total });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTotalReviewsFromUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const user_id = req.query.user_id as unknown as number;
      const total = await reviewServ.getTotalReviewsFromUser(user_id);
      return res.status(200).json({ total: total });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCheckAlreadyReviewed(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const user_id = req.query.user_id as unknown as number;
      const product_id = req.query.product_id as unknown as number;
      const checker = await reviewServ.checkAlreadyReviewed(
        user_id,
        product_id
      );
      return res.status(200).json({ alreadyReviewed: checker });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSaveReview(req: Request, res: Response): Promise<Response> {
    try {
      const review = req.body as Review;
      const savedReview = await reviewServ.saveReview(review);
      return res.status(200).json(savedReview);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateReview(req: Request, res: Response): Promise<Response> {
    try {
      const review = req.body as Review;
      const updatedReview = await reviewServ.updatedReview(review);
      return res.status(200).json(updatedReview);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetReviewsFromUser(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.query.user_id as unknown as number;
      const reviews = await reviewServ.getReviewsFromUser(user_id);
      return res.status(200).json(reviews);
    } catch (err: any) {
      return res.status(404).json();
    }
  }
}
