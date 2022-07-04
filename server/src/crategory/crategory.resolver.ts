import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { CrategoryResolverBase } from "./base/crategory.resolver.base";
import { Crategory } from "./base/Crategory";
import { CrategoryService } from "./crategory.service";

@graphql.Resolver(() => Crategory)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class CrategoryResolver extends CrategoryResolverBase {
  constructor(
    protected readonly service: CrategoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
