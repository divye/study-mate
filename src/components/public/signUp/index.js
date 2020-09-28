import React, { useEffect } from "react";
import { connect } from "react-redux";
import {Typography, Container, Grid} from '@material-ui/core';
import Nav from '../../global/nav';
import {SIGN_UP} from '../../interface/form/formSections';
import Form from '../../interface/form';
import {onFormFieldChange, signUpRequest, getGroupDiscountRequest} from '../../../actions/app';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: 20
  },
}));

export function SignUp({onFormFieldChange, signUpRequest, groupDiscount, match, signUpForm, 
  getGroupDiscountRequest, isCompleted}) {
  const history = useHistory();
  const groupDiscountUrl = match.params.id;
  const classes = useStyles();
  const endDate = groupDiscount.get('end_date');
  const date = endDate ? new Date(endDate).toUTCString().substr(0, 16) : '';

  useEffect(() => {
    getGroupDiscountRequest({url: groupDiscountUrl});
  }, []);
  
  const signUp = (p) => {
    signUpRequest({...p, url: groupDiscountUrl});
  }

  return (
    <React.Fragment>
      <Nav/>
      <Grid container direction="column" justify="center" className="hero">
        <Typography variant="h2" gutterBottom={true} align="center">{groupDiscount.get('title')}</Typography>
        <Typography variant="h2" gutterBottom={true} align="center">Group Discount Sign-up</Typography>
      </Grid>
      <Container className={classes.body}>
        <Grid container>
          <Grid md={6} item className={classes.item}>
            <Typography variant="h4" gutterBottom={true}>How it works</Typography>
            <Typography color="textSecondary">
              Add your name to the group by midnight {date}. 
              After the deadline, once we have reached 50 sign-ups, 
              we will open the group discount for you to purchase your discounted access!
            </Typography>
            <Typography color="textSecondary">{groupDiscount.get('details')}</Typography>
          </Grid>
          <Grid md={6} item>
            <Typography variant="h4" gutterBottom={true}>Sign me up!</Typography>
            <Form sections={SIGN_UP} onChange={onFormFieldChange} values={signUpForm} 
              onSubmit={signUp} formType='signUpForm'/>
            {isCompleted && <Typography color="primary">Thanks for signing up! You are now added to the group!</Typography>}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
    
  );
}

const mapStateToProps = state => {
  return {
    signUpForm: state.app.get('signUpForm'),
    groupDiscount: state.app.get('groupDiscount'),
    isCompleted: state.app.get('isSignUpComplete')
  }
};

const mapDispatchToProps = dispatch => ({
  onFormFieldChange: (obj) => dispatch(onFormFieldChange(obj)),
  signUpRequest: (obj) => dispatch(signUpRequest(obj)),
  getGroupDiscountRequest: (obj) => dispatch(getGroupDiscountRequest(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
