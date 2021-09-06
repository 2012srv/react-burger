import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    // console.log(props);
    return props.show ? <div onClick={props.clicked} className={classes.Backdrop}></div> : <div></div>
}

export default backdrop;