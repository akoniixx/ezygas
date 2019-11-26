import React, { Component, Fragment } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import Media from 'react-media';
import { Separator } from 'Components/CustomBootstrap';

import * as screenWidth from 'Constants/screenWidth';



import _ from 'lodash';
import { Colxx } from "Components/CustomBootstrap";
import * as jsx from "Assets/JSX-Style/InlineStyle";

class ApproveList extends Component {
    constructor(props) {
        super(props)
        this.appovePayment = this.appovePayment.bind(this);
        this.toggleModalConfirm = this.toggleModalConfirm.bind(this);
        this.toggleModalImage = this.toggleModalImage.bind(this);
        this.state = {
            id: "",
            imageUrl: "",
            modalImageOpen: false,
            modalConfirmOpen: false
        }
    }
    appovePayment(){
        let { id } = this.state
        this.toggleModalConfirm();
        this.props.approvePatmentState(id);
    }
    toggleModalConfirm(id=""){
        this.setState({
            modalConfirmOpen: !this.state.modalConfirmOpen,
            id: id
        })
    }
    toggleModalImage(url = "") {
        this.setState({
            modalImageOpen: !this.state.modalImageOpen,
            imageUrl: url
        })
    }
    render() {
        let { imageUrl, modalImageOpen, modalConfirmOpen } = this.state
        const packages = _.get(this.props, "packages", [])
        const approveList = _.get(this.props, "approveList", [])
        const method = {
            appovePayment: this.appovePayment,
            toggleModalConfirm: this.toggleModalConfirm,
            toggleModalImage: this.toggleModalImage
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
                <Media query={screenWidth.nonMobileScreenQuery}>
                <ListHeader css={listStyle} />
                </Media>
                <Media query={screenWidth.nonMobileScreenQuery}>
                <ListData packages={packages} approveList={approveList} method={method} />
                </Media>
                <Media query={screenWidth.mobileScreenQuery}>

                <ListDataMobile packages={packages} approveList={approveList} method={method} />

                </Media>
                <ModalImage modalOpen={modalImageOpen} method={method} img={imageUrl} />
                <ModalConfirm modalOpen={modalConfirmOpen} method={method}/>
            </Fragment >
        );
    }
}

class ListHeader extends Component {
    render() {
        return (
        
            <div className="d-flex flex-row justify-content-start mb-2 py-1 pl-4">
                <div className="d-flex flex-column w-100">
                
                    <Row>
                        <Colxx xxs="2">
                            <Text type="title" text="รหัสสั่งซื้อ" align="start" size="1.1em" />
                        </Colxx>
                        <Colxx xxs="2">
                            <Text type="title" text="ชื่อผู้ใช้" align="start" size="1.1em" />
                        </Colxx>
                        <Colxx xxs="2">
                            <Text type="title" text="เบอร์โทร" align="start" size="1.1em" />
                        </Colxx>
                        <Colxx xxs="6">
                            <Text type="title" text="โปรโมชั่น" align="start" size="1.1em" />
                        </Colxx>
                    </Row>

                </div>
            </div>
            
        );
    }
}

class ListData extends Component {
    render() {
        const packages = _.get(this.props, "packages.list")
        const approveList = _.get(this.props, "approveList.list", [])
        const method = _.get(this.props, "method")
        const center = "d-flex flex-column justify-content-center"
        return (
            <Fragment>
                {approveList != null && approveList.length > 0?
                    approveList.map(item => {
                        const packageSelected = _.find(packages, (p) => { return p.id === _.get(item, "package", []) })
                        return (
                            <Card className="mb-2">
                                <CardBody className="pl-4">
                                    <Row>
                                        <Colxx xxs="2" className={center} >
                                            <Text type="normal" text={item.purchase_number} align="start" />
                                        </Colxx>
                                        <Colxx xxs="2" className={center}>
                                            <Text
                                                type="normal" text={item.fullname} align="start" />
                                        </Colxx>
                                        <Colxx xxs="2 pl-4" className={center}>
                                            <Text type="normal" text={item.phonenumber} align="start" />
                                        </Colxx>
                                        <Colxx xxs="2 pl-4" className={center}>
                                            <Text type="normal" text={_.get(packageSelected, "name_th", "")} align="start" />
                                        </Colxx>
                                        <Colxx xxs="2" className={center}>
                                            <Button
                                                type="info"
                                                text="Slip"
                                                onClick={() => method.toggleModalImage(item.image_url)}
                                            />
                                        </Colxx><Colxx xxs="2" className={center}>
                                            <Button
                                                type="primary"
                                                text="ยืนยัน"
                                                onClick={() => method.toggleModalConfirm(item.id)}
                                            />
                                        </Colxx>
                                    </Row>
                                </CardBody>
                            </Card>
                        )
                    })
                    :
                    <div>
                        <Card>
                            <CardBody className="pl-4">
                                <Text type="title" text="ยังไม่มีรายการรอการยืนยัน" align="start" />
                            </CardBody>
                        </Card>
                    </div>
                }
            </Fragment>
        );
    }
}

