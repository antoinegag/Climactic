import { Resolver, Query, Arg, Mutation } from "type-graphql";
import Station from "./Station";
import StationManager from "./StationManager";
import RegisterStationInput from "./RegisterStationInput";
import IOperationSuccessResponse from "./IOperationSuccessResponse";
import OperationSuccessResponse from "./OperationSuccessResponse";
import StationInput from "./StationInput";
import StationOperationResponse from "./StationOperationResponse";

@Resolver(Station)
class StationResolver {
  constructor(private stationManager: StationManager) {}

  @Query(returns => Station)
  async station(@Arg("id") id: number) {
    const station = StationManager.get(id);

    return station;
  }

  @Query(returns => [Station])
  async stations(@Arg("status", { nullable: true }) status: boolean) {
    const stations = StationManager.list();

    return stations;
  }

  @Mutation(type => Boolean)
  async beep(
    @Arg("stationId") stationId: number,
    @Arg("double", { nullable: true }) double?: boolean
  ) {
    const st = await StationManager.get(stationId);
    if (st) {
      return await st.beep(double);
    }
    return false;
  }

  @Mutation(type => StationOperationResponse)
  async renameStation(@Arg("id") id: number, @Arg("name") name: string) {
    let station;
    try {
      station = await StationManager.rename(id, name);
    } catch (error) {
      return {
        success: false,
        error: error.message
      } as StationOperationResponse;
    }
    return { success: true, station: station } as StationOperationResponse;
  }

  @Mutation(type => StationOperationResponse)
  async updateStationIP(@Arg("id") id: number, @Arg("ip") ip: string) {
    let station;
    try {
      station = await StationManager.updateIp(id, ip);
    } catch (error) {
      return {
        success: false,
        error: error.message
      } as StationOperationResponse;
    }
    return { success: true, station: station } as StationOperationResponse;
  }

  @Mutation(type => StationOperationResponse)
  async updateStation(@Arg("station") station: StationInput) {
    let newStation;
    try {
      newStation = await StationManager.update(
        station.id,
        station.ip,
        station.name
      );
    } catch (error) {
      return {
        success: false,
        error: error.message
      } as StationOperationResponse;
    }
    return { success: true, station: newStation } as StationOperationResponse;
  }

  @Mutation(type => OperationSuccessResponse)
  async deleteStation(@Arg("id") id: number) {
    try {
      await StationManager.remove(id);
    } catch (error) {
      return {
        success: false,
        error: error.message
      } as OperationSuccessResponse;
    }
    return { success: true } as OperationSuccessResponse;
  }

  @Mutation(type => StationOperationResponse)
  async registerStation(@Arg("ip") ip: string, @Arg("name") name: string) {
    let newStation;
    try {
      newStation = await StationManager.register(ip, name);
    } catch (error) {
      return {
        success: false,
        error: error.message
      } as StationOperationResponse;
    }
    return { success: true, station: newStation } as StationOperationResponse;
  }
}
