const util = require('../../lib/util');
const select = require('./select');
const cron = require('./cron');

async function createDiscount(body, response) {
  const dateCreated = new Date();
  const {name, details, rules, endDate} = body;
  const url = await getUniqueUrl(name);
  var discountQuery = `INSERT INTO discounts (date_created, title, details, end_date, url) 
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  const discount = await util.db.query(discountQuery, [dateCreated, name, details, 
    endDate, url]).then((res) => 
    res.rows[0]).catch((err) => console.error(err));
  if(!discount) {
   return response.status(400).send();
  }
  const ruleDate = new Date(endDate);
  cron.scheduleDiscountEnd(ruleDate, discount.id);

  const insertRules = await createRules(rules, discount.id);
  return response.status(201).send({id: discount.id});
}

async function signUp(body, response) {
  const dateCreated = new Date();
  const {firstName, lastName, email} = body.values;
  const {url} = body;
  const discount = await getDiscountIdByURL(url);
  if(!discount.id) {
    return response.status(400).send();
  }
  const userQuery = `INSERT INTO users (first_name, last_name, email, discount_id, date_created)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  const ruleObj = await util.db.query(userQuery, [firstName, lastName, email, discount.id, dateCreated]).then((res) => 
    res.rows[0]).catch((err) => console.error(err));
  return response.status(201).send();
}

async function createRules(rules, id) {
  return rules.map(async (rule, ind) => {
    const ruleQuery = `INSERT INTO discount_rule (discount_id, num_people, percent)
      VALUES ($1, $2, $3) RETURNING id`;
    const ruleObj = await util.db.query(ruleQuery, [id, rule.numberOfPeople, rule.percent]).then((res) => 
      res.rows[0]).catch((err) => console.error(err));
    return ruleObj;
  });
}

async function getDiscountIdByURL(url){
  const urlQuery = `SELECT id from "discounts" where url = $1`;
  const urlObj = await util.db.query(urlQuery, [url]).then((res) => res.rows[0]).catch((err) => console.error(err));
  return urlObj;
}

async function getUniqueUrl(title){
  var isNotUnique = true;
  var url = title.replace(/\s/g, '-');
  url = url.toLowerCase();
  while(isNotUnique != false) {
    let randomNumber = Math.floor(Math.random() * 10);
    var urlQuery = `SELECT url, id from "discounts" where url = $1`;
    const urlObj = await util.db.query(urlQuery, [url]).then((res) => res.rows[0]).catch((err) => console.error(err));
    isNotUnique = urlObj ? true : false;
    if(isNotUnique) {
      url += randomNumber;
    }
  }
  return url;
}

module.exports = {
  createDiscount,
  signUp
}