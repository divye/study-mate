import { combineEpics, ofType } from 'redux-observable';
import { flatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actionTypes from "../../actions/actionTypes";
import {createDiscount, getGroupDiscount, signUp, getDiscounts, getDiscount} from '../../lib/backend';

const createDiscountSuccess = (payload) => ({payload, type: actionTypes.CREATE_DISCOUNT_SUCCESS});
const createDiscountFailure = (payload) => ({payload, type: actionTypes.CREATE_DISCOUNT_FAILURE});
const createDiscountRequest = (action$, state$) => action$.pipe(
  ofType(actionTypes.CREATE_DISCOUNT_REQUEST),
  flatMap((action) => {
    const values = action.payload.values.toJS();
    return createDiscount(values).pipe(
      map(response =>  {
        return createDiscountSuccess(response);
      }),
      catchError(error => of(createDiscountFailure(error)))
    )
  })
);

const signUpSuccess = (payload) => ({payload, type: actionTypes.SIGN_UP_SUCCESS});
const signUpFailure = (payload) => ({payload, type: actionTypes.SIGN_UP_FAILURE});
const signUpRequest = (action$, state$) => action$.pipe(
  ofType(actionTypes.SIGN_UP_REQUEST),
  flatMap((action) => {
    const values = action.payload.values.toJS();
    return signUp({values: values, url: action.payload.url}).pipe(
      map(response =>  {
        return signUpSuccess(response);
      }),
      catchError(error => of(signUpFailure(error)))
    )
  })
);

const getDiscountSuccess = (payload) => ({payload, type: actionTypes.GET_DISCOUNT_SUCCESS});
const getDiscountFailure = (payload) => ({payload, type: actionTypes.GET_DISCOUNT_FAILURE});
const getDiscountRequest = (action$, state$) => action$.pipe(
  ofType(actionTypes.GET_DISCOUNT_REQUEST),
  flatMap((action) => {
    return getDiscount(action.payload).pipe(
      map(response =>  {
        return getDiscountSuccess(response);
      }),
      catchError(error => of(getDiscountFailure(error)))
    )
  })
);


const getDiscountsSuccess = (payload) => ({payload, type: actionTypes.GET_DISCOUNTS_SUCCESS});
const getDiscountsFailure = (payload) => ({payload, type: actionTypes.GET_DISCOUNTS_FAILURE});
const getDiscountsRequest = (action$, state$) => action$.pipe(
  ofType(actionTypes.GET_DISCOUNTS_REQUEST),
  flatMap((action) => {
    return getDiscounts().pipe(
      map(response =>  {
        return getDiscountsSuccess(response);
      }),
      catchError(error => of(getDiscountsFailure(error)))
    )
  })
);

const getGroupDiscountSuccess = (payload) => ({payload, type: actionTypes.GET_GROUP_DISCOUNT_SUCCESS});
const getGroupDiscountFailure = (payload) => ({payload, type: actionTypes.GET_GROUP_DISCOUNT_FAILURE});
const getGroupDiscountRequest = (action$, state$) => action$.pipe(
  ofType(actionTypes.GET_GROUP_DISCOUNT_REQUEST),
  flatMap((action) => {
    return getGroupDiscount(action.payload).pipe(
      map(response =>  {
        return getGroupDiscountSuccess(response);
      }),
      catchError(error => of(getGroupDiscountFailure(error)))
    )
  })
);

export default combineEpics(
  createDiscountRequest,
  getGroupDiscountRequest,
  signUpRequest,
  getDiscountsRequest,
  getDiscountRequest
);
