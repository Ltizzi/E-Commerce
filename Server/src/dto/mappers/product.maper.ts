import { Product } from "../../models/Product";
import { ProductType } from "../../models/ProductType";
import { ProductService } from "../../services/ProductService";
import { ProductRequest } from "../requests/product.request";
import { ProductResponse } from "../responses/product.response";
import { ProductTypeMapper } from "./productType.mapper";

const typeMapper = new ProductTypeMapper();
const prodServ = new ProductService();

export class ProductMapper {
  toProductResponse(prod: Product): ProductResponse {
    const prodRes = {} as ProductResponse;
    prodRes.product_id = prod.product_id;
    prodRes.name = prod.name;
    prodRes.brand = prod.brand;
    prodRes.about = prod.about;
    prodRes.imageUrl = prod.imageUrl;
    prodRes.price = prod.price;
    prodRes.prod_type = typeMapper.toProductTypeResponse(prod.product_type);
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
    product.product_type = await typeMapper.toProductTypeEntity(fromProd);
    return product;
  }

  toArrayProductResponse(products: Array<Product>): Array<ProductResponse> {
    let prodsRes: Array<ProductResponse> = [];
    products.forEach((prod) => prodsRes.push(this.toProductResponse(prod)));
    return prodsRes;
  }
}
