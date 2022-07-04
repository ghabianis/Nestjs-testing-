import { ApiProperty } from "@nestjs/swagger";
import { Product } from "./Product";
export class getListProductDto {
  @ApiProperty({
    type: [Product],
  })
  readonly paginatedResult!: [Product];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
