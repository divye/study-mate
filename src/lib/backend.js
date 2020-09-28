import {
  getReq,
  postReq
} from './backendUtils';

/**
 * Post Requests
 */
export function createDiscount(payload) {
  return postReq('discount', payload);
}
export function signUp(payload) {
  return postReq('user', payload);
}

/**
 * Get Requests
 */
export function getDiscount(payload) {
  return getReq('discount', payload);
}
export function getDiscounts(payload) {
  return getReq('discounts', payload);
}
export function getGroupDiscount(payload) {
  console.log(payload);
  return getReq('group-discount', payload);
}
