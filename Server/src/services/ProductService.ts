import { AppDataSource } from "../data-source";
import { ProductEntity } from "../entities/ProductEntity";
import { StockEntity } from "../entities/StockEntity";
import { Product } from "../models/Product";
import { StockEntry } from "../models/StockEntry";
import { Cart } from "../models/Cart";

export class ProductService {
  private productRepo = AppDataSource.getRepository(ProductEntity);

  private stockRepo = AppDataSource.getRepository(StockEntity);

  async getProducts(): Promise<Array<ProductEntity>> {
    // const products = await this.productRepo
    //   .createQueryBuilder("product")
    //   .where({ soft_delete: false })
    //   .orderBy("product.product_id", "ASC")
    //   .getMany();
    const products = await this.productRepo.find({
      where: { soft_delete: false },
      order: { product_id: "ASC" },
    });

    return products;
  }

  async getProductsByPagination(
    page: number,
    pageSize: number
  ): Promise<Array<ProductEntity>> {
    const skip = (page - 1) * pageSize;
    // return await this.productRepo
    //   .createQueryBuilder("product")
    //   .where({ soft_delete: false })
    //   .orderBy("product.product_id", "ASC")
    //   .skip(skip)
    //   .take(pageSize)
    //   .getMany();
    const products = await this.productRepo.find({
      where: { soft_delete: false },
      skip: skip,
      take: pageSize,
      order: { product_id: "ASC" },
    });

    return products;
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
    // product.imageUrl = [];
    const newProduct: ProductEntity = await this.productRepo.save(product);
    if (newProduct) {
      const newStock: StockEntity = new StockEntity();
      newStock.product = product;
      newStock.product_id = product.product_id;
      newStock.cantidad = 0;
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
