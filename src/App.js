import React from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Footer from "./components/global/footer";
import Home from "./components/public/home";
import NewDiscount from "./components/public/newDiscount";
import Discount from "./components/public/discount";
import SignUp from "./components/public/signUp";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#077481'
    }
  }
});

export function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-discount" component={NewDiscount} />
            <Route exact path="/discount/:id" component={Discount} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/sign-up/:id" component={SignUp} />
          </Switch>
          <Footer/>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
