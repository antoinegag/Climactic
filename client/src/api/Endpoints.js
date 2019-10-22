export default {
  STATION: {
    LIST: verifyStatus => `stations/?status=${verifyStatus}`,
    DELETE: id => `stations/${id}`,
    GET: id => `stations/${id}`,
    GET_DATA: id => `stations/${id}/data`,
    LOCATE: (id, double) => `stations/${id}/beep?double=${double}`
  }
};
