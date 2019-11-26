import React, { Component, Fragment } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import Dropdown from 'Components/Dropdown';
import Media from 'react-media';
import _ from 'lodash';
import { Colxx } from "Components/CustomBootstrap";
import * as jsx from "Assets/JSX-Style/InlineStyle";
import * as screenWidth from 'Constants/screenWidth';
import { Separator } from 'Components/CustomBootstrap';


class VendorList extends Component {
    constructor(props) {
        super(props)
        this.changeStatusUser = this.changeStatusUser.bind(this);
        this.changeStatusPromotion = this.changeStatusPromotion.bind(this);
        this.handlePromotion = this.handlePromotion.bind(this);
        this.handleItem = this.handleItem.bind(this);
        this.toggleModalInfo = this.toggleModalInfo.bind(this);
        this.toggleModalPromotion = this.toggleModalPromotion.bind(this);
        this.state = {
            vendorItem: [],
            modalInfoOpen: false,
            modalPromotionOpen: false,
            selectedPromotion: 0
        }
    }
    changeStatusUser(id, active) {
        this.props.changeStatusUser(id, active)
    }

    changeStatusPromotion(id) {
        this.setState({
            selectedPromotion: id
        })
    }

    handlePromotion(){
        const { vendorItem, selectedPromotion } = this.state
        const data = {
            vendor: vendorItem.id,
            promotion: selectedPromotion
        }
        this.props.handlePromotion(data)
        this.changeStatusPromotion(0)
    }

    handleItem(item){
        this.setState({
            vendorItem:item
        })
    }

    toggleModalInfo() {
        this.setState({
            modalInfoOpen: !this.state.modalInfoOpen,
        })
    }

    toggleModalPromotion() {
        this.setState({
            modalPromotionOpen: !this.state.modalPromotionOpen,
        })
    }

    render() {
        const vendors = (_.get(this.props, "vendors", []))
        const promotion = (_.get(this.props, "promotion", []))
        const method = {
            toggleModalInfo: this.toggleModalInfo,
            changeStatusUser: this.changeStatusUser,
            changeStatusPromotion: this.changeStatusPromotion,
            toggleModalPromotion: this.toggleModalPromotion,
            handlePromotion: this.handlePromotion,
            handleItem: this.handleItem
        }
        const listStyle = (function (width) {
            if (width < 1500) {
                return {
                    fontSize: "1.5vw"
                }
            } return {
                fontSize: "1vw"
            }
        })(window.innerWidth);
        return (
            <Fragment>
                <ListHeader css={listStyle} />
                <ListData vendors={vendors} method={method} />
                <ModalInfo modalOpen={this.state.modalInfoOpen} method={method} />
                <ModalPromotion selectedPromotion={this.state.selectedPromotion} promotion={promotion} modalOpen={this.state.modalPromotionOpen} method={method} />
            </Fragment >
        );
    }
}

class ListHeader extends Component {
    render() {
        return (
            <div className="d-flex flex-row justify-content-start mb-2 py-1 pl-4">
                <div className="d-flex flex-column w-100">
                    <Media query={screenWidth.nonMobileScreenQuery}>
                        <Row>
                            <Colxx xxs="2">
                                <Text type="title" text="ชื่อผู้ใช้" align="start" size="1.1em" />
                            </Colxx >
                            <Colxx xxs="2">
                                <Text type="title" text="เบอร์โทร" align="start" size="1.1em" />
                            </Colxx>

                            <Colxx xxs="4">
                                <Text type="title" text="ที่อยู่" align="start" size="1.1em" />
                            </Colxx>
                        </Row>
                    </Media>
                    <Media query={screenWidth.mobileScreenQuery}>
                        <Row>
                            <Colxx xxs="3">
                                <Text type="title" text="ชื่อผู้ใช้" align="start" size="1.1em" />
                            </Colxx >
                            <Colxx xxs="4">
                                <Text type="title" text="เบอร์โทร" align="start" size="1.1em" />
                            </Colxx>
                        </Row>
                    </Media>
                </div>
            </div>
        );
    }
}

