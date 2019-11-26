import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, Input } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import * as jsx from 'Assets/JSX-Style/InlineStyle';
import _ from 'lodash';


class UserDetailControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const props = _.get(this.props,"state")
        const method = {
            handleState: _.get(this.props,"handleState")
        }
        return (
            <Fragment>
                <UserDetail props={props} method={method}/>
            </Fragment>
        )
    }
}

export default UserDetailControl

class UserDetail extends Component {
    render() {
        const props = _.get(this.props,"props")
        const method = _.get(this.props, "method")
        return (
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column w-100" style={jsx.confirmPackageSize}>
                    <Row>
                        <Colxx xxs="12" className="mb-2 ">
                            <h2 style={jsx.fontStyle}><b><IntlMessages id={"ข้อมูลผู้ใช้"} /></b></h2>
                        </Colxx>
                    </Row>
                    <Row>
                        <Colxx xxs="12">
                            <div className="mb-2" style={jsx.fontStyle3}>
                                <IntlMessages id={"ชื่อ - นามสกุล ( บัญชีที่ใช้โอน )"} />
                            </div>
                            <div className='input-shadow mb-2'>
                                <Input value={props.name} onChange={(e)=>method.handleState(e, "name")} placeholder="Easygasshop" style={jsx.inputRadiusStyle}>
                                </Input>
                            </div>

                            <div className="mb-2" style={jsx.fontStyle3}>
                                <IntlMessages id={"E-mail"} />
                            </div>
                            <div className='input-shadow mb-2'>
                                <Input value={props.email} onChange={(e)=>method.handleState(e, "email")} placeholder="easy@gas.com" style={jsx.inputRadiusStyle}>
                                </Input>
                            </div>

                            <div className="mb-2" style={jsx.fontStyle3}>
                                <IntlMessages id={"เบอร์โทรศัพท์"} />
                            </div>
                            <div className='input-shadow mb-4'>
                                <Input value={props.tel} onChange={(e)=>method.handleState(e, "tel")} placeholder="090-000-0000" style={jsx.inputRadiusStyle}>
                                </Input>
                            </div>
                        </Colxx>
                    </Row>
                </div>
            </div>
        )
    }
}