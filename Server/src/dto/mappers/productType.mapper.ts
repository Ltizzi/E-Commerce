import { ProductType } from "../../models/ProductType";
import { ProductTypeService } from "../../services/ProductTypeService";
import { ProductTypeRequest } from "../requests/productType.request";
import { ProductTypeResponse } from "../responses/productType.response";

const typeServ = new ProductTypeService();

export class ProductTypeMapper {
  toProductTypeResponse(type: ProductType): ProductTypeResponse {
    const typeRes: ProductTypeResponse = {
      prod_type_id: type.prod_type_id,
      name: type.name,
    };
    return typeRes;
  }

  async toProductTypeEntity(
    typeReq: ProductTypeRequest | ProductTypeResponse
  ): Promise<ProductType> {
    let type = {} as ProductType;
    if (typeReq.prod_type_id) {
      type = (await typeServ.getTypeById(typeReq.prod_type_id)) as ProductType;
    }
    type.name = typeReq.name;
    return type;
  }

  toArrayProductTypeResponse(
    types: Array<ProductType>
  ): Array<ProductTypeResponse> {
    let typesRes = [] as Array<ProductTypeResponse>;
    types.forEach((type) => typesRes.push(this.toProductTypeResponse(type)));
    return typesRes;
  }
}
