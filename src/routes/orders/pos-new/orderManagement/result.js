import React from 'react';
import styled from 'styled-components';
import Text from 'Components/Text';
import Button from 'Components/Button';

const Container = styled.div`
display: flex;
flex-direction: column;
font-weight: 700;
margin-bottom: 1rem;
`;
const Total = styled.div`
display: flex;
position: relative;
justify-content: space-between;
font-weight: bold !important;
margin-bottom: 0.5rem;
& > *:nth-child(2) {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
}
:nth-child(2) {
    margin-bottom: 1rem;
}
`;

export default ({ summation, handleSubmit }) => {
    return (
        <Container>
            <Total>
                <Text type="normal" text="จำนวนทั้งหมด" align="start" />
                <Text type="normal" text={summation.gas} align="start" />
                <Text type="normal" text="ถัง" align="start" />
            </Total>
            <Total>
                <Text type="normal" text="รวมทั้งสิ้น" align="start" />
                <Text type="normal" text={summation.cost} align="start" />
                <Text type="normal" text="บาท" align="start" />
            </Total>
            <Button
                type="primary"
                text="ยืนยันการสั่งซื้อ"
                isFullWidth={true}
                onClick={handleSubmit}
            />
        </Container>
    );
}