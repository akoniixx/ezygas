import React, { Component, Fragment } from 'react';
import Media from 'react-media';
import _ from 'lodash';
import Text from 'Components/Text';

//Components
import DataList from './data-list';
import RefillList from './refill-list';

//Constants
import * as screen from 'Constants/screenWidth';

class RefillGasList extends Component {

    constructor(props) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.state = {
            currentSelected: -1
        };
    }

    componentWillReceiveProps() {
        if (this.props.activeFirstTab != 3) {
            this.setState({
                currentSelected: -1
            })
        }
    }

    toggleCollapse(position) {
        let s = position
        if (position == this.state.currentSelected) {
            s = -1
        }
        this.setState({
            currentSelected: s
        });
    }
    render() {
        const props = this.props;
        const refillList = _.get(props, 'fillList', []);
        const list = _.get(refillList, 'list', []);
        const completeRefillStock = _.get(props, 'completeRefillStock')
        const methods = {
            toggleCollapse: this.toggleCollapse
        };
        if (!refillList.loading || _.isEmpty(list)) {
            return (
                <div className="refilling-list-management">
                    <Text
                        type="title"
                        text="ไม่มีข้อมูลรายการส่งเติม"
                        align="start" />
                </div>
            );
        }
        const listComponent = (list) => {
            return list.map(
                (l, i) => {
                    if (l.status === 1) {
                        return (
                            <DataList
                                key={i}
                                position={i}
                                fillingList={l}
                                currentSelected={this.state.currentSelected}
                                completeRefillStock={completeRefillStock}
                                methods={methods} />
                        );
                    }
                }
            );
        };
        return (
            <div className="refilling-list-management">
                <Fragment>
                    <div className="refill-list-group">
                        {listComponent(list)}
                    </div>
                    <Media query={screen.nonMobileScreenQuery}>
                        <RefillList
                            fillingList={list[this.state.currentSelected]}
                            selecting={this.state.currentSelected}
                            completeRefillStock={completeRefillStock}
                            methods={methods} />
                    </Media>
                </Fragment>
            </div>
        );
    }

}

export default RefillGasList;