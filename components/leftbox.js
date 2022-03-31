import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Usestyles=makeStyles({
    leftboxcontainer:{
        display:'flex',
        //alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        backgroundColor:'rgba(255, 243, 221, 1)'
    },
    btn:{
        width:'150px',
        height:'40px',
        backgroundColor:'white',
        margin:'10px',
        borderRadius:'10px'
    },
    ckbox:{
        width:'150px',
        height:'100px',
        backgroundColor:'white',
        margin:'10px',
        borderRadius:'10px'
    }
});

const leftbox = () => {
    const classes=Usestyles();
    //const [btn,setbtn]= useState(false);
  return (
    <div className={classes.leftboxcontainer}>
        <Button  className={classes.btn}>Status</Button>
            <div >
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Label" />
                    <FormControlLabel control={<Checkbox />} label="label" />
                </FormGroup>
            </div>
        <Button className={classes.btn}>Skills</Button>
        <Button className={classes.btn}>Methods</Button>
        <Button className={classes.btn}>Language</Button>
    </div>
  )
}

export default leftbox