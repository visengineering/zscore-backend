class ZScoreUtil {
  static validateRequest(params) {
    if (!params.controlGroup?.length) {
      throw {
        code: 400,
        msg: "Please provide at lease 1 control group",
      };
    }

    if (params.controlGroup.length > 3) {
      throw {
        code: 400,
        msg: "Selected control group should not be greater than 3",
      };
    }

    if (!params.targetGroup.length) {
      throw {
        code: 400,
        msg: "Please provide at lease 1 target group",
      };
    }

    if (params.targetGroup?.length > 3) {
      throw {
        code: 400,
        msg: "Selected target group should not be greater than 3",
      };
    }

    if (!params.variables?.length) {
      throw {
        code: 400,
        msg: "Please provide at lease 1 variables",
      };
    }

    if (params.variables?.length > 10) {
      throw {
        code: 400,
        msg: "Selected variables should not be greater than 10",
      };
    }
  }
}

module.exports = ZScoreUtil;
