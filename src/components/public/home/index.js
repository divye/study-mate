import React, { useEffect } from "react";
import { connect } from "react-redux";
import {Typography, Container, Divider} from '@material-ui/core';
import Nav from '../../global/nav';
import { useHistory } from 'react-router-dom';
import {createDiscountRequest, getDiscountsRequest} from '../../../actions/app';
import {PrimaryButton} from '../../../theme/styles';
import DiscountsTable from '../../interface/discountTable';

export function Home({discounts, createDiscountRequest, getDiscountsRequest}) {
  const history = useHistory();

  useEffect(() => {
    getDiscountsRequest();
  }, []);

  return (
    <React.Fragment>
      <Nav/>
      <Container>
        <Typography variant="h2" gutterBottom={true}>Group Discount Management</Typography>
        <PrimaryButton onClick={() => history.push('/new-discount')}>Create a new Discount</PrimaryButton>
        <Typography variant="h4" gutterBottom={true}>Curent Discounts</Typography>
        <DiscountsTable rows={discounts}/>
      </Container>
    </React.Fragment>
    
  );
}

const mapStateToProps = state => {
  return {
    discounts: state.app.get('discounts')
  }
};

const mapDispatchToProps = dispatch => ({
  createDiscountRequest: (obj) => dispatch(createDiscountRequest(obj)),
  getDiscountsRequest: (obj) => dispatch(getDiscountsRequest(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
