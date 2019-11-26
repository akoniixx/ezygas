import React, { Fragment } from 'react';
import Text from 'Components/Text';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default ({ selectedDate, setSelectedDate }) => (
    <Fragment>
        <Text type="title" text="วันที่" align="start" size="0.8rem" />
        <div className="react-datepicker mt-2 mb-4 w-100">
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat="DD/MM/YYYY"
                showDisabledMonthNavigation
                withPortal
            />
        </div>
    </Fragment>
);