import React, { Component, Fragment } from "react";
import Avatar from 'react-avatar';
import Text from 'Components/Text';
import { Input } from 'Components/Input';
import _ from 'lodash';

class UserControl extends Component {
    render() {
        const dataUser = _.get(this.props, "dataUser")
        const avatarName = _.get(this.props, "avatarName")
        return (
            <Fragment>
                <ImageStore dataUser={dataUser} avatarName={avatarName} />
                <UserDetail dataUser={dataUser} />
            </Fragment>
        )
    }
}

export default UserControl

class ImageStore extends Component {
    render() {
        const dataUser = _.get(this.props, "dataUser")
        const avatarName = _.get(this.props, "avatarName")
        return (
            <div className="form-row image">
                {dataUser.loading === true ?
                    <Avatar name={avatarName} size="100px" round={true} />
                    :
                    ""
                }
            </div>
        )
    }
}

class UserDetail extends Component {
    render() {
        const dataUser = _.get(this.props, "dataUser.list")
        return (
            <Fragment>
                <Text
                    type="header"
                    text="ข้อมูลเจ้าของร้าน"
                    align="start"
                    size="1.5em" />
                <div className="form-row">
                    <div className="form-item">
                        <Text
                            type="normal"
                            text="ชื่อ:" />
                        <Input
                            value={_.get(dataUser, "first_name", "")}
                            disabled={true} />
                    </div>
                    <div className="form-item">
                        <Text
                            type="normal"
                            text="นามสกุล:" />
                        <Input
                            value={_.get(dataUser, "last_name", "")}
                            disabled={true} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item">
                        <Text
                            type="normal"
                            text="อีเมล:" />
                        <Input
                            value={_.get(dataUser, "username", "")}
                            disabled={true} />
                    </div>
                    {/* This feature is not open yet. */}
                    {/* <div className="form-item">
                        <Text
                            type="normal"
                            text="รหัสผ่าน:" />
                        <Input
                            value={_.get(dataUser, "username", "")}
                            disabled={true} />
                    </div> */}
                </div>
            </Fragment>
        )
    }
}