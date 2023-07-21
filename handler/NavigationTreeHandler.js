const DBController = require("../database");

class NavigationTreeHandler {
  static getNavigationTree(navigationId) {
    return DBController.client?.query(`with answers as (
      SELECT answer.*, question.variable from answer
      inner join question on answer.question_id = question.question_id
      ORDER BY answer.answer_id
    ), questions as (
      select question.*, array_agg(answers.*) filter (where answers is not null) as children
        from question
      left join answers
      on question.question_id = answers.question_id
      group by question.question_id, question.navigation_id, question.variable, question.label, question.source, question.key
      ORDER BY question.variable
      ), childNavigation as (
         SELECT  navigation.*, JSON_AGG(questions.*) filter (where questions is not null) as children
        FROM navigation left join questions on
          questions.navigation_id = navigation.navigation_id
          group by navigation.navigation_id, navigation.label, navigation.parent_navigation_id
          ORDER BY navigation.label
      )
      Select parent.navigation_id, parent.parent_navigation_id, parent.label,
      COALESCE(JSON_AGG(DISTINCT jsonb_build_object('childNavigation',childNavigation.*)) filter (where childNavigation is not null), JSON_AGG(questions.*))  children
            from navigation parent
            left join childNavigation on parent.navigation_id = childNavigation.parent_navigation_id
          left join  questions on
          questions.navigation_id = parent.navigation_id
          where ${
            navigationId
              ? `parent.navigation_id = ${navigationId}`
              : "parent.parent_navigation_id is NULL "
          }
          group by parent.navigation_id, parent.label, parent.parent_navigation_id
          ORDER BY parent.label
        `);
  }

  static getVariables(navigationId) {
    return DBController.client?.query(`with questions as (
        select * from question
        ORDER BY question.variable
      ), childNavigation as (
         SELECT  navigation.*, JSON_AGG(questions.*) filter (where questions is not null) as children
        FROM navigation left join questions on
          questions.navigation_id = navigation.navigation_id
        group by navigation.navigation_id, navigation.label, navigation.parent_navigation_id
        ORDER BY navigation.label
      )
      Select parent.navigation_id, parent.parent_navigation_id, parent.label,
      COALESCE(JSON_AGG(DISTINCT jsonb_build_object('childNavigation',childNavigation.*)) filter (where childNavigation is not null), JSON_AGG(questions.*) filter (where questions is not null))  children
            from navigation parent
            left join childNavigation on parent.navigation_id = childNavigation.parent_navigation_id
          left join  questions on
          questions.navigation_id = parent.navigation_id
          where ${
            navigationId
              ? `parent.navigation_id = ${navigationId}`
              : "parent.parent_navigation_id is NULL "
          }
            group by parent.navigation_id, parent.label, parent.parent_navigation_id
            ORDER BY parent.label
          `);
  }
}

module.exports = NavigationTreeHandler;
