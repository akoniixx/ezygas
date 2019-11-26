import React, { Component } from 'react';
import {
    Card
} from 'reactstrap';
import Text from 'Components/Text';

const card = (label, value, img) => {
    return (
        <Card className="summary-card">
            {img}
            <div className="text-section">
                <Text
                    type="title"
                    text={label}
                    size="1.3em"
                    align="start" />
                <Text
                    type="title"
                    text={value}
                    size="2.5em"
                    align="start" />
            </div>
        </Card>
    );
}

class SalesSummary extends Component {
    render() {
        const income = this.props.income;
        const sales = this.props.sales;
        return (
            <div className="summary-cards">
                {
                    card(
                        "จำนวนถังที่ขาย",
                        sales,
                        <img
                            src="/assets/img/dashboard_cylinder.png"
                            alt="cylinder" />
                    )
                }
                {
                    card(
                        "รายได้",
                        income,
                        <img
                            src="/assets/img/dashboard_dollar.png"
                            alt="dollar" />
                    )
                }
            </div>
        );
    }
}

export default SalesSummary;