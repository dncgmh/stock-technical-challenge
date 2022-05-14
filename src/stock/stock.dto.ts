import { Field, ObjectType } from '@nestjs/graphql';
import { IStock } from './stock.interface';

@ObjectType()
export class Stock implements IStock {
  @Field()
  code: string;
  @Field()
  growth: number;
}

@ObjectType()
export class GrowthStockResponseDto {
  @Field(() => Stock)
  min: Stock;
  @Field(() => Stock)
  max: Stock;
}
