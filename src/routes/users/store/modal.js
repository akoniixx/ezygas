import React, { Component, Fragment } from "react";
import { Row, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import IntlMessages from "Util/IntlMessages";
import _ from 'lodash';
import * as jsx from "Assets/JSX-Style/InlineStyle";
class ModalControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const state = _.get(this.props, "state")
        const toggleSuccess = _.get(this.props, "toggleSuccess")
        const editDataSubmit = _.get(this.props, "editDataSubmit")
        const toggleChangePasswork = _.get(this.props, "toggleChangePasswork")
        return (
            <Fragment>
                <ModalConfirm state={state} toggleSuccess={toggleSuccess} editDataSubmit={editDataSubmit} />
                <ModalChangePassword state={state} toggleChangePasswork={toggleChangePasswork} />
            </Fragment>
        )
    }
}

export default ModalControl

/**
 * Modal used when save button is clicked.
 */
class ModalConfirm extends Component {
    render() {
        const state = _.get(this.props, "state")
        const toggleSuccess = _.get(this.props, "toggleSuccess")
        return (
            <Fragment>
                <Modal
                    className="store-management-modal"
                    isOpen={state.modalSuccess}
                    toggle={toggleSuccess}
                    backdrop={true}>
                    <ModalHeader style={jsx.headerModalNonLine} >
                        <Text
                            type="title"
                            text="การแก้ไขข้อมูลสำเร็จ"
                            size="1em" />
                    </ModalHeader>
                    <ModalBody>
                        <Button
                            type="primary"
                            text="ตกลง"
                            onClick={toggleSuccess} />
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

/**
 * Not used yet.
 */
class ModalChangePassword extends Component {
    render() {
        const state = _.get(this.props, "state")
        const toggleChangePasswork = _.get(this.props, "toggleChangePasswork")
        return (
            <Fragment>
                <Modal
                    isOpen={state.modalBack}
                    toggle={toggleChangePasswork}
                    backdrop={state.backdrop}
                >
                    <ModalBody>
                        <Row>
                            <Colxx xxs="12" >
                                <div class="tab-content p-b-3">
                                    <div class="form-group row">
                                        <label class="col-lg-4 col-form-label form-control-label"><div className="float-sm-right"><IntlMessages id="รหัสผ่านเก่า :" /></div></label>
                                        <div class="col-lg-8 col-form-label form-control-label">
                                            <input type="password" style={jsx.radius} class="form-control" value={""} size="1" onChange={""} disabled></input>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-4 col-form-label form-control-label"><div className="float-sm-right"><IntlMessages id="รหัสผ่านใหม่ :" /></div></label>
                                        <div class="col-lg-8 col-form-label form-control-label">
                                            <input type="password" style={jsx.radius} class="form-control" value={""} size="1" onChange={""} disabled></input>

                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-4 col-form-label form-control-label"><div className="float-sm-right"><IntlMessages id="ยืนยันรหัสผ่านใหม่ :" /></div></label>
                                        <div class="col-lg-8 col-form-label form-control-label">
                                            <input type="password" style={jsx.radius} class="form-control" value={""} size="1" onChange={""} disabled></input>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-4 col-form-label form-control-label"></label>
                                        <div class="col-lg-8 col-form-label form-control-label">
                                            <Button outline color="danger" className="mb-2" onClick={toggleChangePasswork}>
                                                <IntlMessages id="ยกเลิก" />
                                            </Button>{"  "}
                                            <Button outline color="primary" className="mb-2" onClick={""} >
                                                <IntlMessages id="ตกลง" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Colxx>
                        </Row>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}