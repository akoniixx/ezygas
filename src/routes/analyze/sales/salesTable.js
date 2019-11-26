import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';
import _ from 'lodash';
import Text from 'Components/Text';

class SalesTable extends Component {

    constructor(props) {
        super(props);
        this.renderTableHead = this.renderTableHead.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.renderTableSummary = this.renderTableSummary.bind(this);
    }

    renderTableHead(types) {
        return (
            <div className="table-row">
                <div className="table-item table-label left">{"ยี่ห้อ"}</div>
                {types.map(
                    (type, i) => (
                        <div key={i} className="table-item table-label">{type}</div>
                    )
                )}
                <div className="table-item table-label">{'บาท'}</div>
            </div>
        );
    }

    renderTableBody(data, rowLabels) {
        return data.map(
            (row, i) => {
                const cols = row.map(
                    (col, j) => (
                        <div key={j} className="table-item">
                            {col > 0 ? col : "-"}
                        </div>
                    )
                );
                return (
                    <div key={i} className="table-row">
                        <div className="table-label table-item left">{rowLabels[i]}</div>
                        {cols}
                    </div>
                );
            }
        );
    }

    renderTableSummary(income, sales, columns) {
        const width = (100 * columns);
        return (
            <div className="table-row" style={{ borderTop: 'solid 2px #8F8F8F' }}>
                <div className="table-label table-item left">
                    {"รวมทั้งหมด"}
                </div>
                <div className="table-item" style={{ width: width, minWidth: width }}>{`${sales} ถัง`}</div>
                <div className="table-item">{income}</div>
            </div>
        );
    }

    render() {
        const types = this.props.types;
        const brands = this.props.brands;
        const data = this.props.data;
        const sales = this.props.sales;
        const income = this.props.income;
        return (
            <Card className="card-table">
                <CardBody>
                    <CardTitle>
                        <Text
                            type="title"
                            text="ยอดขายวันนี้"
                            size="1.2em"
                            align="start" />
                    </CardTitle>
                    <div className="table-header">
                        {this.renderTableHead(types)}
                    </div>
                    {this.renderTableBody(data, brands)}
                    {this.renderTableSummary(income, sales, _.size(types))}
                </CardBody>
            </Card>
        );
    }

}

export default SalesTable;