class ListData extends Component {
    render() {
        const vendors = _.get(this.props, "vendors", [])
        const method = _.get(this.props, "method")
        const center = "d-flex flex-column justify-content-center"
        return (
            <Fragment>
                {vendors != null && vendors.length > 0 ?
                    vendors.map((item, i) => {
                        const address = `${item.province} ${item.district} ${item.subdistrict} ${item.zipcode}`
                        let id = item.id
                        const onSelected = (id, active) => { method.changeStatusUser(id, active) }
                        const status = (function (s) {
                            if (s === 1) {
                                return "รอการยืนยัน"
                            } else if (s === 2) {
                                return "ปกติ"
                            } else if (s === 3) {
                                return "ปิดการใช้งาน"
                            } else if (s === 4) {
                                return "ระงับการใช้งาน"
                            }
                        })(item.status)
                        const listDropdown =
                            [
                                { name: "รอการยืนยัน", onSelected: () => onSelected(id, 1) },
                                { name: "ปกติ", onSelected: () => onSelected(id, 2) },
                                { name: "ปิดการใช้งาน", onSelected: () => onSelected(id, 3) },
                                { name: "ระงับการใช้งาน", onSelected: () => onSelected(id, 4) },
                            ]
                        return (
                            <Card className="mb-2">
                                <Media query={screenWidth.nonMobileScreenQuery}>
                                    <CardBody className="pl-4">
                                        <Row>
                                            <Colxx xxs="2" className={center}>
                                                <Text type="normal" text={item.name_th} align="start" />
                                            </Colxx>
                                            <Colxx xxs="2" className={center}>
                                                <Text
                                                    type="normal" text={"0" + item.tel.substring(3)} align="start" />
                                            </Colxx>

                                            <Colxx xxs="3 pl-4" className={center}>
                                                <Text type="normal" text={address} align="start" />
                                            </Colxx>
                                            <Colxx xxs="2" className={center}>
                                                <Dropdown
                                                    key={i}
                                                    type={status === "ปกติ" ? "green" : "red"}
                                                    currentSelected={status}
                                                    list={listDropdown}
                                                />
                                            </Colxx>

                                            <Colxx xxs="2" className={center}>
                                                <Button
                                                    type="info"
                                                    text="โปรโมชั่น"
                                                    onClick={() =>{ method.handleItem(item), method.toggleModalPromotion()}}
                                                />
                                            </Colxx>


                                        </Row>
                                    </CardBody>
                                </Media>

                                <Media query={screenWidth.mobileScreenQuery}>
                                    <CardBody className="pl-4">
                                        <Row>
                                            <Colxx xxs="3" className={center}>
                                                <Text type="normal" text={item.name_th} align="start" />
                                            </Colxx>

                                            <Colxx xxs="5" className={center}>
                                                <Text
                                                    type="normal" text={"0" + item.tel.substring(3)} align="start" />
                                            </Colxx>
                                        </Row>
                                        <Separator className="mb-3" />

                                        <Row>
                                            <Colxx xxs="6" className={center}>
                                                <Dropdown
                                                    key={i}
                                                    type={status === "ปกติ" ? "green" : "red"}
                                                    currentSelected={status}
                                                    list={listDropdown}
                                                />
                                            </Colxx>
                                            <Colxx xxs="6" className={center}>
                                                <Button
                                                    type="info"
                                                    text="โปรโมชั่น"
                                                    onClick={() => { method.handleItem(item), method.toggleModalPromotion()}}
                                                />
                                            </Colxx>
                                        </Row>

                                    </CardBody>
                                </Media>
                            </Card>

                        )
                    })
                    :
                    <div>
                        <Card>
                            <CardBody className="pl-4">
                                <Text type="title" text="ยังไม่มีร้านค้า" align="start" />
                            </CardBody>
                        </Card>
                    </div>
                }
            </Fragment>
        );
    }
}

class ModalInfo extends Component {
    render() {
        const modalOpen = _.get(this.props, "modalOpen")
        const method = _.get(this.props, "method")
        const modalStyle = (function (w) {
            if (w >= 992) {
                return {
                    ...jsx.modalStyle, top: "20%", left: "20%"
                }
            } else {
                return {
                    ...jsx.modalStyle, top: "20%", left: "30%", maxWidth: "65vw"
                }
            }

        })(window.innerWidth)
        return (
            <Fragment>
                <Modal
                    style={modalStyle}
                    isOpen={modalOpen}
                    toggle={method.toggleModalInfo}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true} >
                    <ModalBody>

                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

class ModalPromotion extends Component {
    render() {
        const promotion = (_.get(this.props, "promotion.list", []))
        const selectedPromotion = _.get(this.props, "selectedPromotion", "")
        const modalOpen = _.get(this.props, "modalOpen")
        const method = _.get(this.props, "method")
        const modalStyle = (function (w) {
            if (w >= 686) {
                return { ...jsx.modalStyle }
            } else {
                return { ...jsx.modalStyle, top: "35%", left: "35%", maxWidth: "70vw" }
            }
        })(window.innerWidth)
        const onSelected = (id) => { method.changeStatusPromotion(id) }
        let listInitial = [ { name: "-ไม่เลือกโปรโมชัน-", onSelected: () => onSelected(0) } ]
        let creteListPromotion = (promotion) => {
            if (promotion != null) {
                promotion.map(items => {
                    listInitial = listInitial.concat({ name: items.name_th , onSelected: () => onSelected(items.id) })
                });
            }
            return listInitial
        }
        const listDropdown = creteListPromotion(promotion)
        const status = listDropdown[selectedPromotion].name
        return (
            <Fragment>
                <Modal
                    style={modalStyle}
                    isOpen={modalOpen}
                    toggle={method.toggleModalPromotion}

                >
                    <ModalHeader
                        className="d-flex flex-row justify-content-center"
                        style={jsx.headerModalNonLine} >
                        <Text
                            type="normal"
                            text="โปรโมชั่น" />
                    </ModalHeader>
                    <ModalBody>
                        <div className="d-flex flex-row justify-content-center mb-4">
                            <Dropdown
                                key={listDropdown.name}
                                type={"green"}
                                currentSelected={status}
                                list={listDropdown}
                            />
                        </div>
                        <div className="modal-buttons">
                            <Button
                                type="info"
                                text="ยกเลิก"
                                onClick={() => method.toggleModalPromotion()}
                            />

                            <Button
                                type="primary"
                                text="ยืนยัน"
                                onClick={() => { method.handlePromotion(), method.toggleModalPromotion() }}
                            />
                        </div>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}
export default VendorList;