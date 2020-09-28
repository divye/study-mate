import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns'; 
import {Typography, TextField, Grid, FormLabel, FormControl, InputAdornment, FormHelperText} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {PrimaryButton} from '../../../theme/styles';
import RuleTable from './ruleTable';
import * as formTypes from './formTypes';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff'
  },
  margin: {
    margin: 10
  },
  rule: {
    flexDirection: 'row',
    margin: 10
  }
}));

export function Form({onChange, values, onSubmit, sections, formType}) {
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const classes = useStyles();
  
  const submitForm = (e) => {
    e.preventDefault();
    const errors = sections.map((section, ind) => {
      const {key, type} = section;
      const value = values.get(key);
      if(value === '') 
        return true;
      else if (type === formTypes.DISCOUNT_RULES && value.size === 0) 
        return true;
      else if (type === formTypes.EMAIL) {
        const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return !value.match(format);
      }
      return false; 
    });

    if(errors.indexOf(true) > -1) {
      setErrors(errors);
      setShowErrors(true);
    } else {
      setErrors([]);
      setShowErrors(false);
      onSubmit({values: values});
    }
  }

  const onFormFieldChange = (e) => {
    onChange({formType: formType, id: e.target.id, value: e.target.value});
  }

  return (
    <Grid>
      <form className={classes.form} noValidate autoComplete="off" onSubmit={submitForm}>
        {
          sections.map((section, ind) => {
            const {key, label, placeholder, type, errorMessage} = section;
            const value = values.get(key);
            const hasError = showErrors && errors[ind];
            switch (type) {
              case formTypes.EMAIL:
              case formTypes.TEXT_FIELD:
                return(
                  <FormControl className={classes.margin} key={ind}>
                    <FormLabel>{label}</FormLabel>
                    <TextField id={key} placeholder={placeholder} fullWidth onChange={onFormFieldChange} 
                      value={value} helperText={hasError ? errorMessage : null} error={hasError}
                      type={type}/>
                  </FormControl>
                );

                case formTypes.DATE:
                  const dateVal = new Date(value).toUTCString();
                  return (
                    <FormControl className={classes.margin}>
                      <FormLabel>{label}</FormLabel>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <DatePicker disablePast onChange={(v) => {
                          const date = new Date(v).toUTCString();
                          return onFormFieldChange({target: {id: key, value: date}});
                        }}
                          value={value}
                          />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  );
                break;

                case formTypes.TEXT_AREA:
                  return (
                    <FormControl className={classes.margin}>
                      <FormLabel>{label}</FormLabel>
                      <TextField multiline={true} rows={3} variant="outlined" id={key} onChange={onFormFieldChange}
                        value={value} helperText={hasError ? errorMessage : null} error={hasError}/>
                    </FormControl>
                  );
                break;

                case formTypes.DISCOUNT_RULE:
                  const numberOfPeople = values.get('numberOfPeople');
                  const percent = values.get('percent');
                  return (
                    <FormControl >
                      <FormLabel>{label}</FormLabel>
                      <div className={classes.rule}>
                      <TextField id="numberOfPeople" className={classes.margin} type="number" placeholder="Number of people" 
                          onChange={onFormFieldChange} value={numberOfPeople}/>
                        <TextField id="percent" className={classes.margin} type="number" min="0" placeholder="Discount Percentage"
                          onChange={onFormFieldChange} value={percent}/>
                        <PrimaryButton onClick={(e) => {
                            onFormFieldChange({target: {id: key, value: {
                              numberOfPeople: numberOfPeople,
                              percent: percent
                            }}})
                          }} size="small">Add</PrimaryButton>
                      </div>
                    </FormControl>
                  );
                break;

                case formTypes.DISCOUNT_RULES:
                  if(value.size > 0) {
                    return (<RuleTable rows={value}/>);
                  } else if (hasError) {
                    return (<FormHelperText error={true}>{errorMessage}</FormHelperText>);
                  }
                break;
            
              default:
                break;
            }
          })
        }
        <PrimaryButton type="submit">Create</PrimaryButton>
      </form>
    </Grid>
  );
}

export default Form;

