import React, { Component } from 'react';

//Child Components
import StockTable from './stockTable';
import StockSummary from './stockSummary';

class StockGroup extends Component {
    render() {
        const stockTableJson = this.props.stock;
        const types = stockTableJson.cylinder_type;
        const brands = stockTableJson.cylinder_brand;
        const data = stockTableJson.stock;
        return (
            <div className="card-group">
                <StockTable
                    types={types}
                    brands={brands}
                    data={data} />
                <StockSummary
                    totalEmpty={data.total_empty}
                    totalNormal={data.total_normal} />
            </div>
        );
    }
}

export default StockGroup;