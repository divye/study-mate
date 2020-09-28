import React, { useEffect } from "react";
import { connect } from "react-redux";
import {Typography, Container, Grid, Paper} from '@material-ui/core';
import Nav from '../../global/nav';
import {getDiscountRequest} from '../../../actions/app';
import RuleTable from "../../interface/ruleTable";
import UserTable from "../../interface/userTable";
import { PrimaryButton } from "../../../theme/styles";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    marginBottom: 20,
    padding: 20,
    width: '95%'
  },
  actionContainer: {
    marginTop: 20
  },
}));

export function Discount({getDiscountRequest, discount, match}) {
  const discountId = match.params.id;
  const details = discount.get('details');
  const rules = discount.get('rules');
  const users = discount.get('users');
  const currentDiscountIndex = discount.get('currentDiscountIndex');
  const userCount = discount.get('userCount')
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getDiscountRequest({id: discountId});
  }, []);

  if(!details) return null;
  const location = window.location.href;
  const url = process.env.REACT_APP_DOMAIN + '/sign-up/' + details.get('url');
  const endDate = details.get('end_date');
  const endDateFormatted = endDate ? new Date(endDate).toUTCString().substr(0, 16) : '';
  
  return (
    <React.Fragment>
      <Nav/>
      <Container>
        <Typography variant="h2" gutterBottom={true}>Discount Details</Typography>
        <Grid container component={Paper} className={classes.detailsContainer}>
          <Grid md={6} xs={12} item>
            <Typography variant="h5" gutterBottom={true}>Title</Typography>
            <Typography variant="h6" color="primary" gutterBottom={true}>{details.get('title')}</Typography>
          </Grid>
          <Grid md={6} xs={12} item>
            <Typography variant="h5" gutterBottom={true}>Public URL</Typography>
            <a href={url}>{url}</a>
          </Grid>
          <Grid md={6} xs={12} item>
            <Typography variant="h5" gutterBottom={true}>Details</Typography>
            <Typography gutterBottom={true}>{details.get('details')}</Typography>
          </Grid>
          <Grid md={6} xs={12} item>
            <Typography variant="h5" gutterBottom={true}>End Date</Typography>
            <Typography color="secondary" gutterBottom={true}>{endDateFormatted}</Typography>
          </Grid>
          <Grid md={6} xs={12} item>
            <Typography variant="h5" gutterBottom={true}>Number of Users</Typography>
            <Typography gutterBottom={true}>{userCount}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid md={6} item>
            <Typography variant="h5" gutterBottom={true}>Rules</Typography>
            <RuleTable rows={rules} activeIndex={currentDiscountIndex}/>
          </Grid>
          <Grid md={6} item>
            <Typography variant="h5" gutterBottom={true}>Users</Typography>
            <UserTable rows={users}/>
          </Grid>
        </Grid>
        <Grid className={classes.actionContainer}>
          <PrimaryButton onClick={() => history.push('/')}>Return to List</PrimaryButton>
        </Grid>
      </Container>
    </React.Fragment>
    
  );
}

const mapStateToProps = state => {
  return {
    discount: state.app.get('discount')
  }
};

const mapDispatchToProps = dispatch => ({
  getDiscountRequest: (obj) => dispatch(getDiscountRequest(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discount);
