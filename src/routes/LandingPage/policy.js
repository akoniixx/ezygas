import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'Components/CustomBootstrap';
import _ from 'lodash';
import Text from 'Components/Text';
import PolicyText from 'Constants/policy';

class Policy extends Component {
    render() {
        return (
            <Fragment>
                <div style={{ marginTop: 100 }}>
                    <Desktop />

                </div>
            </Fragment>

        )


    }
}
class Desktop extends Component {
    render() {
        const textStyle = {
            textAlign: "left"
        }
        const { title, content, orderList } = PolicyText;
        const normalText = (text) => (
            <Text
                type="normal"
                align="start"
                text={text} />
        )
        return (
            <Row>
                <div className="d-flex flex-column w-100" style={{ paddingTop: 80 }}>
                    <Row>
                        <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                            <Text
                                type="header"
                                text={title}
                                align="start"
                                size={window.innerWidth < 380 ? '1.2rem' : '1.5rem'} />
                        </Colxx>
                    </Row>
                    <Row className="d-flex flex-row justify-content-center">
                        <Colxx xxs="9" className="d-flex flex-column justify-content-center" style={textStyle}>
                            <div className="policy-content mb-4">
                                {normalText(content)}
                            </div>
                            {
                                orderList.map(
                                    (list, i) => (
                                        <div className="policy-order-list d-flex mb-4" key={i}>
                                            <div className="policy-order-list-title mr-2">
                                                <Text
                                                    type="title"
                                                    align="start"
                                                    size="1.2rem"
                                                    text={`${i + 1}.`} />
                                            </div>
                                            <div className="d-flex flex-column flex-grow-1">
                                                <div className="policy-order-list-header mb-2">
                                                    <Text
                                                        type="title"
                                                        align="start"
                                                        size="1.2rem"
                                                        text={list.header} />
                                                </div>
                                                <div className="policy-subcontent">
                                                    {!_.isEmpty(list.content) ? normalText(list.content) : ''}
                                                    {
                                                        !_.isEmpty(list.orderList) ?
                                                            list.orderList.map(
                                                                (ol, j) => (
                                                                    <div className="d-flex mb-1" key={j}>
                                                                        <div className="mr-2">
                                                                            {normalText(`${i + 1}.${j + 1}`)}
                                                                        </div>
                                                                        <div className="policy-sub-order-list flex-grow-1">
                                                                            {normalText(ol)}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )
                                                            : ''
                                                    }
                                                    {
                                                        !_.isEmpty(list.bulletedList) ?
                                                            list.bulletedList.map(
                                                                (bl, k) => (
                                                                    <div className="d-flex mb-1" key={k}>
                                                                        <div className="mr-2">
                                                                            {normalText('•')}
                                                                        </div>
                                                                        <div className="policy-sub-order-list flex-grow-1">
                                                                            {normalText(bl)}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )
                                                            : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </Colxx>
                    </Row>

                </div>
            </Row>



        )
    }
}
export default Policy