import * as FORM_TYPES from './formTypes';

export const GROUP_DISCOUNT = [
  {
    key: 'name',
    label: 'What is the name of the university?',
    placeholder: 'Name',
    type: FORM_TYPES.TEXT_FIELD,
    errorMessage: 'This field is required.'
  },
  {
    key: 'endDate',
    label: 'When does the sign up period end?',
    type: FORM_TYPES.DATE
  },
  {
    key: 'details',
    label: 'Enter details for the group discount',
    placeholder: 'Details',
    type: FORM_TYPES.TEXT_AREA,
    errorMessage: 'This field is required.'
  },
  {
    key: 'rule',
    label: 'Add a discount rule',
    type: FORM_TYPES.DISCOUNT_RULE
  },
  {
    key: 'rules',
    type: FORM_TYPES.DISCOUNT_RULES,
    errorMessage: 'Please add at least one group rule.'
  },
];

export const SIGN_UP = [
  {
    key: 'firstName',
    label: 'First Name',
    type: FORM_TYPES.TEXT_FIELD,
    errorMessage: 'Please enter your first name.'
  },
  {
    key: 'lastName',
    label: 'Last Name',
    type: FORM_TYPES.TEXT_FIELD,
    errorMessage: 'Please enter your last name.'
  },
  {
    key: 'email',
    label: 'Email',
    type: FORM_TYPES.EMAIL,
    errorMessage: 'Please enter a valid email.'
  }
];