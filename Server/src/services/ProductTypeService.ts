import { AppDataSource } from "../data-source";
import { ProductTypeEntity } from "../entities/ProductTypeEntity";
import { ProductType } from "../models/ProductType";

export class ProductTypeService {
  private typeRepo = AppDataSource.getRepository(ProductTypeEntity);

  async getAllTypes(): Promise<Array<ProductTypeEntity>> {
    return await this.typeRepo
      .createQueryBuilder("product_type")
      .where({ soft_delete: false })
      .orderBy("product_type.prod_type_id", "ASC")
      .getMany();
  }

  async getTypesByPagination(
    page: number,
    pageSize: number
  ): Promise<Array<ProductTypeEntity>> {
    const skip = (page - 1) * pageSize;
    return await this.typeRepo
      .createQueryBuilder("product_type")
      .where({ soft_delete: false })
      .orderBy("product_type.prod_type_id", "ASC")
      .skip(skip)
      .take(pageSize)
      .getMany();
  }

  async countTypes(): Promise<number> {
    return await this.typeRepo.count();
  }

  async getTypeById(id: number): Promise<ProductTypeEntity | null> {
    return await this.typeRepo.findOneBy({
      prod_type_id: id,
      soft_delete: false,
    });
  }

  async getTypeByName(name: string): Promise<ProductTypeEntity | null> {
    return await this.typeRepo.findOneBy({
      name: name,
      soft_delete: false,
    });
  }

  async saveProductType(type: ProductType): Promise<ProductTypeEntity | null> {
    return await this.typeRepo.save(type);
  }

  async softDeleteTypeById(id: number): Promise<Object> {
    const typeToRemove: ProductTypeEntity | null =
      await this.typeRepo.findOneBy({ prod_type_id: id, soft_delete: false });
    if (typeToRemove) {
      typeToRemove.soft_delete = true;
      await this.typeRepo.save(typeToRemove);
      return { status: "OK" };
    } else return { error: "Product Type not found!" };
  }

  async updateProductType(
    type: ProductType
  ): Promise<ProductTypeEntity | null> {
    const oldType = (await this.getTypeById(type.prod_type_id)) as ProductType;
    type.createdAt = oldType.createdAt;
    type.soft_delete = oldType.soft_delete;
    return await this.typeRepo.save(type);
  }
}
