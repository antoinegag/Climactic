import { ObjectType, Field } from "type-graphql";
import IOperationSuccessResponse from "./IOperationSuccessResponse";

@ObjectType({ implements: IOperationSuccessResponse })
export default class OperationSuccessResponse extends IOperationSuccessResponse {}
