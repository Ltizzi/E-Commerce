import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";

const reviewRouter: Router = Router();
const reviewController = new ReviewController();

reviewRouter.get("/all", reviewController.httpGetAllReviews);
reviewRouter.get(
  "/withPagination",
  reviewController.httpGetReviewsWithPagination
);
reviewRouter.get("/byId", reviewController.httpGetReviewById);
reviewRouter.get(
  "/byUserIdWithPagination",
  reviewController.httpGetReviewsFromUserWithPagination
);
reviewRouter.get(
  "/byProductIdWithPagination",
  reviewController.httpGetProductReviewsWithPagination
);
reviewRouter.get("/byUserId", reviewController.httpGetReviewsFromUser);
reviewRouter.get("/count", reviewController.httpGetTotalReviewsNumber);
reviewRouter.get("/countByUser", reviewController.httpGetTotalReviewsFromUser);
reviewRouter.get("/check", reviewController.httpCheckAlreadyReviewed);
reviewRouter.post("/new", reviewController.httpSaveReview);
reviewRouter.patch("/update", reviewController.httpUpdateReview);

module.exports = reviewRouter;
