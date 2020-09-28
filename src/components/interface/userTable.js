import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    width: '90%'
  }
});

export default function UserTable({rows}) {
  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.size > 0 ? rows.map((row, id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {row.get('first_name')}
              </TableCell>
              <TableCell>{row.get('last_name')}</TableCell>
              <TableCell>{row.get('email')}</TableCell>
            </TableRow>
          )) :
          <TableRow>
            <TableCell><Typography variant="body2" color="textSecondary">No users have signed up yet</Typography></TableCell>
          </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}