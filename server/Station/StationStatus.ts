import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class StationStatus {
  @Field()
  version?: string;

  @Field()
  online: boolean;
}
