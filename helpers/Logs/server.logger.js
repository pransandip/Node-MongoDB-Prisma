import { APP_STATE } from "../../context/store.js";

const printServerLogs = (req) => {
  APP_STATE.IP_HIT_COUNT += 1;
  console.log(`IP: ${req.ip} hits server: ${APP_STATE.IP_HIT_COUNT} time.`);
};

export default printServerLogs;
