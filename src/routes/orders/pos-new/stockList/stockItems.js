import React from 'react';
import Text from 'Components/Text';
import styled, { css } from 'styled-components';
import CheckBox from 'Components/CheckBox';

const selectingBG = css`
background-color: rgba(25, 25, 25, 0.1) !important;
box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
`;
const Container = styled.div`
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
padding: .5rem;
margin: .25rem;
${({ selecting }) => selecting ? selectingBG : ''}
`;
const ImageContainer = styled.div`
margin-bottom: .5rem;
position: relative;
`;
const Image = styled.img`
height: 125px;
width: auto;
border-top-left-radius: calc(0.15rem - 1px);
border-top-right-radius: calc(0.15rem - 1px);
`;
const CheckBoxContainer = styled.div`
position: absolute;
top: 5px;
left: 5px;
`;
const Details = styled.div`
margin-bottom: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
& > * {
    margin-bottom: 0.25rem;
}
`;

const mappedStockList = (props) => {
    const { stock, itemsList, setItemsList, checkedItems, onItemCheck } = props;
    const handleItemClick = (item, e) => {
        e.preventDefault();
        const isChecked = !checkedItems[item.id];
        onItemCheck(isChecked, item);
        //*selectedItem
        if (isChecked) {
            const quantity = 1;
            const price = quantity * item.price;
            const itemWithDetails = {
                item: item,
                quantity: quantity,
                price: price
            }
            setItemsList(itemsList.concat([itemWithDetails]));
        } else setItemsList(itemsList.filter(
            (it) => it.item !== item
        ));
    }
    return stock.map(
        (item, i) => (
            item.is_active
                ? <Container
                    key={i}
                    selecting={checkedItems[item.id]}
                    onClick={(e) => handleItemClick(item, e)}
                >
                    <ImageContainer>
                        <Image
                            src={`/assets/img/${item.cylinder_brand} ${item.cylinder_type}.png`}
                        />
                        <CheckBoxContainer>
                            <CheckBox
                                hidden={!checkedItems[item.id]}
                                checked={checkedItems[item.id]}
                            />
                        </CheckBoxContainer>
                    </ImageContainer>
                    <Details>
                        <Text
                            type="title"
                            text={`${item.cylinder_type}.`}
                            size="1rem"
                        />
                        <Text
                            type="normal"
                            text={`${item.price} บาท ${item.quantity} ถัง`}
                        />
                    </Details>
                </Container>
                : ''
        )
    );
}

export default (props) => {
    const stock = props.stock;
    return (
        !stock.length == 0
            ? mappedStockList(props)
            : <Text
                type="title"
                text="ยังไม่มีรายการสินค้าถูกเปิดใช้"
            />
    );
}