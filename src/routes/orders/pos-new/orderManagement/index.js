import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Card, CardBody } from 'reactstrap';
import Media from 'react-media';
import * as screen from 'Constants/screenWidth';
import moment from 'moment';

//? Child Components
import Header from './header';
import ItemsList from './itemsList';
import DateComponent from './date';
import TimeComponent from './time';
import Result from './result';
import MobileModals from './mobileModals';

const Container = styled(Card)`
min-width: 300px;
margin: 0 1.5rem;
background: white;
border-radius: 10px;
`;

const ContainerBody = styled(CardBody)`
display: flex;
flex-direction: column;
`;

export default (props) => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedTime, setSelectedTime] = useState(moment());
    //? True if user choosing to send product via normal queue (Not specify send time).
    const [isSendViaQueue, setIsSendViaQueue] = useState(true); //!checkTime in old pos
    const isPast = (dateToCompare) => {
        const now = new Date();
        return dateToCompare - now < 0;
    }
    //? Recheck date and time, make sure user's not choosing the past.
    const checkCurrentTime = () => {
        const returnTime = (dateToReturn) => {
            const date = `${dateToReturn.getFullYear()}-${("0" + dateToReturn.getMonth()).slice(-2)}-${("0" + dateToReturn.getDate()).slice(-2)}`;
            const time = `${("0" + dateToReturn.getHours()).slice(-2)}:${("0" + dateToReturn.getMinutes()).slice(-2)}`;
            return `${date}T${time}:00+07:00`;
        }
        if (isSendViaQueue) {
            //! user choose send via queue, return current time
            const current = new Date();
            current.setDate(selectedDate.toDate().getDate());
            current.setMonth(selectedDate.toDate().getMonth() + 1);
            current.setFullYear(selectedDate.toDate().getFullYear());
            return returnTime(current);
        }
        const date = selectedDate.toDate();
        const time = selectedTime.toDate();
        const dateTime = new Date(`${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}`);
        if (!isPast(dateTime)) return returnTime(dateTime);
        return null;
    }
    const handleSubmit = () => {
        //! Validation Zone
        //*checkCurrentTime
        const dateTime = checkCurrentTime();
        if (dateTime == null) {
            console.warn('validation failed, date time error');
            props.toggleModalConfirm();
            return;
        }
        if(!props.summation.gas) {
            console.warn('validation failed, zero quantity.');
            props.toggleModalConfirm();
            return;
        }

        const itemsList = props.itemsList;
        let order = [];
        itemsList.forEach(
            item => {
                let quantity = item.quantity || ""
                if(quantity != ""){
                   let orderLine = {
                    stock: item.item.id,
                    quantity: +quantity
                }
                order = order.concat([orderLine]);  
                }
               
            }
        );
        props.setDataToSubmit({
            status: 2, //* Wait for transit
            deliver_time: dateTime,
            orders: order
        });
        props.toggleModalConfirm();
    }
    const headerProps = {
        clearItems: () => {
            props.clearItems();
            setSelectedDate(moment());
            setIsSendViaQueue(true);
        }
    };
    const itemsListProps = {
        itemsList: props.itemsList,
        setItemsList: props.setItemsList,
        onItemUncheck: props.onItemUncheck
    };
    const dateProps = {
        selectedDate: selectedDate,
        setSelectedDate: setSelectedDate
    };
    const timeProps = {
        selectedTime: selectedTime,
        setSelectedTime: setSelectedTime,
        isSendViaQueue: isSendViaQueue,
        setIsSendViaQueue: setIsSendViaQueue
    };
    const resultProps = { summation: props.summation, handleSubmit: handleSubmit };
    const allProps = {
        headerProps: headerProps,
        itemsListProps: itemsListProps,
        dateProps: dateProps,
        timeProps: timeProps,
        resultProps: resultProps,
        mobileProps: {
            isOpen: props.isSideButtonModalOpen,
            toggleModal: props.toggleModalSideButton
        }
    };
    return (
        <Fragment>
            <Media query={screen.nonMobileScreenQuery}>
                <Container>
                    <ContainerBody>
                        <Header {...headerProps} />
                        <ItemsList {...itemsListProps} />
                        <DateComponent {...dateProps} />
                        <TimeComponent {...timeProps} />
                        <Result {...resultProps} />
                    </ContainerBody>
                </Container>
            </Media>
            <Media query={screen.mobileScreenQuery}>
                <MobileModals {...allProps} />
            </Media>
        </Fragment>
    );
}