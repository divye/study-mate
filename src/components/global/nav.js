import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import {NavBar, NavButton} from '../../theme/styles';
import { useHistory } from 'react-router-dom';

export function Nav(props) {
  const history = useHistory();

  return (
    <NavBar position="static" className="mt-10">
      <Toolbar>
        <NavButton onClick={() => history.push('/') } component={Link}>
          <h4>StudyMate</h4>
        </NavButton>
      </Toolbar>
    </NavBar>
  );
}

export default Nav;
