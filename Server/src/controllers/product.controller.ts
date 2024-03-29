import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { PaginationParams } from "../models/utils/PaginationParams";
import { Product } from "../models/Product";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";
import { ProductMapper } from "../dto/mappers/product.mapper";
import { ProductRequest } from "../dto/requests/product.request";

const productServ = new ProductService();
const mapper = new ProductMapper();

export class ProductController {
  async httpGetAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = (await productServ.getProducts()) as Array<Product>;
      return res.status(200).json(mapper.toArrayProductResponse(products));
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
      const products = (await productServ.getProductsByPagination(
        page,
        pageSize
      )) as Array<Product>;
      return res.status(200).json(mapper.toArrayProductResponse(products));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetProductById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.product_id as unknown as number;
      const product = (await productServ.getProductById(id)) as Product;
      return res.status(200).json(mapper.toProductResponse(product));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetNumberOfProducts(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const totalNumber = (await productServ.countProducts()) as number;
      return res.status(200).json({ total: totalNumber });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = req.body as unknown as ProductRequest;
      const newProduct = (await productServ.saveProduct(
        await mapper.toProductEntity(product)
      )) as Product;
      return res.status(200).json(mapper.toProductResponse(newProduct));
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
      const response = (await productServ.softDeleteProductById(
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
      const product = req.body as unknown as ProductRequest;
      const updatedProduct = (await productServ.updateProduct(
        await mapper.toProductEntity(product)
      )) as Product;
      return res.status(200).json(mapper.toProductResponse(updatedProduct));
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
