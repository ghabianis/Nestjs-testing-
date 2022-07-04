import { ApiProperty } from "@nestjs/swagger";
import { Crategory } from "./Crategory";
export class getListCrategoryDto {
  @ApiProperty({
    type: [Crategory],
  })
  readonly paginatedResult!: [Crategory];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
