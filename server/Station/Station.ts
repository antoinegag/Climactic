import { isValidIPv4 } from "../helpers/formatHelper";
import { EnvironmentData } from "./EnvironmentData";
import { StationStatus } from "./StationStatus";
import fetch, { Response } from "node-fetch";

import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class Station {
  @Field()
  name: string;

  @Field({ name: "id" })
  private _id: number;

  @Field({ name: "ip" })
  private _ip: string;

  @Field({ name: "url" })
  private _url: string;

  private static baseUrl(ip): string {
    return `http://${ip}`;
  }

  constructor(id: number, ip: string, name: string) {
    this._id = id;
    this.ip = ip;
    this.name = name;

    this._url = Station.baseUrl(ip);
  }

  public get id(): number {
    return this._id;
  }

  public get ip(): string {
    return this._ip;
  }

  public set ip(value) {
    if (value.startsWith("localhost") || isValidIPv4(value)) {
      this._ip = value;
    } else {
      throw new Error("Invalid IP format");
    }
  }

  public get url() {
    return this._url;
  }

  private async query(path: string): Promise<Response> {
    return fetch(`${this._url}/${path}`);
  }

  private async post(path: string, body?: any): Promise<Response> {
    return fetch(`${this._url}/${path}`, { method: "POST", body });
  }

  @Field(type => Boolean)
  public async isOnline(): Promise<boolean> {
    try {
      const res = await this.query("");
      return res.ok;
    } catch (error) {
      return false;
    }
  }

  @Field(type => EnvironmentData, { nullable: true })
  public async data(): Promise<EnvironmentData | null> {
    let res;
    try {
      res = await this.query("data");
    } catch (error) {
      return null;
    }
    if (res.ok) {
      return (await res.json()) as EnvironmentData;
    }
  }

  @Field(type => StationStatus)
  public async status(): Promise<StationStatus> {
    let res;
    try {
      res = await this.query("");
    } catch (error) {
      return {
        online: false
      };
    }
    if (res.ok) {
      const status = await res.json();
      return {
        online: true,
        version: status.version
      };
    }
  }

  public async beep(double?: boolean) {
    try {
      await this.post(`${double ? "d" : ""}beep`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
