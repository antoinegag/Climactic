import { ObjectType, Field } from "type-graphql";
import fieldConfig from "graphql-query-complexity/dist/estimators/fieldConfig";

@ObjectType()
export class EnvironmentData {
  @Field()
  temp: number;

  @Field()
  humidity: number;

  @Field()
  pressure: number;
}
