import React, { Component, Fragment } from 'react';
import {
    Card,
    CardBody,
    CardImg
} from 'reactstrap';
import Text from 'Components/Text';
import Button from 'Components/Button';
import Dropdown from 'Components/Dropdown'
import { Separator } from 'Components/CustomBootstrap';
import Media from 'react-media';
import _ from 'lodash';

//Components
import RowComponent from './row-component';

//Constants
import * as screen from 'Constants/screenWidth';
import { injectIntl } from 'react-intl';

/**
 * how to use type props
 * 1st tab = "OVERVIEW"
 * 2nd tab = "EMPTY" (Use own card)
 * 3rd tab = "REFILL" (Use own card)
 * 4th tab = "FULL"
 */

class StockCard extends Component {
    render() {
        const props = this.props;
        const stockList = _.get(props, 'stockList', []);
        const stockListData = _.get(stockList, 'list', []);
        const methods = _.get(props, 'methods', []);
        const type = _.get(props, 'type', "OVERVIEW");
        if (!_.get(stockList, 'loading', false) || _.isEmpty(stockListData)) {
            return (
                <Text
                    type="title"
                    text="ยังไม่มีรายการสินค้า"
                    align="start" />
            );
        }
        return (
            <Fragment>
                <Media query={screen.nonMobileScreenQuery}>
                    <Fragment>
                        {stockListData.map(
                            product => {
                                return (
                                    <Desktop
                                        key={product.id}
                                        product={product}
                                        methods={methods}
                                        type={type} />
                                );
                            }
                        )}
                    </Fragment>
                </Media>
                <Media query={screen.mobileScreenQuery}>
                    <Fragment>
                        {stockListData.map(
                            (product) => {
                                return (
                                    <Mobile
                                        key={product.id}
                                        product={product}
                                        methods={methods}
                                        type={type} />
                                );
                            }
                        )}
                    </Fragment>
                </Media>
            </Fragment>
        )
    }
}

