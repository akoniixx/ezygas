import React from 'react';
import Text from 'Components/text';
import styled from 'styled-components';

const Header = styled.div`
padding: 0 15px;
color: #0C0CA9; //! primary-color-3
display: flex;
align-items: baseline;
flex-wrap: wrap;
`;

const NavigationText = styled.span`
margin: 0 0.5rem 0.5rem 0.5rem;
`;

const navigationString = (customerName) => {
    const separator = " > ";
    const texts = ["ค้นหาลูกค้า", "ลูกค้า", "สั่งสินค้า", customerName];
    let out = "";
    texts.forEach(
        text => out.length == 0 ?
            out = text
            : out = out + separator + text
    )
    return out;
}

export default ({ customer }) => (
    <Header>
        <Text
            type="header"
            text="รายชื่อลูกค้า"
            color="inherit"
        />
        <NavigationText>{navigationString(customer.name || "Name")}</NavigationText>
    </Header>
);