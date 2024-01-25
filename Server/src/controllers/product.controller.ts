import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { PaginationParams } from "../models/utils/PaginationParams";
import { Product } from "../models/Product";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";

export class ProductController {
  private productServ = new ProductService();

  async httpGetAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = (await this.productServ.getProducts()) as Array<Product>;
      return res.status(200).json(products);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetProductsWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const products = (await this.productServ.getProductsByPagination(
        page,
        pageSize
      )) as Array<Product>;
      return res.status(200).json(products);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetProductById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.product_id as unknown as number;
      const product = (await this.productServ.getProductById(id)) as Product;
      return res.status(200).json(product);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetNumberOfProducts(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const totalNumber = (await this.productServ.countProducts()) as number;
      return res.status(200).json({ total: totalNumber });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = req.body as unknown as Product;
      const newProduct = (await this.productServ.saveProduct(
        product
      )) as Product;
      return res.status(200).json(newProduct);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteProductById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.query.product_id as unknown as number;
      const response = (await this.productServ.softDeleteProductById(
        id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json(response);
      else throw new Error("Something went wrong");
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = req.body as unknown as Product;
      const updatedProduct = await this.productServ.updateProduct(product);
      return res.status(200).json(updatedProduct);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
