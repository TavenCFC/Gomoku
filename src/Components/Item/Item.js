import React from 'react';
import './Item.css'

const Item = React.memo((props) => {

    return (
        <div onClick={() => { props.onClick(props.rowIdx, props.itemIdx) }}
            className={'item item-' + props.item} />
    )
});

export default Item;