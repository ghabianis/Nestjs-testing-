import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CrategoryService } from "./crategory.service";
import { CrategoryControllerBase } from "./base/crategory.controller.base";

@swagger.ApiTags("crategories")
@common.Controller("crategories")
export class CrategoryController extends CrategoryControllerBase {
  constructor(
    protected readonly service: CrategoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
