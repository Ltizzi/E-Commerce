import { Request, Response } from "express";
import { ProductTypeService } from "../services/ProductTypeService";
import { PaginationParams } from "../models/utils/PaginationParams";
import { ProductType } from "../models/ProductType";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";

const prodTypeServ = new ProductTypeService();

export class ProductTypeController {
  // private prodTypeServ = new ProductTypeService();

  async httpGetAllProductTypes(req: Request, res: Response): Promise<Response> {
    try {
      const types = await prodTypeServ.getAllTypes();
      return res.status(200).json(types);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTypesWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const types = await prodTypeServ.getTypesByPagination(page, pageSize);
      return res.status(200).json(types);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCountTypes(req: Request, res: Response): Promise<Response> {
    try {
      const totalTypeNumber = (await prodTypeServ.countTypes()) as number;
      return res.status(200).json({ totalTypes: totalTypeNumber });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTypeById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.type_id as unknown as number;
      const type = await prodTypeServ.getTypeById(id);
      return res.status(200).json(type);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetTypeByName(req: Request, res: Response): Promise<Response> {
    try {
      const name = req.query.name as unknown as string;
      const type = await prodTypeServ.getTypeByName(name);
      return res.status(200).json(type);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateProductType(req: Request, res: Response): Promise<Response> {
    try {
      const type = req.query.body as unknown as ProductType;
      const newType = await prodTypeServ.saveProductType(type);
      return res.status(200).json(newType);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteProductType(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.query.type_id as unknown as number;
      const response = (await prodTypeServ.softDeleteTypeById(
        id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json(response);
      else throw new Error("Something went wrong");
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateProductType(req: Request, res: Response): Promise<Response> {
    try {
      const type = req.body as unknown as ProductType;
      const newType = await prodTypeServ.updateProductType(type);
      return res.status(200).json(newType);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
