import { InputType, Field } from "type-graphql";
import Station from "./Station";

@InputType({ description: "New station data" })
export default class RegisterStationInput implements Partial<Station> {
  @Field()
  name: string;

  @Field({ name: "ip" })
  _ip: string;

  public get ip(): string {
    return this._ip;
  }

  public set ip(ip: string) {
    this._ip = ip;
  }
}
