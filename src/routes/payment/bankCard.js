import React, { Component, Fragment } from 'react';
import { Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardImg, } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { injectIntl } from 'react-intl';
import IntlMessages from "Util/IntlMessages";
import * as jsx from "Assets/JSX-Style/InlineStyle";


class BankCardControl extends Component {
    render() {
        return <BankCard />
    }
}

export default BankCardControl

class BankCard extends Component {
    render() {
        const titleStyle = {
            ...jsx.titleStyle,
            color: "#313231"
        }
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    maxWidth: 80,
                    maxHeight: 80,
                    marginRight: '1.5rem'
                }}>
                    <CardImg
                        src="/assets/img/logo-bank.png"
                        style={{
                            ...jsx.BankImageStyle,
                            objectFit: 'contain'
                        }} />
                </div>
                <div style={{
                    flexShrink: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <b style={titleStyle}><span>ธนาคารกสิกรไทย</span></b>
                    <b style={titleStyle}><span>บจก. อีซี่ แก๊ส (ประเทศไทย)</span></b>
                    <b style={titleStyle}><span>เลขที่บัญชี 044-3-44441-6</span></b>
                </div>
            </div>
        );
    }
}


