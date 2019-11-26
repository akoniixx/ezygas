import React, { Component } from "react";
import { injectIntl } from 'react-intl';
import {
  Card,
  CardBody,
} from "reactstrap";
import { Separator } from "Components/CustomBootstrap";
import _ from 'lodash';
import Button from 'Components/Button';

//Child Components
import UserDetail from './userDetail';
import VendorDetail from './vendorDetail';

//Modal
import ModalControl from './modal'

import { connect } from "react-redux";
import { getVendor, getUser } from "Redux/actions";
import { apiVendor } from "Constants/defaultValues";
import { getCookie } from 'Util/Utils';
import { ModalNonCompleted } from "Routes/orders/modals"
class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.editDataSubmit = this.editDataSubmit.bind(this);
    this.vendorData = this.vendorData.bind(this);
    this.userData = this.userData.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.resetData = this.resetData.bind(this);
    this.initialData = this.initialData.bind(this);
    this.toggleChangePassword = this.toggleChangePassword.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.toggleModalnonCompletedOpen = this.toggleModalnonCompletedOpen.bind(this);
    this.phonenumber = this.phonenumber.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.state = {
      modalBack: false,
      modalSuccess: false,
      modalNonCompleted: false,
      dataUser: [],
      dataVendor: [],
      address: "",
      phoneNumberForm: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataVendor: _.get(nextProps.vendor, "list[0]", [])
    },
      () => this.initialData()
    )
  }

  componentDidMount() {
    this.userData();
    this.vendorData();
  }

  vendorData() {
    this.props.getVendor();
  }

  userData() {
    this.props.getUser();
  }

  editDataSubmit() {
    var data = {}
    var newApi = apiVendor
    data = this.state.dataVendor
    newApi += data.id + "/"
    data.tel = "+66" + data.tel.substring(1)
    var csrftoken = getCookie('csrftoken');
    var JsonData = JSON.stringify(data);
    fetch(newApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JsonData
    }).then(() => {
      this.toggleSuccess();
      this.userData();
      this.vendorData();
    })
  }

  initialData() {
    const { dataVendor } = this.state
    var state = {}
    var address = ""
    if (dataVendor.province === "กรุงเทพมหานคร") {
      address = "เขต" + dataVendor.district + " " + "แขวง" + dataVendor.subdistrict + " " + dataVendor.province
    } else {
      address = "อำเภอ" + dataVendor.district + " " + "ตำบล" + dataVendor.subdistrict + " " + dataVendor.province
    }
    if (_.get(dataVendor, "tel") && dataVendor.tel.substring(0, 3) == "+66") {
      state["tel"] = dataVendor.tel = "0" + dataVendor.tel.substring(3)
      this.setState(state)
    }
    this.setState({
      address: address,
    })
  }

  onChangeData(e, statusData, index) {
    const { dataVendor } = this.state
    var state = {}
    if (statusData === "vendor") {
      state[index] = dataVendor[index] = e.target.value
    } else {
      state[index] = dataUser[index] = e.target.value
    }
    if (index === "tel") {
      let lastchar = state[index].substring(state[index].length - 1)
      let tel = state[index]
      if (isNaN(lastchar)) {
        tel = state[index].substring(0, state[index].length - 1)
        state[index] = dataVendor[index] = tel
      }
      this.phonenumber(state[index])
    }
    this.setState(state);
  }

  resetData() {
    this.userData();
    this.vendorData();
    this.setState({phoneNumberForm: true})
  }

  toggleConfirm() {
    const { dataVendor, phoneNumberForm } = this.state
    if (dataVendor.name_en != "" && dataVendor.service_charge != "" && dataVendor.tel != "" && phoneNumberForm === true) {
      this.editDataSubmit();
    } else {
      this.toggleModalnonCompletedOpen();
    }
  }

  toggleChangePassword() {
    this.setState({
      modalBack: !this.state.modalBack
    });
  }

  toggleModalnonCompletedOpen() {
    this.setState({
      modalNonCompleted: !this.state.modalNonCompleted
    })
  }

  toggleSuccess() {
    this.setState({
      modalSuccess: !this.state.modalSuccess
    });
  }

  phonenumber(inputtxt) {
    let phoneno = /^\+$/;
    if (inputtxt.length === 10) {
      phoneno = /^\+?([0]{1})([6,8,9]{1})([0-9]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    } else if (inputtxt.length === 9) {
      phoneno = /^\+?([0]{1})([2-5,7]{1})([0-9]{0,1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
    }
    if (inputtxt.match(phoneno) && inputtxt != "") {
      this.setState({
        phoneNumberForm: true
      })
    }
    else {
      this.setState({
        phoneNumberForm: false
      })
    }
  }

  render() {
    let { vendor, user } = this.props
    const avatarName = (function (v) {
      if (v == undefined || v.length == 0) return "E";
      return v[0].name_en;
    })(vendor.list);
    return (
      <div className="store-management">
        <ModalControl
          state={this.state}
          toggleSuccess={this.toggleSuccess}
          toggleConfirm={this.toggleConfirm}
          editDataSubmit={this.editDataSubmit}
          toggleChangePassword={this.toggleChangePassword} />
        <ModalNonCompleted
          state={this.state}
          toggleModalnonCompletedOpen={this.toggleModalnonCompletedOpen} />
        <Card>
          <CardBody>
            {/* User Details */}
            <UserDetail
              dataUser={user}
              avatarName={avatarName} />

            <Separator className="mb-5" />

            {/* Vendor Details */}
            <VendorDetail
              checkPhonenumberForm={this.state.phoneNumberForm}
              dataVendor={vendor}
              address={this.state.address}
              onChangeData={this.onChangeData} />

            <Separator className="mb-5" />

            {/* Buttons */}
            <div className="form-row button-row">
              <Button
                type="cancel"
                text="ยกเลิก"
                onClick={this.resetData} />
              <Button
                type="primary"
                text="บันทึก"
                onClick={this.toggleConfirm} />
            </div>
          </CardBody>
        </Card>
      </div>

    );
  }
}
const mapStateToProps = ({ vendor, user }) => {
  return {
    vendor,
    user,
  };
};
export default injectIntl(connect(
  mapStateToProps,
  {
    getVendor,
    getUser,
  }
)(UserManagement));
