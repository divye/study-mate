import React, { useEffect } from "react";
import { connect } from "react-redux";
import {Typography, Container, Grid} from '@material-ui/core';
import Nav from '../../global/nav';
import {GROUP_DISCOUNT} from '../../interface/form/formSections';
import Form from '../../interface/form';
import {onFormFieldChange, createDiscountRequest} from '../../../actions/app';
import { useHistory } from 'react-router-dom';

export function NewDiscount({groupDiscountForm, onFormFieldChange, createDiscountRequest, discountId}) {
  const history = useHistory();

  useEffect(() => {
    if(discountId !== '') {
      history.push(`/discount/${discountId}`)
    }
  }, [discountId]);

  return (
    <React.Fragment>
      <Nav/>
      <Container>
        <Typography variant="h2" gutterBottom={true}>New Group Discount</Typography>
        <Grid item md={6}>
          <Form sections={GROUP_DISCOUNT} onChange={onFormFieldChange} values={groupDiscountForm} 
            onSubmit={createDiscountRequest} formType='groupDiscountForm'/>
        </Grid>
      </Container>
    </React.Fragment>
    
  );
}

const mapStateToProps = state => {
  return {
    groupDiscountForm: state.app.get('groupDiscountForm'),
    discountId: state.app.get('discountId')
  }
};

const mapDispatchToProps = dispatch => ({
  onFormFieldChange: (obj) => dispatch(onFormFieldChange(obj)),
  createDiscountRequest: (obj) => dispatch(createDiscountRequest(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDiscount);
