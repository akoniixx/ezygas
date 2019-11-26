import React, { Component, Fragment } from 'react';

import { Row } from 'reactstrap';
import { Colxx } from 'Components/CustomBootstrap';

import Text from 'Components/Text';
import conditionText from 'Constants/condition';

class Condition extends Component {
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
        const title = conditionText.title;
        const content = conditionText.content;
        const footer = conditionText.footer;
        return (
            <Row >
                <div className="d-flex flex-column w-100" style={{ paddingTop: 80 }}>
                    <Row>
                        <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                            <Text
                                type="header"
                                text={title}
                                size={window.innerWidth < 380 ? '1.2rem' : '1.5rem'} />
                        </Colxx>
                    </Row>
                    <Row className="d-flex flex-row justify-content-center">
                        <Colxx xxs="9" className="d-flex flex-column justify-content-center" style={textStyle}>
                            {content.map(
                                (c, i) => (
                                    <div className="mb-4" key={i}>
                                        <div className="mb-2">
                                            <Text
                                                type="title"
                                                text={c.header}
                                                align="start"
                                                size="1.2rem" />
                                        </div>
                                        {c.content.map(
                                            (item, i) => (
                                                <div className="d-flex mb-1" key={i}>
                                                    <div className="mr-2">
                                                        <span>•</span>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <Text
                                                            type="normal"
                                                            align="start"
                                                            text={item} />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )
                            )}
                            <Text
                                type="title"
                                text={footer}
                                align="start"
                                size="1rem" />
                        </Colxx>
                    </Row>

                </div>
            </Row>



        )
    }
}
export default Condition