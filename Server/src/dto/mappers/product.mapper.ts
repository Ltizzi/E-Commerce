import { Product } from "../../models/Product";
import { ProductService } from "../../services/ProductService";
import { ProductTypeService } from "../../services/ProductTypeService";
import { ProductRequest } from "../requests/product.request";
import { ProductTypeRequest } from "../requests/productType.request";
import { ProductResponse } from "../responses/product.response";
import { ProductTypeResponse } from "../responses/productType.response";
import { ProductTypeMapper } from "./productType.mapper";

const typeMapper = new ProductTypeMapper();
const prodServ = new ProductService();
const typeServ = new ProductTypeService();

export class ProductMapper {
  toProductResponse(prod: Product): ProductResponse {
    const prodRes = {} as ProductResponse;
    prodRes.product_id = prod.product_id;
    prodRes.name = prod.name;
    prodRes.brand = prod.brand;
    prodRes.about = prod.about;
    prodRes.imageUrl = prod.imageUrl;
    prodRes.price = prod.price;
    prodRes.type = typeMapper.toProductTypeResponse(prod.type);
    prodRes.rating = prod.rating;
    prodRes.total_reviews = prod.total_reviews;
    return prodRes;
  }

  async toProductEntity(
    fromProd: ProductResponse | ProductRequest
  ): Promise<Product> {
    let product = {} as Product;
    if (fromProd.product_id) {
      product = (await prodServ.getProductById(fromProd.product_id)) as Product;
    }
    product.name = fromProd.name;
    product.brand = fromProd.brand;
    product.about = fromProd.about;
    product.imageUrl = fromProd.imageUrl;
    product.price = fromProd.price;
    product.type = await typeMapper.toProductTypeEntity(fromProd.type);
    product.rating = fromProd.rating;
    product.total_reviews = fromProd.total_reviews;
    return product;
  }

  toArrayProductResponse(products: Array<Product>): Array<ProductResponse> {
    let prodsRes: Array<ProductResponse> = [];
    if (products)
      products.forEach((prod) => prodsRes.push(this.toProductResponse(prod)));
    return prodsRes;
  }

  async toArrayProductEntity(
    prods: Array<ProductRequest>
  ): Promise<Array<Product>> {
    let products: Array<Product> = [];
    if (prods) {
      prods.forEach(async (prod) =>
        products.push(await this.toProductEntity(prod))
      );
    }
    return products;
  }
}