class Desktop extends Component {
    render() {
        const props = this.props;
        const product = _.get(props, 'product', []);
        const methods = _.get(props, 'methods', []);
        const type = _.get(props, 'type', []);
        const brand = _.get(product, 'cylinder_brand', 'brand');
        const quantity = _.get(product, 'quantity', '-');
        const price = _.get(product, 'price', 'price');
        const cylinderType = _.get(product, 'cylinder_type', 'type');
        const quantityE = _.get(product, 'quantity_empty', '-');
        const hasRightButton = (
            type == "OVERVIEW"
            || type == "FULL"
        );
        const labelColor = "inherit";
        //Sorting information and add to array to use map function to display.
        const rowBrand = { label: 'ยี่ห้อ', value: brand };
        const rowQuantity = { label: 'ถังเต็ม', value: quantity };
        const rowPrice = { label: 'ราคา', value: price };
        const rowType = { label: 'ขนาดสินค้า', value: cylinderType };
        const rowQuantityE = { label: 'ถังเปล่า', value: quantityE };
        let data = (function (type) {
            switch (type) {
                case "OVERVIEW":
                    return {
                        col1: [rowBrand, rowQuantity, rowPrice],
                        col2: [rowType, rowQuantityE]
                    }
                case "FULL":
                    return {
                        col1: [rowBrand, rowQuantity],
                        col2: [rowType]
                    }
                default:
                    return {};
            }
        })(type);
        return (
            <Card className="stock-card mb-3">
                <CardBody className="stock-item">
                    <div className="stock-card-body">
                        {/* Stock Image */}
                        <CardImg
                            src={"/assets/img/" + product.cylinder_brand + " " + product.cylinder_type + ".png"} />
                        {/* Information Section */}
                        <div>
                            <div className="stock-card-info py-2">
                                <div className="stock-card-info-column">
                                    {
                                        data.col1.map(
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
                                <div className="stock-card-info-column-2">
                                    {
                                        data.col2.map(
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
                        {
                            hasRightButton ?
                                <div className="stock-card-footer">
                                    {
                                        type == "OVERVIEW" ?
                                            <OverviewButtonGroup
                                                methods={methods}
                                                product={product} />
                                            : ''
                                    }
                                    {
                                        type == "FULL" ?
                                            <FullTankButtonGroup
                                                methods={methods}
                                                product={product} />
                                            : ''
                                    }
                                </div>
                                : ''
                        }
                    </div>
                </CardBody>
            </Card >
        );
    }
}

class Mobile extends Component {
    render() {
        const props = this.props;
        const product = _.get(props, 'product', []);
        const methods = _.get(props, 'methods', []);
        const type = _.get(props, 'type', 'type');
        const brand = _.get(product, 'cylinder_brand', 'brand');
        const quantity = _.get(product, 'quantity', '-');
        const price = _.get(product, 'price', 'price');
        const quantityE = _.get(product, 'quantity_empty', '-');
        const cylinderType = _.get(product, 'cylinder_type', 'cylinderType');
        const label = `${brand} ${cylinderType}`;
        const hasRightColumn = type == "OVERVIEW";
        const hasFooter = type == "OVERVIEW" || type == "FULL";
        const labelColor = "inherit";
        if (type != "REFILL") { //Refill tabs have same card as desktop view.
            return (
                <Card className="stock-card mb-3">
                    <CardBody className="stock-item">
                        <div className="stock-card-header mb-1">
                            <b>
                                <Text
                                    type="normal"
                                    text={label} />
                            </b>
                            {
                                type == "OVERVIEW" ?
                                    <i
                                        className="stock-edit-icon iconsmind-Pen-2"
                                        onClick={() => methods.toggleModal("edit", product)} />
                                    : ''
                            }
                        </div>
                        <Separator className="mb-2" />
                        <div className="stock-card-body mb-2">
                            <CardImg
                                src={"/assets/img/" + product.cylinder_brand + " " + product.cylinder_type + ".png"} />
                            <div>
                                <div className="stock-card-info py-2">
                                    <div className="stock-card-info-column">
                                        <div className="stock-card-info-row">
                                            <b><Text type="normal" text="ถังเต็ม:" color={labelColor} /></b>
                                            <Text type="normal" text={quantity} />
                                        </div>
                                        <div className="stock-card-info-row">
                                            <b><Text type="normal" text="ราคา:" color={labelColor} /></b>
                                            <Text type="normal" text={price} />
                                        </div>
                                    </div>
                                    {hasRightColumn ?
                                        <div className="stock-card-info-column-2">
                                            <div className="stock-card-info-row">
                                                <b><Text type="normal" text="ถังเปล่า:" color={labelColor} /></b>
                                                <Text type="normal" text={quantityE} />
                                            </div>
                                        </div>
                                        : ''
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            hasFooter ?
                                <div className="stock-card-footer">
                                    {
                                        type == "OVERVIEW" ?
                                            <OverviewButtonGroup
                                                methods={methods}
                                                product={product} />
                                            : ''
                                    }
                                    {
                                        type == "FULL" ?
                                            <FullTankButtonGroup
                                                methods={methods}
                                                product={product} />
                                            : ''
                                    }
                                </div>
                                : ''
                        }
                    </CardBody>
                </Card>
            );
        }
        console.log("เกิดข้อผิดพลาดขึ้น (Tab type invalid)");
        return <div></div>;
    }
}

class OverviewButtonGroup extends Component {
    render() {
        const props = this.props;
        const methods = _.get(props, 'methods', []);
        const product = _.get(props, 'product');
        const isMobile = window.innerWidth < screen.tabletScreenQuery.minWidth;
        return (
            <Fragment>
                {
                    !isMobile ? //In mobile view, edit icon will moved to right top corner of the card.
                        <b className="stock-edit-icon">
                            <i
                                className="iconsmind-Pen-2"
                                onClick={
                                    () => {
                                        methods.toggleModal("edit", product);
                                    }
                                } />
                        </b>
                        : ''
                }
                <div className="stock-card-button">
                    <Dropdown
                        type={
                            product.is_active == null
                                || product.is_active == false ?
                                'red' : 'green'
                        }
                        currentSelected={
                            product.is_active == null
                                ? "สถานะ" : product.is_active
                                    ? "ดำเนินการ" : "พักสินค้า"
                        }
                        list={[
                            {
                                name: "ดำเนินการ",
                                onSelected: (e) => methods.createProductStock(e, true, product)
                            },
                            {
                                name: "พักสินค้า",
                                onSelected: (e) => methods.createProductStock(e, false, product)
                            }
                        ]} />
                </div>
            </Fragment>
        );
    }
}

class FullTankButtonGroup extends Component {
    render() {
        const props = this.props;
        const product = _.get(props, 'product', []);
        const methods = _.get(props, 'methods', []);
        return (
            <Button
                type="primary"
                text="เพิ่มถังเต็ม"
                onClick={() => { methods.toggleModal(product) }} />
        );
    }
}

export default injectIntl(StockCard);