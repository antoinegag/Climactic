import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class StationStatus {
  @Field({ nullable: true })
  version?: string;

  @Field()
  online: boolean;
}
