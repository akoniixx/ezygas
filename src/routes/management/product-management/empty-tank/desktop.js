import React, { Component } from 'react';
import { Card, CardImg, CardBody } from 'reactstrap';
import Button from 'Components/Button';
import _ from 'lodash';

//Components
import CheckBox from 'Components/CheckBox';
import RowComponent from '../row-component'

//Constants
import * as screenWidth from 'Constants/screenWidth';

//Child Components
//import StockCard from './stock-card';
import RefillCard from './refill-card';

export default class Desktop extends Component {

    render() {
        const props = this.props;
        const stock = _.get(props, 'stock', []);
        const methods = _.get(props, 'methods', []);
        const refillList = _.get(props, 'refillList', []);
        return (
            <div className="empty-tank-management">
                <div className="empty-tank-list">
                    {
                        stock.map(
                            (product, i) => {
                                return (
                                    <StockCard
                                        key={i}
                                        product={product}
                                        methods={methods} />
                                );
                            }
                        )
                    }
                </div>
                <div className="send-to-refill-list">
                    <RefillCard
                        refillList={refillList}
                        methods={methods} />
                </div>
            </div>
        );
    }
}

class StockCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
        }
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck() {
        const prevState = this.state.isChecked;
        this.setState({
            isChecked: !prevState
        });
        this.props.methods.handleCheck(this.props.product, !prevState);
    }

    render() {
        const product = _.get(this.props, 'product', []);
        const brand = _.get(product, 'cylinder_brand', []);
        const type = _.get(product, 'cylinder_type', []);
        const empty = _.get(product, 'quantity_empty', []);
        const buttonName = "เพิ่มถังเปล่า";
        const addButton = (buttonName, toggleModal) => {
            return (
                <Button
                    type="primary"
                    text={buttonName}
                    onClick={() => toggleModal(product)} />
            );
        }
        const information = [
            { label: "ยี่ห้อ", value: brand },
            { label: "ขนาดสินค้า", value: type },
            { label: "ถังเปล่า", value: empty }
        ]
        const isTablet = (window.innerWidth < screenWidth.desktopScreenQuery.minWidth);
        return (
            <Card className="mb-3 mr-4">
                <CardBody>
                    <div className="empty-tank-item">
                        {/* Checkbox Section */}
                        <CheckBox checked={this.state.isChecked} handleCheck={this.handleCheck} />
                        {/* Image Section */}
                        <CardImg
                            src={"/assets/img/" + product.cylinder_brand + " " + product.cylinder_type + ".png"} />
                        {/* Information Section */}
                        <div>
                            <div className="stock-card-info py-2">
                                <div className="empty-tank-info-column">
                                    {
                                        information.map(
                                            (rowData, i) => {
                                                return (
                                                    <RowComponent
                                                        key={i}
                                                        rowData={rowData} />
                                                );
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Button Section */}
                        {!isTablet ? addButton(buttonName, this.props.methods.toggleModal) : ''}
                    </div>
                    {
                        isTablet ?
                            addButton(buttonName, this.props.methods.toggleModal)
                            : ''
                    }
                </CardBody>
            </Card>
        );
    }
}