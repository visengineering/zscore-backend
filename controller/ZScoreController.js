const ZScoreManager = require("../manager/ZScoreManager");

class ZScoreController {
  static async getZScoreData(req, res) {
    try {
      const controlParams = req.body;

      res
        .status(200)
        .send({ data: await ZScoreManager.getZScoreData(controlParams) });
    } catch (error) {
      console.log(error)
      if (error.code > 500 || typeof error.code === "string") {
        error.code = 500;
      }

      res
        .status(error.code || 500)
        .send({
          message: error.msg || "Something went wrong while navigation tree",
          success: false
        });
    }
  }
}

module.exports = ZScoreController;
