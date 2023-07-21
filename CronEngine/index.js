const DBController = require("../database");

class CronEngine {
  static startJob() {
    const RE_CONNECT_TUNNEL = process.env.RE_CONNECT_TUNNEL_INTERVAL;
    setInterval(DBController.createRemoteTunnel, RE_CONNECT_TUNNEL)
  }
}

module.exports = CronEngine;