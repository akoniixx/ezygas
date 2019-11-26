import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { urls } from 'Constants/defaultValues';
import * as jsx from 'Assets/JSX-Style/InlineStyle';
import _ from 'lodash';

class PackageControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const selectedItem = _.get(this.props, "selectedItem")
        const method = {
            passToPackage: _.get(this.props, 'passToPackage')
        }
        return (
            <Fragment>
                <Package selectedItem={selectedItem} method={method} />
            </Fragment>
        )
    }
}

export default PackageControl

class Package extends Component {
    render() {
        const selectedItem = _.get(this.props, "selectedItem", null)
        const method = _.get(this.props, 'method')
        const formatNumber = (item)=>{
            return item.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
        }
        if (selectedItem != null) {
            return (
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column w-100" style={jsx.confirmPackageSize}>
                        <Row>
                            <Colxx xxs="12" className="mb-2 ">
                                <h2 style={jsx.fontStyle}><b><IntlMessages id={"แพ็คเกจที่คุณเลือก"} /></b></h2>
                            </Colxx>
                        </Row>
                        <Row>
                            <Colxx xxs="12">
                                <Card className="mb-5" style={jsx.confirmPackageCard}>
                                    <CardBody style={jsx.confirmPackageCardBody}>
                                        <Row>
                                            <Colxx xxs="8" >
                                                <Colxx xxs="12" className="mb-1">
                                                    <IntlMessages id={"แพ็คเกจที่คุณเลือก"} />
                                                </Colxx>
                                                <Colxx xxs="12">
                                                    <div style={jsx.fontStyle2}>
                                                        {selectedItem.name_en === "annual package" ? <div>{formatNumber(selectedItem.full_cost)}<IntlMessages id={" ฿/ปี"} /></div>
                                                            :
                                                            <a>{formatNumber(selectedItem.full_cost)}<IntlMessages id={" ฿/เดือน"} /></a>
                                                        }
                                                    </div>
                                                </Colxx>
                                            </Colxx>
                                            <Colxx xxs="2" className="d-flex flex-row justify-content-end">
                                                <div style={jsx.line}></div>
                                            </Colxx>
                                            <Colxx xxs="2" className="d-flex flex-row" style={jsx.confirmPackageImage}>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <i className="iconsmind-Pen-2" style={jsx.confirmPackageImageSize}
                                                        onClick={method.passToPackage}
                                                    />
                                                </div>
                                            </Colxx>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Colxx>
                        </Row>
                    </div>
                </div>
            )
        } else {
            return (
                <Fragment>
                    {method.passToPackage()}
                </Fragment>
            )
        }
    }
}
0