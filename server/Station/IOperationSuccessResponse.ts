import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export default abstract class IOperationSuccessResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  error?: string;
}
