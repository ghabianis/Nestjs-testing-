import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CrategoryModuleBase } from "./base/crategory.module.base";
import { CrategoryService } from "./crategory.service";
import { CrategoryController } from "./crategory.controller";
import { CrategoryResolver } from "./crategory.resolver";

@Module({
  imports: [CrategoryModuleBase],
  controllers: [CrategoryController],
  providers: [CrategoryService, CrategoryResolver, DbService],
  exports: [CrategoryService],
})
export class CrategoryModule {}