class ListDataMobile extends Component {
    render() {
        const packages = _.get(this.props, "packages.list")
        const approveList = _.get(this.props, "approveList.list", [])
        const method = _.get(this.props, "method")
        const center = "d-flex flex-column justify-content-center"
        return (
            <Fragment>
                {approveList != null && approveList.length > 0?
                    approveList.map(item => {
                        const packageSelected = _.find(packages, (p) => { return p.id === _.get(item, "promotion", []) })
                        return (
                            <Card className="mb-2">
                                <CardBody className="pl-5">
                                   
                                    <Row>
                                        <Colxx xxs="12 pl-5" className={center} >
                                            <Text type="normal" text={item.purchase_number} align="start" />
                                        </Colxx>
                                        </Row>

                                        <Row>
                                        <Colxx xxs="12 pl-5" className={center}>
                                            <Text
                                                type="normal" text={item.fullname} align="start" />
                                        </Colxx>
                                        </Row>

                                        <Row>                                      
                                        <Colxx xxs="12 pl-5" className={center}>
                                            <Text type="normal" text={item.phonenumber} align="start" />
                                        </Colxx>
                                        </Row>

                                        <Row>
                                        <Colxx xxs="12 pl-5" className={center}>
                                            <Text type="normal" text={_.get(packageSelected, "name_th", "")} align="start" />
                                        </Colxx>

                                        </Row>
                                        <Separator className="mb-3" />
                                        <Row>   
                                        <Colxx xxs="6" className={center}>
                                            <Button
                                                type="info"
                                                text="Slip"
                                                onClick={() => method.toggleModalImage(item.image_url)}
                                            />
                                        </Colxx>
                                        <Colxx xxs="6" className={center}>
                                            <Button
                                                type="primary"
                                                text="ยืนยัน"
                                                onClick={() => method.toggleModalConfirm(item.id)}
                                            />
                                        </Colxx>
                                        </Row>
                                     
                                    
                                </CardBody>
                            </Card>
                        )
                    })
                    :
                    <div>
                        <Card>
                            <CardBody className="pl-4">
                                <Text type="title" text="ยังไม่มีรายการรอการยืนยัน" align="start" />
                            </CardBody>
                        </Card>
                    </div>
                }
            </Fragment>
        );
    }
}

/* Modal */
class ModalImage extends Component {
    render() {
        const modalOpen = _.get(this.props, "modalOpen")
        const method = _.get(this.props, "method")
        const img = _.get(this.props, "img", "")
        return (
            <Fragment>
                <Modal
                    isOpen={modalOpen}
                    toggle={method.toggleModalImage}
                    style={{ top: window.innerHeight * 0.10, left: -window.innerWidth * 0.05 }}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true}
                >
                    <ModalBody className="p-0" style={{ width: 0, height: 0 }}>
                        <div className="mb-2">
                            <img src={img} style={{ width: window.innerWidth * 0.5, height: window.innerHeight * 0.8 }} />
                        </div>
                    </ModalBody>

                </Modal>
            </Fragment>
        )
    }
}

class ModalConfirm extends Component {
    render() {
        const modalOpen = _.get(this.props, "modalOpen")
        const method = _.get(this.props, "method")
        return (
            <Fragment>
                <Modal
                    style={jsx.modalStyle}
                    isOpen={modalOpen}
                    toggle={method.toggleModalConfirm}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true} >
                    <ModalHeader
                        className="d-flex flex-row justify-content-center"
                        style={jsx.headerModalNonLine} >
                        <Text
                            type="normal"
                            text="ยืนยันรายการสั่งจอง" />
                    </ModalHeader>
                    <ModalBody className="modal-buttons">
                        <Button
                            type="info"
                            text="ยกเลิก"
                            onClick={method.toggleModalConfirm} />
                        <Button
                            type="primary"
                            text="ยืนยัน"
                            onClick={method.appovePayment} />
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}


export default ApproveList;