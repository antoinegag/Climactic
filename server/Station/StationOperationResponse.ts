import { ObjectType, Field } from "type-graphql";
import IOperationSuccessResponse from "./IOperationSuccessResponse";
import Station from "./Station";

@ObjectType({ implements: IOperationSuccessResponse })
export default class StationOperationResponse extends IOperationSuccessResponse {
  @Field({ nullable: true })
  station?: Station;
}
