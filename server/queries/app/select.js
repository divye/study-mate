const util = require('../../lib/util');

async function getDiscount(query, response) {
  const discountId = query.id;
  const discountQuery = `SELECT * FROM discounts where id = $1`;
  const discountDetails = await util.db.query(discountQuery, [discountId]).then((res) => res.rows[0]).catch((err) => console.error(err));

  const discountRulesQuery = `SELECT * FROM discount_rule where discount_id = $1 ORDER BY num_people ASC`;
  const discountRules = await util.db.query(discountRulesQuery, [discountId]).then((res) => res.rows).catch((err) => console.error(err));

  const discountUsersQuery = `SELECT * FROM users where discount_id = $1`;
  const discountUsers = await util.db.query(discountUsersQuery, [discountId]).then((res) => res.rows).catch((err) => console.error(err));

  const userCount = parseInt(discountUsers.length);

  const groups = discountRules.map((obj) => obj.num_people);
  const currentDiscount = getCurrentDiscount(userCount, groups);
  const currentDiscountIndex = groups.indexOf(currentDiscount);
  
  return response.status(201).send({
    details: discountDetails,
    rules: discountRules,
    users: discountUsers,
    currentDiscountIndex: currentDiscountIndex,
    userCount: userCount
  });
}

function getCurrentDiscount(userCount, groups) {
  let group = -1;
  if(userCount >= groups[0]) {
    let i = 0;
    group = groups[0];
    while(userCount >= groups[i]  && (i < groups.length)) {
      group = groups[i];
      i++;
    } 
  }
  return group;
}

async function getDiscounts(query, response) {
  const discountQuery = `SELECT * FROM discounts ORDER BY date_created DESC`;
  const list = await util.db.query(discountQuery).then((res) => res.rows).catch((err) => console.error(err));
  return response.status(201).send({
    discountList: list
  });
}

async function getGroupDiscount(query, response) {
  const {url} = query;
  const discountQuery = `SELECT title, details, end_date FROM discounts 
    WHERE url = $1`;
  const groupDiscount = await util.db.query(discountQuery, [url]).then((res) => res.rows[0]).catch((err) => console.error(err));
  if(!groupDiscount) {
    return response.status(400);
  }
  return response.status(201).send({
    groupDiscount: groupDiscount
  });
}

module.exports = {
  getDiscount,
  getGroupDiscount,
  getDiscounts,
  getCurrentDiscount
}