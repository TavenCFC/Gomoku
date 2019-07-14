import React from 'react';
import Item from '../Item/Item'
import './Row.css'

const Row = (props) => {

    const items = props.row.map((item, itemIdx) => {
        return (
            <Item key={itemIdx + 1}
                rowIdx={props.rowIdx}
                onClick={props.onClick}
                itemIdx={itemIdx}
                item={item} />
        )
    });


    return (
        <div>
            {items}
        </div>
    )
};

export default Row;