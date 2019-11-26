import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, Button } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import * as jsx from 'Assets/JSX-Style/InlineStyle';
import _ from 'lodash';

class PackageCardControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const packageList = _.get(this.props, "packages")
        const method = {
            passToConfirmPackage: _.get(this.props, "passToConfirmPackage")
        }
        return (
            <Fragment>
                <DetailCard packageList={packageList} method={method} />
            </Fragment>
        )
    }
}

export default PackageCardControl


class DetailCard extends Component {
    render() {
        const packageList = _.get(this.props, "packageList")
        const method = _.get(this.props, "method")
        const comingSoon = (
            <a style={{ color: "red", fontSize: "0.6em" }}><IntlMessages id="(เร็วๆนี้)" /></a>
        )
        const checkMark = (
            <a style={{ color: "#02c741" }}><b><IntlMessages id="✓" /></b></a>
        )
        let firstCardStyle = { width: 350, height: 250 };
        if (window.innerWidth >= 1400) firstCardStyle = { ...firstCardStyle, borderRadius: "25px 0px 0px 25px" };
        return (
            <div className="d-flex flex-column justify-content-center" style={{ color: "#4a4a4a" }}>
                <Row className="d-flex flex-row justify-content-center">
                    <Card className="card-shadow mr-2 mb-2" style={firstCardStyle}>
                        <CardBody className="pl-1">
                            <div className="d-flex flex-row justify-content-center">
                                <Row>
                                    <Colxx xxs="12">
                                        <div className="px-2 mb-2" style={{ fontSize: "1.6em" }}>
                                            <b><IntlMessages id="การใช้งานสำหรับคุณ" /></b>
                                        </div>
                                        <div className="mb-1" style={{ fontSize: "1.6em" }}>
                                            {checkMark} <IntlMessages id="การจัดการคลังสินค้า" />
                                        </div>
                                        <div className="mb-1" style={{ fontSize: "1.6em" }}>
                                            {checkMark} <IntlMessages id="การจัดการธุรกิจ" />
                                        </div>
                                        <div className="mb-1" style={{ fontSize: "1.6em" }}>
                                            {checkMark} <IntlMessages id="แผนภาพรวมธุรกิจ" />
                                        </div>
                                        <div className="mb-1" style={{ fontSize: "1.6em" }}>
                                            {checkMark} <IntlMessages id="แอพพลิเคชั่นลูกค้า " /> {comingSoon}
                                        </div>
                                        <div className="mb-1" style={{ fontSize: "1.6em" }}>
                                            {checkMark} <IntlMessages id="แอพพลิเคชั่นการขนส่ง " /> {comingSoon}
                                        </div>
                                    </Colxx>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                    <PackgeCard packageList={packageList} method={method} />
                </Row>
            </div>
        )
    }
}

class PackgeCard extends Component {
    render() {
        const packageList = _.get(this.props, "packageList")
        const method = _.get(this.props, "method")
        const discount = (discount, type) => (
            <a><b><IntlMessages id="ลด " /><a>{formatNumber(discount)}</a>{type === "annual package"? <IntlMessages id=" บาทต่อปี" /> : <IntlMessages id=" บาท" />}</b></a>
        )
        const borderCard = {
            borderRadius: "0px 25px 25px 0px"
        }
        const buttonStyle = {
            ...jsx.buttonStyle,
            borderRadius: "25.5px",
            backgroundColor: "#0c0ca9",
            paddingLeft: 50,
            paddingRight: 50
        }
        const formatNumber = (item) => {
            return item.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
        }
        return (
            <Fragment>
                {/* {console.log("packageList", packageList.list)} */}
                {packageList.loading != false && packageList.list.length != 0 ?
                    packageList.list.map((item, i) => {
                        let borderCardStyle = {}
                        if (i != packageList.list.length - 1 || window.innerWidth < 1400) {
                            borderCardStyle = {}
                        } else {
                            borderCardStyle = {
                                ...borderCard
                            }
                        }
                        return (
                            <div className="pl-1 mb-2 mr-2" key={item.id}>
                                <Card className="card-shadow" style={borderCardStyle}>
                                    <CardBody className="pl-1" style={{ maxWidth: 350, minWidth: 350, maxHeight: 250, minHeight: 250 }}>
                                        <div className="d-flex flex-row justify-content-center p-2 mb-2">
                                            <h2><b>{item.name_th}</b></h2>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">
                                            <h1 className="mb-0 pb-0" style={{ color: "#f5a623" }}><b>{formatNumber(item.cost)}<a className="pl-3"><IntlMessages id="฿" /></a></b></h1>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center pl-5" style={{ color: "#9b9b9b", fontSize: "1.2em" }}>
                                            <IntlMessages id="/เดือน" />
                                        </div>
                                        <div className="d-flex flex-row justify-content-center mb-2" style={{ color: "#0074e4" }}>
                                            {item.name_en === "monthly package" ? <a className="mb-3"></a> : discount(item.discount, item.name_en)}
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">
                                            <Button style={buttonStyle} onClick={() => method.passToConfirmPackage(item)}>
                                                <IntlMessages id={"ซื้อเลย"} />
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    }) : ""}
            </Fragment>
        )
    }
}