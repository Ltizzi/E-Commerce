import { AppDataSource } from "../data-source";
import { ProductEntity } from "../entities/ProductEntity";
import { StockEntity } from "../entities/StockEntity";
import { Product } from "../models/Product";
import { StockEntry } from "../models/StockEntry";

export class ProductService {
  private productRepo = AppDataSource.getRepository(ProductEntity);

  private stockRepo = AppDataSource.getRepository(StockEntity);

  async getProducts(): Promise<Array<ProductEntity>> {
    return await this.productRepo
      .createQueryBuilder("product")
      .where({ soft_delete: false })
      .orderBy("product.product_id", "ASC")
      .getMany();
  }

  async getProductsByPagination(
    page: number,
    pageSize: number
  ): Promise<Array<ProductEntity>> {
    const skip = (page - 1) * pageSize;
    return await this.productRepo
      .createQueryBuilder("product")
      .where({ soft_delete: false })
      .orderBy("product.product_id", "ASC")
      .skip(skip)
      .take(pageSize)
      .getMany();
  }

  async countProducts(): Promise<number> {
    return await this.productRepo.count();
  }

  async getProductById(id: number): Promise<ProductEntity | null> {
    return await this.productRepo.findOneBy({
      product_id: id,
      soft_delete: false,
    });
  }

  async saveProduct(product: Product): Promise<ProductEntity | null> {
    const newProduct: ProductEntity = await this.productRepo.save(product);
    if (newProduct) {
      const newStock: StockEntity = new StockEntity();
      newStock.product = product;
      newStock.cantidad = 0;
      newStock.entries = new Array<StockEntry>();
      await this.stockRepo.save(newStock);

      return newProduct;
    }
    return null;
  }

  async softDeleteProductById(id: number): Promise<Object> {
    const productToRemove: ProductEntity | null =
      await this.productRepo.findOneBy({ product_id: id, soft_delete: false });

    if (productToRemove) {
      productToRemove.soft_delete = true;
      const stockToRemove: StockEntity | null = await this.stockRepo.findOneBy({
        product: productToRemove,
      });
      if (stockToRemove) {
        stockToRemove.soft_delete = true;
        await this.stockRepo.save(stockToRemove);
      }
      await this.productRepo.save(productToRemove);
      return { status: "OK" };
    }
    return { error: "Product not found!" };
  }

  async updateProduct(product: Product): Promise<ProductEntity | null> {
    const oldProduct = (await this.getProductById(
      product.product_id
    )) as Product;
    product.createdAt = oldProduct.createdAt;
    product.soft_delete = oldProduct.soft_delete;
    return await this.productRepo.save(product);
  }
}
