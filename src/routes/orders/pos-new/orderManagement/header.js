import React, { Fragment } from 'react';
import styled from 'styled-components';
import Text from 'Components/Text';
import Button from 'Components/Button';

const Container = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: .5rem;
& > span {
    flex-shrink: 0;
    margin-right: .5rem;
}
.buttons{
    padding: 0;
}
`;

export default ({ clearItems }) => {
    const content = (
        <Container>
            <Text type="title" text="รายการสั่งซื้อ" align="start" />
            <Button type="cancel" text="ยกเลิกรายการ" onClick={clearItems} />
        </Container>
    );
    return content;
}