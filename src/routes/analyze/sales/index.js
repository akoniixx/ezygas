import React, { Component } from 'react';

//Child Components
import SalesTable from './SalesTable';
import SalesSummary from './SalesSummary';

class SalesGroup extends Component {

    render() {
        const sales = this.props.sales;
        const brands = sales.cylinder_brand;
        const types = sales.cylinder_type;
        const data = sales.sales.data;
        const income = sales.sales.total_income;
        const amount = sales.sales.total_amount;
        return (
            <div className="card-group">
                <SalesTable
                    brands={brands}
                    types={types}
                    data={data}
                    income={income}
                    sales={amount} />
                <SalesSummary
                    income={income}
                    sales={amount} />
            </div>
        );
    }

}

export default SalesGroup;