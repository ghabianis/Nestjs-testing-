import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { CrategoryServiceBase } from "./base/crategory.service.base";

@Injectable()
export class CrategoryService extends CrategoryServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
