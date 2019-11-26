import React from 'react';
import styled from 'styled-components';
import { Card, CardBody } from 'reactstrap';
import StockItems from './stockItems';

const StockListContainer = styled(Card)`
flex-grow: 1;
align-items: stretch;
border-radius: 10px;
`;

const StockListCardBody = styled(CardBody)`
display: flex;
flex-direction: row;
flex-wrap: wrap;
overflow-y: auto;
height: 100%;
align-items: start;
`;

const StockList = (props) => {
    return (
        <StockListContainer>
            <StockListCardBody>
                <StockItems {...props} />
            </StockListCardBody>
        </StockListContainer>
    );
}

export default StockList;