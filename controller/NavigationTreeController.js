const NavigationTreeManager = require("../manager/NavigationTreeManager");

class NavigationTreeController {
  static async getNavigationTree(req, res) {
    try {
      res
        .status(200)
        .send({ tree: await NavigationTreeManager.getNavigationTree() });
    } catch (error) {
      if (error.code > 500 || typeof error.code === "string") {
        error.code = 500;
      }

      res
        .status(error.code || 500)
        .send(error.message || "Something went wrong while navigation tree");
    }
  }

  static async getVariables(req, res) {
    try {
      res
        .status(200)
        .send({ tree: await NavigationTreeManager.getVariables() });
    } catch (error) {
      if (error.code > 500 || typeof error.code === "string") {
        error.code = 500;
      }

      res
        .status(error.code || 500)
        .send(
          error.message || "Something went wrong while fetching navigation tree"
        );
    }
  }

  static async getNavigationTreeById(req, res) {
    try {
      const { id } = req.params;

      res
        .status(200)
        .send({ tree: await NavigationTreeManager.getNavigationTreeById(id) });
    } catch (error) {
      if (error.code > 500 || typeof error.code === "string") {
        error.code = 500;
      }

      res.status(error.code || 500).send({
        message:
          error.msg || "Something went wrong while fetching navigation tree",
        success: false,
      });
    }
  }

  static async getVariablesById(req, res) {
    try {
      const { id } = req.params;

      res
        .status(200)
        .send({ tree: await NavigationTreeManager.getVariablesById(id) });
    } catch (error) {
      if (error.code > 500 || typeof error.code === "string") {
        error.code = 500;
      }

      res.status(error.code || 500).send({
        message:
          error.msg || "Something went wrong while fetching navigation tree",
        success: false,
      });
    }
  }
}

module.exports = NavigationTreeController;
