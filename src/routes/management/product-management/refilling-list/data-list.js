import React, { Component, Fragment } from 'react';
import {
    Card,
    CardBody,
    Collapse
} from "reactstrap";
import Text from "Components/Text";
import Media from 'react-media';
import _ from 'lodash';

//Components
import CollapseList from './collapse-list';
import RefillList from './refill-list';

//Constants
import * as screen from 'Constants/screenWidth';

class DataList extends Component {
    render() {
        const props = this.props;
        const completeRefillStock = _.get(props, 'completeRefillStock');
        const currentSelected = _.get(props, 'currentSelected', -1);
        const position = _.get(props, 'position', -1);
        const methods = _.get(props, 'methods', []);
        const fillingList = _.get(props, 'fillingList', []);
        const filling = _.get(fillingList, 'filling', []);
        const isOpen = (currentSelected == position && position >= 0);
        return (
            <div className="mb-3">
                <Card
                    onClick={
                        () => (methods.toggleCollapse(position))
                    } >
                    <CardBody className="p-3" >
                        <Text
                            type="title"
                            text={`รายการส่งเติมที่ ${position + 1}`}
                            size="1.5em"
                            color="#0C0CA9" />
                    </CardBody>
                </Card>
                <Fragment>
                    <Media query={screen.nonMobileScreenQuery}>
                        <Card>
                            <Collapse isOpen={isOpen}>
                                <div className="p-3">
                                    {
                                        _.isEmpty(filling) ?
                                            <Text
                                                type="normal"
                                                text="ไม่มีข้อมูล" />
                                            :
                                            filling.map(
                                                item => {
                                                    return (
                                                        <CollapseList
                                                            key={item.id}
                                                            item={item} />
                                                    );
                                                }
                                            )
                                    }
                                </div>
                            </Collapse>
                        </Card>
                    </Media>
                    <Media query={screen.mobileScreenQuery}>
                        <Collapse isOpen={isOpen}>
                            <RefillList
                                completeRefillStock={completeRefillStock}
                                fillingList={fillingList}
                                selecting={currentSelected} />
                        </Collapse>
                    </Media>
                </Fragment>
            </div>
        );
    }
}

export default DataList;