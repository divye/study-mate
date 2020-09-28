import {fromJS} from 'immutable';
import * as actionTypes from "../../actions/actionTypes";

const signUpForm = {
  firstName: '',
  lastName: '',
  email: ''
}

const discountForm = {
  name: '',
  endDate: new Date(),
  rules: [],
  details: '',
  numberOfPeople: '',
  percent: ''
}

const initialState = fromJS({
  discounts: [],
  groupDiscountForm: discountForm,
  isSignUpComplete: false,
  discountId: '',
  signUpForm: signUpForm,
  groupDiscount: {},
  discount: {}
});

export default function(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case actionTypes.ON_FORM_FIELD_CHANGE: 
      if(payload.id === 'rule') {
        var curState = state.getIn([payload.formType, 'rules']);
        return state.setIn([payload.formType, 'rules'], curState.push(payload.value))
                    .setIn([payload.formType, 'numberOfPeople'], '')
                    .setIn([payload.formType, 'percent'], '');
      }
      return state.setIn([payload.formType, payload.id], payload.value);

    case actionTypes.CREATE_DISCOUNT_SUCCESS:
      return state.set('discountId', payload.id)
                  .set('groupDiscountForm', fromJS(discountForm));
    
    case actionTypes.GET_GROUP_DISCOUNT_SUCCESS:
      return state.set('groupDiscount', fromJS(payload.groupDiscount));
    
    case actionTypes.SIGN_UP_SUCCESS:
      return state.set('isSignUpComplete', true)
                  .set('signUpForm', fromJS(signUpForm));

    case actionTypes.GET_DISCOUNTS_SUCCESS:
      return state.set('discounts', fromJS(payload.discountList));
    
      case actionTypes.GET_DISCOUNT_REQUEST:
        return state.set('discountId', '');
    
        case actionTypes.GET_DISCOUNT_SUCCESS:
      return state.set('discount', fromJS(payload));

    default:
      return state;
  }
}

