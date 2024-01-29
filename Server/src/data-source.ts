import { DataSource } from "typeorm";
import { CartEntity } from "./entities/CartEntity";
import { ProductEntity } from "./entities/ProductEntity";
import { ProductTypeEntity } from "./entities/ProductTypeEntity";
import { PurchaseEntity } from "./entities/PurchaseEntity";
import { ShopOrderEntity } from "./entities/ShopOrderEntity";
import { StockEntity } from "./entities/StockEntity";
import { StockEntryEntity } from "./entities/StockEntryEntity";
import { UserEntity } from "./entities/UserEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    CartEntity,
    ProductEntity,
    ProductTypeEntity,
    PurchaseEntity,
    ShopOrderEntity,
    StockEntity,
    StockEntryEntity,
    UserEntity,
  ],
  subscribers: [],
  migrations: [],
});
