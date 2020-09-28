import React, { PureComponent } from "react";
import Typography from '@material-ui/core/Typography';

class Footer extends PureComponent {

  render() {
    return (
      <footer className="footer">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-8 mt-md-0 mt-3">
              <h2>StudyMate</h2>
            </div>
            <div className="col-md-2 mb-md-0 mb-2">
              <Typography variant="h4">Company</Typography>
              <ul className="list-unstyled">
                <li>
                  <a href="#!">About Us</a>
                </li>
                <li>
                  <a href="#!">Privacy Policy</a>
                </li>
                <li>
                  <a href="#!">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
