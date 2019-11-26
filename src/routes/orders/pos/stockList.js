import React, { Component } from "react";
import CheckBox from 'Components/CheckBox';
import Text from 'Components/Text';
import { Badge, Card, CardBody, CardImg} from "reactstrap";
import _ from 'lodash';

class StockList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const func = this.props; //other functions (array)
        const stockData = _.get(func, 'stock'); //stock
        const valueCheck = _.get(func, 'valueCheck'); //checkbox function prop
        return (
            <div className="pos-items-list mx-2">
                <StockCardList
                    stockData={stockData}
                    func={func}
                    valueCheck={valueCheck} />
            </div>
        )
    }
}

export default StockList;

class StockCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const stock = this.props.stockData
        const valueCheck = this.props.valueCheck
        const func = this.props.func
        return (
            <Card>
                <CardBody>
                    {stock.loading && stock.list.length != 0 ?
                        stock.list.map((product, i) => {
                            if (product.is_active === true) {
                                return (
                                    <Card
                                        className={`pos-item p-2 m-1${valueCheck[product.id] ? ' selecting' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault;
                                            const ev = { target: { ...e.target, checked: !valueCheck[product.id] } };
                                            func.selectedItem(ev, product);
                                        }}
                                        key={i} >
                                        <div className="mb-2">
                                            <CardImg
                                                top
                                                src={"/assets/img/" + product.cylinder_brand + " " + product.cylinder_type + ".png"} />
                                            <CheckBox
                                                ref={'ref_' + product.id}
                                                hidden={!valueCheck[product.id]}
                                                checked={valueCheck[product.id]} />
                                            <Badge
                                                pill
                                                className="position-absolute badge-top-left" />
                                        </div>
                                        <div className="pos-item-details mb-3">
                                            <div className="mb-1">
                                                <Text type="title" text={`${product.cylinder_type}.`} size="1rem" />
                                            </div>
                                            <div className="mb-1">
                                                <Text type="normal" text={`${product.price} บาท ${product.quantity} ถัง`} />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            }
                        })
                        :
                        <div className="pos-no-available-items">
                            <Text type="title" text="ยังไม่มีรายการสินค้าถูกเปิดใช้" />
                        </div>
                    }
                </CardBody>
            </Card>
        )
    }
}



