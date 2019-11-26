import React, { Component } from 'react';
import { Card } from 'reactstrap';
import Text from 'Components/Text';

const card = (label, value) => {
    return (
        <Card className="summary-card">
            <img
                src="/assets/img/dashboard_cylinder.png"
                alt="cylinder" />
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

export default class StockSummary extends Component {
    render() {
        const normal = this.props.totalNormal;
        const empty = this.props.totalEmpty;
        return (
            <div className="summary-cards">
                {card("ถังเต็ม", normal)}
                {card("ถังเปล่า", empty)}
            </div>
        );
    }
}