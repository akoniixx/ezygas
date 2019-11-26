import React from 'react';
import styled from 'styled-components';
import Text from 'Components/Text';
import Checkbox from 'Components/CheckBox';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

const TimePickerContainer = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
margin-top: 0.5rem;
`;

export default ({ selectedTime, setSelectedTime, isSendViaQueue, setIsSendViaQueue }) => {
    const handleCheck = () => setIsSendViaQueue(!isSendViaQueue)
    return (
        <div className="mb-4">
            <Text type="title" text="เวลา" align="start" size="0.8rem" />
            <TimePickerContainer>
                <TimePicker
                    className="mr-3"
                    defaultValue={moment()}
                    showSecond={false}
                    value={selectedTime || moment()}
                    disabled={isSendViaQueue}
                    onChange={(time) => setSelectedTime(time)}
                />
                <Checkbox
                    checked={isSendViaQueue}
                    handleCheck={handleCheck}
                />
                <Text type="normal" text="ส่งตามคิว" />
            </TimePickerContainer>
        </div>
    );
}