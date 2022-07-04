import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { ProductServiceBase } from "./base/product.service.base";

@Injectable()
export class ProductService extends ProductServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
