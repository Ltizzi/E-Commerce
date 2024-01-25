import { Request, Response } from "express";
import { CartService } from "../services/CartService";
import { Cart } from "../models/Cart";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";

export class CartController {
  private cartServ = new CartService();

  async httpGetCartsFromUser(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.query.user_id as unknown as number;
      const carts = (await this.cartServ.getCartsByUserId(
        user_id
      )) as Array<Cart>;
      return res.status(200).json(carts);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetCartById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.cart_id as unknown as number;
      const cart = (await this.cartServ.getCartById(id)) as Cart;
      return res.status(200).json(cart);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewCart(req: Request, res: Response): Promise<Response> {
    try {
      const cart = req.body as unknown as Cart;
      const newCart = (await this.cartServ.saveCart(cart)) as Cart;
      return res.status(200).json(newCart);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteCartById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.cart_id as unknown as number;
      const response = (await this.cartServ.softDeleteCartById(
        id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json(response);
      else throw new Error("Something went wrong");
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateCart(req: Request, res: Response): Promise<Response> {
    try {
      const cart = req.body as unknown as Cart;
      const updatedCart = (await this.cartServ.updateCart(cart)) as Cart;
      return res.status(200).json(updatedCart);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
