const { Pool } = require("pg");
const { createTunnel } = require("tunnel-ssh");

const sshconfig = {
  host: process.env.SSH_TUNNEL_HOST,
  username: process.env.SSH_TUNNEL_USER_NAME,
  password: process.env.SSH_TUNNEL_PASSWORD,
  port: process.env.SSH_TUNNEL_PORT,
};

const forwardOptions = {
  srcAddr: "0.0.0.0",
  srcPort:process.env.ASSIGNED_DATABASE_PORT,
  dstAddr: "127.0.0.1",
  dstPort: process.env.DATABASE_PORT,
};

const tunnelOptions = {
  autoClose: true,
};
const serverOptions = {
  port:process.env.ASSIGNED_DATABASE_PORT
};

class DBController {
  static client;

  constructor() {
    this.initializeDB();
  }

  async initializeDB() {
    try {
      const [server, connection] = await this.createRemoteTunnel();

      this.client = this.getDBConfig();

      server.on("error", (e) => {
        console.log(`Error while connectiong to server:: ${e}`);
      });

      connection.on("error", (e) => {
        console.log(`Error while connectiong to server:: ${e}`);
      });
    } catch (error) {
      this.client = null;
      console.log("Error while connecting with Database");
      console.log(error);
    }
  }

  async createRemoteTunnel() {
    try {
      let [server, connection] = await createTunnel(
        tunnelOptions,
        serverOptions,
        sshconfig,
        forwardOptions
      );

      console.log("Tunnel created");

      return [server, connection];
    } catch (error) {
      console.log(error)
      console.log("ERROR:: while creating tunnel");
    }
  }

  getDBConfig() {
    return new Pool({
      user: process.env.DATABASE_USER_NAME,
      host: process.env.DATABASE_HOST_NAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.ASSIGNED_DATABASE_PORT,
    });
  }
}

module.exports = new DBController();
