import React, { Component } from 'react';
import { Card, CardImg, CardBody } from 'reactstrap';
import Button from 'Components/Button';
import Text from 'Components/Text';
import { Separator } from 'Components/CustomBootstrap';
import _ from 'lodash';

//Components
import RowComponent from '../row-component';
import CheckBox from 'Components/CheckBox';

class StockCardMobile extends Component {

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
        const props = this.props;
        const product = _.get(props, 'product', []);
        const methods = _.get(props, 'methods', []);
        const buttonName = "เพิ่มถังเปล่า";
        const addButton = (buttonName, toggleModal) => (
            <Button
                type="primary"
                text={buttonName}
                onClick={() => toggleModal(product)} />
        );
        const label = `${product.cylinder_brand} ${product.cylinder_type}`
        return (
            <Card className="mb-3">
                <CardBody>
                    {/* Title */}
                    <div className="mb-1">
                        <Text
                            type="normal"
                            text={label}
                            align="start" />
                    </div>
                    <Separator className="mb-3" />
                    <div>
                        {/* Checkbox Section */}
                        <div className="check-box">
                            <CheckBox
                                checked={this.state.isChecked}
                                handleCheck={this.handleCheck} />
                        </div>
                        {/* Image Section */}
                        <div className="stock-image">
                            <CardImg
                                src={`/assets/img/${product.cylinder_brand} ${product.cylinder_type}.png`} />
                        </div>
                        {/* Information Section */}
                        <div className="stock-info">
                            <RowComponent
                                rowData={{
                                    label: "ถังเปล่า",
                                    value: product.quantity_empty
                                }} />
                            <RowComponent
                                rowData={{
                                    label: "ราคา",
                                    value: product.price
                                }} />
                        </div>
                    </div>
                    {/* Button Section */}
                    <div className="add-button mt-2">
                        {addButton(buttonName, methods.toggleModal)}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default StockCardMobile;