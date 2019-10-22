import RequestHandler from "./RequestHandler";
import Endpoints from "./Endpoints";

export default class ImageAPI {
  static async list(verifyStatus) {
    return RequestHandler.get(Endpoints.STATION.LIST(true));
  }

  static async get(id) {
    return RequestHandler.get(Endpoints.STATION.GET(id));
  }

  static async delete(id) {
    return RequestHandler.delete(Endpoints.STATION.DELETE(id));
  }

  static async locate(id, double) {
    return RequestHandler.post(Endpoints.STATION.LOCATE(id, double));
  }
}
