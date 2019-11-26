import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import * as jsx from 'Assets/JSX-Style/InlineStyle';
import _ from 'lodash';

class HeaderControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <Fragment>
                <Header />
            </Fragment>
        )
    }
}

export default HeaderControl

class Header extends Component {
    render() {
        return (
            <div className="d-flex flex-row justify-content-center mb-5" style={{color: "#4a4a4a"}}>
                <Row>
                    <Colxx xxs="12">
                        <div className="d-flex flex-row justify-content-center">
                            <h1><b><IntlMessages id="แพ็คเกจการทำงาน" /></b></h1>
                        </div>
                        <div className="d-flex flex-row justify-content-center mb-2 text-center" style={jsx.fontStyle5}>
                            <b><IntlMessages id="มาทำให้การจัดการร้านคุณเป็นเรื่อง ง่ายๆ ครบ จบ ในเว็บเดียวกันเลย" /></b>
                        </div>
                        <div className="d-flex flex-row justify-content-center mb-5" style={{...jsx.fontStyle4,fontSize:"small"}}>   
                            <b><IntlMessages id="บอกต่อความสบายลด 30% ในเดือนแรก" /></b>
                        </div>
                    </Colxx>
                </Row>
            </div>
        )
    }
}