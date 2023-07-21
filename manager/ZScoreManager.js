const ZScoreHandler = require("../handler/ZScoreHandler");
const ZScoreUtil = require("../utils/ZScoreUtil");

class ZScoreManager {
  static async getZScoreData(controlParams) {
    ZScoreUtil.validateRequest(controlParams);

    const queryResult = await ZScoreHandler.getZScoreData(controlParams);

    return queryResult.rows || [];
  }
}

module.exports = ZScoreManager;
