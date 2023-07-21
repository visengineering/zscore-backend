const DBController = require("../database");

class ZScoreHandler {
  static getZScoreData(controlParams) {
    const { controlGroup, targetGroup, variables } = controlParams;

    let targetJoinQuery = "";
    let controlJoinQuery = "";
    let targetWhereClause = "";
    let controlWhereClause = "";

    if (targetGroup.length > 1) {
      targetJoinQuery = targetGroup
        .slice(1, 3)
        .map(
          (_, index) =>
            `inner join data t${index + 2} on t1.user_id = t${
              index + 2
            }.user_id`
        )
        .join(" ");
    }

    if (targetGroup.length) {
      targetWhereClause = `
        where ${targetGroup
          .map((answer, index) => `t${index + 1}.answer_id = ${answer}`)
          .join(" and ")}
      `;
    }

    if (controlGroup.length) {
      controlWhereClause = `
        where ${controlGroup
          .map((answer, index) => `c${index + 1}.answer_id = ${answer}`)
          .join(" and ")}
      `;
    }

    if (controlGroup.length > 1) {
      controlJoinQuery = controlGroup
        .slice(1, 3)
        .map(
          (_, index) =>
            `inner join data c${index + 2} on c1.user_id = c${
              index + 2
            }.user_id`
        )
        .join(" ");
    }

    const zScoreQuery = `with universe as (
      select timestamp, user_id, a.label answer, q.variable variable, q.label question, a.answer_id, q.question_id
      from data d
      join answer a on d.answer_id = a.answer_id
      join question q on q.question_id = a.question_id
      ),
      final as (select variable, answer, g, count, sum(count) over(partition by g, variable) base
      from(select b.variable, b.answer, g, coalesce(count(distinct b.user_id), 0) count
      from (
      select t1.user_id, 'Target_group' g
      from data t1
      ${targetJoinQuery || ""}
      ${targetWhereClause || ""}
      union all
      select c1.user_id, 'Control_group' g
      from data c1
      ${controlJoinQuery || ""}
      ${controlWhereClause || ""}
      ) a
      join universe b on b.user_id = a.user_id and b.question_id in (${variables.join(
        ", "
      )})
      group by b.variable, b.answer, g) c)
      select variable, answer, count, base, count2, base2, 
      round((Count/ Base -Count2/Base2)/SQRT((((Count /Base )*Base +(Count2/Base2)*Base2)/(Base +Base2))*(1-(((Count /Base )*Base +(Count2/Base2)*Base2)/(Base +Base2)))*(1/Base +1/Base2)), 1) zscore        
      from 
      (select a.variable, a.answer, b.count count, b.base base, a.count count2, a.base base2, coalesce(b.g, 'A') bg,  coalesce(a.g, 'B') ag
      from final a
      full join final b on a.variable = b.variable and a.answer = b.answer  and a.g != b.g) as f
      where bg in ('Target_group', 'A') and ag in ('Control_group', 'B')
      order by variable, answer`;

    return DBController.client?.query(zScoreQuery);
  }
}

module.exports = ZScoreHandler;
