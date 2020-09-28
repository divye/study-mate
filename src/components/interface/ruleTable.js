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

export default function RuleTable({rows, activeIndex}) {
  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Number of People</TableCell>
            <TableCell align="right">Discount Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row" color={id}>
                {row.get('num_people')}+
              </TableCell>
              <TableCell align="right">
                {
                  activeIndex === id ? 
                    <Typography color="primary"><i>Current Discount</i> {row.get('percent')}%</Typography> : 
                    <Typography>{row.get('percent')}%</Typography>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}