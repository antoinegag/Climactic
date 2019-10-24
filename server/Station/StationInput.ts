import { InputType, Field } from "type-graphql";
import Station from "./Station";

@InputType()
export default class StationInput implements Partial<Station> {
  @Field({ nullable: true })
  name?: string;

  @Field({ name: "id" })
  _id: number;

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  @Field({ name: "ip", nullable: true })
  _ip?: string;

  public get ip(): string | undefined {
    return this._ip;
  }

  public set ip(ip: string) {
    this._ip = ip;
  }
}
