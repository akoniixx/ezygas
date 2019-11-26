import React, { Fragment } from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import { Separator } from "Components/CustomBootstrap";
import Text from 'Components/Text';
import { Input } from 'Components/Input';
import { PlusButton, MinusButton } from 'Components/Button/quantityButton';

const row = css`
& > * {
    flex-basis: 40%;
    :not(:first-child){
        margin-left: 0.25rem;
    }
    :nth-child(2) {
        flex-basis: 10%;
    }
}
`;
const HeaderContainer = styled.div`
margin-bottom: 0.25rem;
display: flex;
font-weight: 900 !important;
${row}
`;
const ItemsListContainer = styled.div`
margin-bottom: 0.25rem;
display: flex;
font-weight: 700 !important;
${row}
`;
const QuantityContainer = styled.div`
display: flex;
justify-content: space-around;
align-items: baseline;
input {
    padding: 0 5px 0 5px;
    width: 30px;
}
`;
const DeleteButton = styled.span`
color: #B23B2A !important;
font-size: 15px;
margin-right: 5px;
font-weight: bold;
flex-basis: 0;
cursor: pointer;
`;

const HeaderList = (
    <HeaderContainer>
        <Text type="normal" text="สินค้า" align="start" />
        <Text type="normal" text="ราคา" align="start" />
        <Text type="normal" text="จำนวน" align="center" />
    </HeaderContainer>
);

const mappedItemsList = (itemsList, setItemsList, onItemUncheck) => {
    const changeItemsList = (item, changeTo) => {
        const pricePerUnit = item.item.price;
        const price = changeTo * pricePerUnit;
        if (changeTo < 0) {
            //!Quantity can't be lower than 0
            changeTo = 0;
        } else if (isNaN(changeTo)) {
            //!Quantity must be integer
            changeTo = 0;
        } else setItemsList(itemsList.map(
            it => {
                if (it.item.id === item.item.id)
                    return { ...it, quantity: changeTo, price: price }
                return it;
            }
        ));
    }
    const handleQuantityButton = (e, type, item) => {
        e.preventDefault();
        const isPlusButton = () => type == "+";
        const isMinusButton = () => !isPlusButton();
        if (isPlusButton()) {
            changeItemsList(item, +item.quantity + 1);
        }
        if (isMinusButton()) {
            changeItemsList(item, +item.quantity - 1);
        }
    }
    const deleteItem = (item) => {
        onItemUncheck(item.item.id);
        setItemsList(itemsList.filter(
            (it) => it.item !== item.item
        ));
    }
    return (
        <Fragment>
            {itemsList.map(
                (item, i) => (
                    <Fragment key={i}>
                        <ItemsListContainer>
                            <Text
                                type="normal"
                                text={`${item.item.cylinder_brand} ${item.item.cylinder_type}`}
                                align="start"
                            />
                            <Text type="normal" text={item.item.price} />
                            <QuantityContainer>
                                <MinusButton
                                    onClick={(e) => handleQuantityButton(e, '-', item)}
                                />
                                <Input
                                    value={item.quantity}
                                    onChange={(value) => { changeItemsList(item, value); }}
                                />
                                <PlusButton
                                    onClick={(e) => handleQuantityButton(e, '+', item)}
                                />
                            </QuantityContainer>
                            <DeleteButton
                                onClick={() => deleteItem(item)}
                            >
                                {"X"}
                            </DeleteButton>
                        </ItemsListContainer>
                        <Separator className="mb-2" />
                    </Fragment>
                )
            )}
        </Fragment>
    );
};

export default ({ itemsList, setItemsList, onItemUncheck }) => {
    return (
        <Fragment>
            {HeaderList}
            <Separator className="mb-2" />
            {mappedItemsList(itemsList, setItemsList, onItemUncheck)}
            <Separator className="mb-3" />
        </Fragment>
    );
}