import React from 'react';
import './Row.css'

const Row = React.memo((props) => {

    return (
        <div onClick={() => {props.func(props.index)}} className={'item item-' + props.item}/>
    )
});

export default Row;