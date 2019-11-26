import React from 'react';
import Button from 'Components/Button';
import DeleteButton from 'Components/Button/deleteButton';
import _ from 'lodash';

export function isOrderEmpty(orders) {
    if (!_.has(orders, 'length')) return true;
    return (_.get(orders, 'length') == 0);
}

export function isError(orders) {
    return (orders == undefined || !_.has(orders, 'length'));
}

export const infoButton = (order, toggleFunction) => {
    return (
        <Button
            type="image"
            path="/assets/img/icon_info.png"
            alt="ดูข้อมูล"
            onClick={() => toggleFunction("INFO", order)} />
    );
}

export const deleteButton = (order, toggleFunction) => {
    return (
        <DeleteButton
            onClick={() => toggleFunction("DELETE", order)} />
    );
}