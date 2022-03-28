import React from 'react'
import { makeStyles } from '@material-ui/core'

const Usestyles=makeStyles({
    leftboxcontainer:{
        display:'flex',
        //alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        backgroundColor:'red'
    },
    btn:{
        width:'150px',
        height:'30px',
        backgroundColor:'pink',
        margin:'10px',
        borderRadius:'10px'
    }
});

const leftbox = () => {
    const classes=Usestyles();
  return (
    <div className={classes.leftboxcontainer}>
        <button className={classes.btn}>skills</button>
        <button className={classes.btn}>skills</button>
        <button className={classes.btn}>skills</button>
        <button className={classes.btn}>skills</button>
    </div>
  )
}

export default leftbox