const bcrypt = require('bcrypt');
const util = require('../../lib/util');
const insert = require('./insert');
const select = require('./select');

const createDiscount = (request, response) => {
  const {body} = request;
  return insert.createDiscount(body, response);
}

const signUp = (request, response) => {
  const {body} = request;
  return insert.signUp(body, response);
}

const getDiscounts = (request, response) => {
  const {query} = request;
  return select.getDiscounts(query, response);
}

const getDiscount = (request, response) => {
  const {query} = request;
  return select.getDiscount(query, response);
}

const getGroupDiscount = (request, response) => {
  const {query} = request;
  return select.getGroupDiscount(query, response);
}

module.exports = {
  createDiscount,
  signUp,
  getDiscount,
  getGroupDiscount,
  getDiscounts
}

