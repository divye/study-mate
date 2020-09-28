import {
  CREATE_DISCOUNT_REQUEST,
  ON_FORM_FIELD_CHANGE,
  SIGN_UP_REQUEST,
  GET_DISCOUNT_REQUEST,
  GET_GROUP_DISCOUNT_REQUEST,
  GET_DISCOUNTS_REQUEST
} from "./actionTypes";

export function createDiscountRequest(payload) {
  return { type: CREATE_DISCOUNT_REQUEST, payload: payload }
}

export function getDiscountRequest(payload) {
  return { type: GET_DISCOUNT_REQUEST, payload: payload }
}

export function getDiscountsRequest(payload) {
  return { type: GET_DISCOUNTS_REQUEST, payload: payload }
}

export function getGroupDiscountRequest(payload) {
  return { type: GET_GROUP_DISCOUNT_REQUEST, payload: payload }
}

export function signUpRequest(payload) {
  return { type: SIGN_UP_REQUEST, payload: payload }
}

export function onFormFieldChange(obj) {
  return {
    type: ON_FORM_FIELD_CHANGE,
    payload: obj
  }
}


