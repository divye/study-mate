import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {PrimaryButton} from '../../theme/styles';
import { useHistory } from 'react-router-dom';

export default function RuleTable({rows}) {
  const history = useHistory();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Public URL</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.size > 0 ? 
            rows.map((row, id) => {
            const endDate = row.get('end_date');
            const endDateFormatted = endDate ? new Date(endDate).toUTCString().substr(0, 16) : '';
            const url =   process.env.REACT_APP_DOMAIN + '/sign-up/' + row.get('url');
            const dateCreated = row.get('date_created');
            const dateCreatedFormatted = dateCreated ? new Date(dateCreated).toUTCString().substr(0, 16) : '';
            return(
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {row.get('title')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dateCreatedFormatted}
                </TableCell>
                <TableCell component="th" scope="row">
                <a href={url}>{url}</a>
                </TableCell>
                <TableCell component="th" scope="row">
                  {endDateFormatted}
                </TableCell>
                <TableCell>
                  <PrimaryButton onClick={() => history.push(`/discount/${row.get('id')}`)}>View</PrimaryButton>
                </TableCell>
              </TableRow>
            )
            }) :
            <TableRow>
              <TableCell><Typography variant="body2" color="textSecondary">No discounts are created yet</Typography></TableCell>
            </TableRow>
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

