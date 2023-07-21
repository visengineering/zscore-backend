const NavigationTreeHandler = require("../handler/NavigationTreeHandler");

class NavigationTreeManager {
  static async getNavigationTree() {
    const queryResult = await NavigationTreeHandler.getNavigationTree();

    return queryResult.rows || [];
  }

  static async getNavigationTreeById(navigationId) {

    const queryResult = await NavigationTreeHandler.getNavigationTree(navigationId);

    const navigationResult = queryResult.rows?.find(row => row);

    if (!navigationResult) {
      throw {
        code: 400,
        msg: 'Navigation with this id does not exist'
      }
    }

    return navigationResult;
  }

  static async getVariables() {
    const queryResult = await NavigationTreeHandler.getVariables();

    return queryResult.rows || [];
  }

  static async getVariablesById(navigationId) {
    const queryResult = await NavigationTreeHandler.getVariables(navigationId);

    const navigationResult = queryResult.rows?.find(row => row);

    if (!navigationResult) {
      throw {
        code: 400,
        msg: 'Navigation with this id does not exist'
      }
    }

    return navigationResult;
  }
}

module.exports = NavigationTreeManager;
