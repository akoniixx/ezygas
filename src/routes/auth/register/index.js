import React, { Component, Fragment } from "react";
import {
    Row, CardTitle, Form, Label, Button, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledButtonDropdown,
    Modal, ModalHeader, ModalBody, Container, ModalFooter
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "Components/CustomBootstrap";
import { PasswordInput } from 'Components/Input';
import { connect } from "react-redux";
import { registerUser } from "Redux/actions";
import axios from 'axios';
import {
    AvForm,
    AvGroup,
    AvInput,
    AvFeedback
} from "availity-reactstrap-validation";
import Media from 'react-media';
import Text from 'Components/Text';
import EzygasBtn from 'Components/Button';
import { getCookie } from '../../../util/Utils';
import { desktopScreenQuery, tabletScreenQuery, mobileScreenQuery } from 'Constants/screenWidth';
import { register as rstr, location as lstr, general as gstr } from '../../../lang/locales/th_TH';
import _ from 'lodash';
const apiProvince = "/api/province/"
const apiDistrict = "/api/district/"
const apiSubDistrict = "/api/subdistrict/"
const apiVendor = "/api/vendor/"
const apiRegister = "/register/"
const apiCheckMail = "/user-exists/"

const USERNAME_AVAILABLE = "This username is available";
const USERNAME_ALREADY_TAKEN = "This username is already taken";

const str = { ...rstr, ...lstr, ...gstr };

const radius = {
    borderRadius: 25.5
}

const DropdownStyle = {
    padding: 10,
    borderColor: "#d2d2d2",
    color: "#4a4a4a",
    backgroundColor: "#ffffff",
    width: "20vh"
}

const DropdownModifiers = {
    setMaxHeight: {
        enabled: true,
        order: 890,
        fn: (data) => {
            return {
                ...data,
                styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: 100,
                },
            };
        },
    },
}

const validateStyle = {
    fontSize: "10px",
    color: "#dc3545",
    margin: "4px 0px"
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.apiValidateEmail = this.apiValidateEmail.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
        this.toggleHiddenPassword = this.toggleHiddenPassword.bind(this);
        this.toggleHiddenConfirmPassword = this.toggleHiddenConfirmPassword.bind(this);
        this.getProvinces = this.getProvinces.bind(this);
        this.onUserRegister = this.onUserRegister.bind(this);
        this.onChangeProvince = this.onChangeProvince.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);
        this.onChangeSubDistrict = this.onChangeSubDistrict.bind(this);
        this.onChangeZipCode = this.onChangeZipCode.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.validateData = this.validateData.bind(this);
        this.phonenumber = this.phonenumber.bind(this);
        this.toggleConfirmationModal = this.toggleConfirmationModal.bind(this);
        this.toggleNonCompleteModal = this.toggleNonCompleteModal.bind(this);
        this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
        this.addressData = this.addressData.bind(this);
        this.validateSupporter = this.validateSupporter.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.state = {
            hiddenPassword: true,
            hiddenConfirmPassword: true,
            isConfirmationModalOpen: false,
            isNonCompleteModalOpen: false,
            isModalSuccessOpen: false,
            email: "",
            messageMail: "", //ckeck mail by api
            password: "",
            conPassword: "",
            validatePassword: false,
            name: "",
            tel: "",
            provinces: [],
            provinceSelected: "",
            provinceID: "",
            districts: [],
            districtSelected: "",
            districtID: "",
            subDistricts: [],
            subDistrictSelected: "",
            subDistrictID: "",
            zipCode: "",
            phoneNumberForm: false,
            regisSuccces: false,
            address: "",
            supporter: "",
            checkSupporter: false,
        };
    }

    componentDidMount() {
        document.body.classList.add("background");
        this.getProvinces();
    }

    componentWillUnmount() {
        document.body.classList.remove("background");
    }

    addressData() {
        var address = ""
        if (this.state.provinceSelected === "กรุงเทพมหานคร") {
            address = "เขต" + this.state.districtSelected + " " + "แขวง" + this.state.subDistrictSelected + " " + this.state.provinceSelected
        } else {
            address = "อำเภอ" + this.state.districtSelected + " " + "ตำบล" + this.state.subDistrictSelected + " " + this.state.provinceSelected
        }
        this.setState({
            address: address,
        })
    }

    checkConfirm() {
        let { email, name, password, supporter, tel, checkSupporter } = this.state
        let { messageMail, validatePassword, phoneNumberForm, provinceSelected, districtSelected, subDistrictSelected } = this.state
        if (email === supporter && email!= "" ) {
            this.setState({ checkSupporter: true })
            checkSupporter = true
        }
        supporter = supporter || "support@ezygroup.co"
        if (email !== "" && messageMail === "This username is available"  // email data and validate
            && supporter != "" && checkSupporter === true// supporter data and validate 
            && password !== "" && validatePassword === true // password data and validate
            && name != "" // name data
            && tel != "" && phoneNumberForm === true // tel data and validate
            && provinceSelected != "" && districtSelected != "" && subDistrictSelected != "" // address data 
        ) {
            this.toggleConfirmationModal()
        } else {
            this.toggleNonCompleteModal()
        }
    }

    getProvinces() {
        axios.get(`${apiProvince}`)
            .then(res => {
                const provinces = res.data.data;
                this.setState({ provinces: provinces });
            })
    }

    handleChangeData(e, index) {
        var state = {};
        state[index] = e.target.value;
        this.setState(state)
        if (index === "tel") {
            this.phonenumber(state[index])
        } else if (index === "email") {
            this.validateEmail(state[index])
        } else if (index === "supporter") {
            this.validateSupporter(state[index])
        }
    }

    onChangeSubDistrict(e, subDistricts) {
        this.setState({
            subDistrictSelected: subDistricts.name_th,
            subDistrictID: subDistricts.id,
            zipCode: subDistricts.zipcode
        })
    }

    onChangeDistrict(e, district) {
        axios.get(`${apiSubDistrict + district.id + "/"}`)
            .then(res => {
                const subDistricts = res.data.data;
                this.setState({ subDistricts: subDistricts, districtSelected: district.name_th, districtID: district.id, subDistrictSelected: "", zipCode: "" });
            })
    }

    onChangeProvince(e, province) {
        axios.get(`${apiDistrict + province.id + "/"}`)
            .then(res => {
                const districts = res.data.data;
                this.setState({ districts: districts, provinceSelected: province.name_th, provinceID: province.id, districtSelected: "", subDistrictSelected: "", zipCode: "" });
            })
    }

    onChangeZipCode(e, zipCode) {
        this.setState({

        })
    }

    onUserRegister() {
        let { email, name, password, provinceID, districtID, supporter, subDistrictID, tel, zipCode } = this.state
        var data = {}
        var api = apiRegister;
        var csrftoken = getCookie('csrftoken');
        var editedTel = "+66" + tel.substring(1)
        var name_lastname = name.split(" ")
        data = {
            email: email,
            password: password,
            first_name: name_lastname[0],
            last_name: _.get(name_lastname, "[1]", ""),
            tel: editedTel,
            province: provinceID,
            district: districtID,
            subdistrict: subDistrictID,
            zipcode: zipCode,
            service_charge: 20,
            lat: "0.000",
            long: "0.000",
            supporter: supporter
        }
        var JsonData = JSON.stringify(data);
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JsonData
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.toggleConfirmationModal()
                this.addressData()
                this.toggleSuccessModal()
                this.setState({
                    regisSuccces: true
                })
            })
            .catch((error) => {
                console.error("registration error", error);
                //open error modal
            });
    }

    phonenumber(inputtxt) {
        let phoneno = /^\+$/;
        if (inputtxt.length === 10) {
            phoneno = /^\+?([0]{1})([6,8,9]{1})([0-9]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        } else if (inputtxt.length === 9) {
            phoneno = /^\+?([0]{1})([2-5,7]{1})([0-9]{0,1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
        }
        if (inputtxt.match(phoneno)) {
            this.setState({
                phoneNumberForm: true
            })
            return true;
        }
        else {
            this.setState({
                phoneNumberForm: false
            })
            return false;
        }
    }

    toggleConfirmationModal() {
        this.setState({
            isConfirmationModalOpen: !this.state.isConfirmationModalOpen
        })
    }

    toggleHiddenPassword() {
        this.setState({ hiddenPassword: !this.state.hiddenPassword });
    }

    toggleHiddenConfirmPassword() {
        this.setState({ hiddenConfirmPassword: !this.state.hiddenConfirmPassword });
    }

    toggleNonCompleteModal() {
        this.setState({
            isNonCompleteModalOpen: !this.state.isNonCompleteModalOpen
        })
    }

    toggleSuccessModal(status) {
        this.setState({
            isModalSuccessOpen: !this.state.isModalSuccessOpen,
        })
        if (status === true) {
            this.setState({
                validatePassword: false
            })
            this.props.history.push("/pending");
        }
    }

    validateData(e, index) {
        var state = {};
        state[index] = e.target.value;
        this.setState(state)
        if (index === "password") {
            if (e.target.value === this.state.conPassword) {
                this.setState({
                    validatePassword: true
                })
            } else {
                this.setState({
                    validatePassword: false
                })
            }
        } else if (index === "conPassword") {
            if (e.target.value === this.state.password) {
                this.setState({
                    validatePassword: true
                })
            } else {
                this.setState({
                    validatePassword: false
                })
            }
        }
    }

    apiValidateEmail(data, index) {
        var csrftoken = getCookie('csrftoken');
        var email = {
            email: data
        }
        var JsonData = JSON.stringify(email);
        fetch(apiCheckMail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JsonData
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (index === "messageMail") {
                    this.setState({ messageMail: responseJson.data })
                } else if (index === "checkSupporter") {
                    let fact = responseJson.data === USERNAME_ALREADY_TAKEN ? true : false
                    this.setState({ checkSupporter: fact })
                }
            })
            .catch((error) => {
                console.error("Email validation error", error);
            });
    }

    validateSupporter(data) {
        var regularMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,})+(\.[a-zA-Z0-9-]{2,})?$/;
        if (data.match(regularMail)) {
            this.apiValidateEmail(data, "checkSupporter")
        } else {
            this.setState({
                checkSupporter: false
            })
        }
    }

    validateEmail(data) {
        var regularMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,})+(\.[a-zA-Z0-9-]{2,})?$/;
        if (data.match(regularMail)) {
            this.apiValidateEmail(data, "messageMail")
        } else {
            this.setState({
                messageMail: "false_matching"
            })
        }
    }

    render() {
        const modalStyle = {
            display: "flex",
            transform: "translate(0%, 23vh)",
            borderRadius: "25.5px",
            padding: 10,
            margin: '0 auto',
            backgroundColor: 'white',
            minWidth: 300,
            maxWidth: 370,
            minHeight: "auto"
        }
        const headerModalNonLine = {
            border: "none",
            margin: "0 auto"
        }
        const modalStyleSuccess = {
            display: "flex",
            transform: "translate(0%, 14vh)",
            borderRadius: "25.5px",
            padding: 10,
            margin: '0 auto',
            backgroundColor: 'white',
            minHeight: "auto"
        }
        const ModalSuccess = (
            <Modal
                style={modalStyleSuccess}
                isOpen={this.state.isModalSuccessOpen}
                toggle={this.toggleSuccessModal}
                aria-labelledby="example-modal-sizes-title-sm"
                backdrop={true}>
                <ModalHeader style={headerModalNonLine}>
                    <div className="mb-2">
                        <Text
                            type="title"
                            text={str.registerSuccess}
                            size="1.5rem" />
                    </div>
                    <div className="text-left">
                        <div className="d-flex mb-1">
                            <div style={{
                                flexGrow: 1
                            }}>
                                <Text
                                    type="normal"
                                    text={`${str.namePrefix}: `}
                                    size="1.1rem"
                                    color="#0C0CA9" />
                            </div>
                            <div style={{
                                marginLeft: 5,
                                width: '75%'
                            }}>
                                <Text
                                    type="normal"
                                    text={this.state.name}
                                    size="1.1rem"
                                    align="start" />
                            </div>
                        </div>
                        <div className="d-flex mb-1">
                            <div style={{
                                flexGrow: 1
                            }}>
                                <Text
                                    type="normal"
                                    text={`${str.email}: `}
                                    size="1.1rem"
                                    color="#0C0CA9" />
                            </div>
                            <div style={{
                                marginLeft: 5,
                                width: '75%'
                            }}>
                                <Text
                                    type="normal"
                                    text={this.state.email}
                                    size="1.1rem"
                                    align="start" />
                            </div>
                        </div>
                        <div className="d-flex mb-1">
                            <div style={{
                                flexGrow: 1
                            }}>
                                <Text
                                    type="normal"
                                    text={`${str.tel}: `}
                                    size="1.1rem"
                                    color="#0C0CA9" />
                            </div>
                            <div style={{
                                marginLeft: 5,
                                width: '75%'
                            }}>
                                <Text
                                    type="normal"
                                    text={this.state.tel}
                                    size="1.1rem"
                                    align="start" />
                            </div>
                        </div>
                        <div className="d-flex mb-1">
                            <div style={{
                                flexGrow: 1
                            }}>
                                <Text
                                    type="normal"
                                    text={`${str.address}: `}
                                    size="1.1rem"
                                    color="#0C0CA9" />
                            </div>
                            <div style={{
                                marginLeft: 5,
                                width: '75%'
                            }}>
                                <Text
                                    type="normal"
                                    text={this.state.address}
                                    size="1.1rem"
                                    align="start" />
                            </div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody className="d-flex justify-content-center">
                    <EzygasBtn
                        type="primary"
                        onClick={() => this.toggleSuccessModal(this.state.regisSuccces)} />
                </ModalBody>
            </Modal>
        )
        const ModalNonComplete = (
            <Modal
                style={modalStyle}
                isOpen={this.state.isNonCompleteModalOpen}
                toggle={this.toggleNonCompleteModal}
                aria-labelledby="example-modal-sizes-title-sm"
                backdrop={true}>
                <ModalHeader style={headerModalNonLine}>
                    {console.log("test", this.state.checkSupporter)}
                    <Text
                        type="title"
                        text={str.registerNotComplete}
                        size="1em" />
                </ModalHeader>
                {this.state.checkSupporter === false ?
                    <ModalBody className="d-flex flex-row justify-content-center" >
                        <Text
                            type="title"
                            color={"red"}
                            text={"ท่านยังไม่มีผู้แนะนำระบบ กรุณาติดต่อเบอร์ 091-8677355 เพื่อความสะดวกในการดูแลหลังการขาย"}
                            size="1em" />
                    </ModalBody>
                    :
                    ""
                }
                <ModalFooter className="d-flex flex-row justify-content-center" style={headerModalNonLine}>
                    <EzygasBtn
                        type="primary"
                        onClick={this.toggleNonCompleteModal} />
                </ModalFooter>
            </Modal>
        )
        const ConfirmationModal = (
            <Modal
                style={modalStyle}
                isOpen={this.state.isConfirmationModalOpen}
                toggle={this.toggleConfirmationModal}
                aria-labelledby="example-modal-sizes-title-sm"
                backdrop={true}>
                <ModalHeader style={headerModalNonLine}>
                    <Text
                        type="title"
                        text={str.registerConfirmation}
                        size="1em" />
                </ModalHeader>
                <ModalBody className="d-flex justify-content-between">
                    <div style={{ width: '40%' }}>
                        <EzygasBtn
                            type="cancel"
                            onClick={this.toggleConfirmationModal} />
                    </div>
                    <div style={{ width: '40%' }}>
                        <EzygasBtn
                            type="primary"
                            onClick={this.onUserRegister} />
                    </div>
                </ModalBody>
            </Modal>
        )
        const method = {
            onEmailChange: this.handleChangeData,
            validateData: this.validateData,
            toggleHiddenPassword: this.toggleHiddenPassword,
            handleChangeData: this.handleChangeData,
            toggleHiddenConfirmPassword: this.toggleHiddenConfirmPassword,
            onChangeProvince: this.onChangeProvince,
            onChangeDistrict: this.onChangeDistrict,
            onChangeSubDistrict: this.onChangeSubDistrict,
            checkConfirm: this.checkConfirm
        }
        return (
            <Fragment>
                <div className="fixed-background2" />
                <main>
                    <Media query={mobileScreenQuery}>
                        <MobileLayout
                            state={this.state}
                            method={method}
                        />
                    </Media>
                    <Media query={tabletScreenQuery}>
                        <TabletLayout
                            state={this.state}
                            method={method}
                        />
                    </Media>
                    <Media query={desktopScreenQuery}>
                        <DesktopLayout
                            state={this.state}
                            method={method}
                        />
                    </Media>
                </main>
                {ModalSuccess}
                {ModalNonComplete}
                {ConfirmationModal}
            </Fragment>
        );
    }

}

class DesktopLayout extends Component {
    render() {
        const props = _.get(this.props, "state")
        const method = _.get(this.props, "method")
        return (
            <Container className="container">
                <Row className="h-100">
                    <Colxx xxs="12" md="6" className="mx-auto my-auto">
                        <div className="form-side">
                            <div className="text-center">
                                <NavLink to={`/`} className="white">
                                    <span className="logo-single2" />
                                </NavLink>
                            </div>
                            <div className="text-center">
                                <h1>{str.subtitle1}</h1>{" "}<h1 className="font-weight-semibold">{str.subtitle2}</h1>
                            </div>
                            <Row style={{ margin: "20px 0px" }}></Row>
                            <CardTitle className="mb-4">
                                {str.register}
                            </CardTitle>
                            <Form>
                                <AvForm className="mb-5 row">
                                    <Colxx sm={6}>
                                        <AvGroup>
                                            <Label className="av-label" for="avexampleEmail">
                                                {str.email}
                                            </Label>
                                            <AvInput name="email" id="avexampleEmail" type="text" style={radius} required
                                                onChange={(e) => method.onEmailChange(e, "email")}
                                            />
                                            <AvFeedback>
                                                {str.noEmailMessage}
                                            </AvFeedback>
                                            <div style={validateStyle}>
                                                {props.messageMail === "false_matching" && props.email != "" ?
                                                    str.emailNotValid
                                                    :
                                                    props.messageMail === USERNAME_AVAILABLE && props.email != "" ?
                                                        <div style={{ color: "#32CD32" }}>
                                                            {str.emailOk}
                                                        </div>
                                                        :
                                                        props.messageMail === USERNAME_ALREADY_TAKEN && props.email != "" ?
                                                            str.emailExists
                                                            :
                                                            ""
                                                }
                                            </div>
                                        </AvGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                        <AvGroup>
                                            <Label className="av-label" for="avexampleConEmail">
                                                {"อีเมลผู้แนะนำระบบ "}
                                            </Label>
                                            <AvInput name="ConEmail" id="avexampleConEmail" type="text" style={radius} required
                                                onChange={(e) => method.handleChangeData(e, "supporter")}
                                            />
                                            <AvFeedback>
                                                {"กรุณากรอกข้อมูล"}
                                            </AvFeedback>
                                            <div style={validateStyle}>
                                                {props.checkSupporter === true && props.supporter != "" ?
                                                    <div style={{ color: "#32CD32" }}>
                                                        {"อีเมลผู้แนะนำระบบถูกต้อง"}
                                                    </div>
                                                    :
                                                    props.checkSupporter === false && props.supporter != "" ?
                                                        "อีเมลผู้แนะนำระบบไม่ถูกต้อง"
                                                        :
                                                        ""
                                                }
                                            </div>
                                        </AvGroup>
                                    </Colxx>
                                    <Colxx sm={6} className="mb-2">
                                        {/* Use Ezygas CI Component instead. */}
                                        <PasswordInput
                                            label={str.password}
                                            value={props.password}
                                            onChange={(value) => method.validateData({ target: { value: value } }, "password")}
                                            isCorrect={!_.isEmpty(props.password)}
                                            message={str.passwordErrorMessage}
                                            labelSize="0.8rem" />
                                    </Colxx>
                                    <Colxx sm={6}>
                                        <PasswordInput
                                            label={str.confirmPassword}
                                            value={props.conPassword}
                                            onChange={(value) => method.validateData({ target: { value: value } }, "conPassword")}
                                            isCorrect={props.validatePassword}
                                            message={str.confirmPasswordErrorMessage}
                                            labelSize="0.8rem" />
                                    </Colxx>
                                    <Colxx sm={6}>
                                        <AvGroup>
                                            <Label className="av-abel" for="avexampleName">
                                                {str.nameSurname}
                                            </Label>
                                            <AvInput className="form-conrol" name="name" id="avexampleName" style={radius} required
                                                onChange={(e) => method.handleChangeData(e, "name")}
                                            />
                                            <AvFeedback>
                                                {str.nameErrorMessage}
                                            </AvFeedback>
                                        </AvGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                        <AvGroup>
                                            <Label className="av-label" for="avexampleTel">
                                                {str.telephoneNumber}
                                            </Label>

                                            <AvInput name="tel" id="avexampleTel" style={radius} required
                                                onChange={(e) => method.handleChangeData(e, "tel")}
                                            />
                                            <AvFeedback>
                                                {str.telMessage}
                                            </AvFeedback>
                                            <div style={validateStyle}>
                                                {props.phoneNumberForm === false && props.tel != "" ?
                                                    str.telErrorMessage
                                                    :
                                                    ""
                                                }
                                            </div>
                                        </AvGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                        < Label className="av-label" for="avexampleLastName">
                                            {str.province}
                                        </Label>
                                        <AvGroup>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle caret size="lg" disabled={false} style={DropdownStyle} outline >
                                                    {props.provinceSelected === "" ?
                                                        <a>{str.province}</a>
                                                        :
                                                        <a>{props.provinceSelected}</a>
                                                    }
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    modifiers={DropdownModifiers}
                                                >
                                                    {props.provinces.map(product => {
                                                        return (
                                                            <DropdownItem onClick={(e) => method.onChangeProvince(e, product)}>{product.name_th}</DropdownItem>
                                                        )
                                                    }
                                                    )}
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </AvGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                        < Label className="av-label" for="avexampleLastName">
                                            {str.district}
                                        </Label>
                                        <AvGroup>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle caret size="lg"
                                                    disabled={props.provinceSelected === "" ?
                                                        true
                                                        :
                                                        false
                                                    }
                                                    style={DropdownStyle} outline >
                                                    {props.districtSelected === "" ?
                                                        <a>{str.district}</a>
                                                        :
                                                        <a>{props.districtSelected}</a>
                                                    }
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    modifiers={DropdownModifiers}
                                                >
                                                    {props.districts.map(product => {
                                                        return (
                                                            <DropdownItem onClick={(e) => method.onChangeDistrict(e, product)}>{product.name_th}</DropdownItem>
                                                        )
                                                    }
                                                    )}
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </AvGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                        < Label className="av-label" for="avexampleLastName">
                                            {str.subdistrict}
                                        </Label>
                                        <AvGroup>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle caret size="lg"
                                                    disabled={props.districtSelected === "" ?
                                                        true
                                                        :
                                                        false
                                                    }
                                                    style={DropdownStyle} outline >
                                                    {props.subDistrictSelected === "" ?
                                                        <a>{str.subdistrict}</a>
                                                        :
                                                        <a>{props.subDistrictSelected}</a>
                                                    }
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    modifiers={DropdownModifiers}
                                                >
                                                    {props.subDistricts.map(product => {
                                                        return (
                                                            <DropdownItem onClick={(e) => method.onChangeSubDistrict(e, product)}>{product.name_th}</DropdownItem>
                                                        )
                                                    }
                                                    )}
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </AvGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                        < Label className="av-label" for="avexampleLastName">
                                            {str.zip}
                                        </Label>
                                        <AvGroup>
                                            <UncontrolledButtonDropdown disabled>
                                                <DropdownToggle caret size="lg"
                                                    disabled={/*props.subDistrictSelected === "" ?
                                                        true
                                                        :
                                                        false*/
                                                        true //For now, zip code always has only 1 code per subdistrict,
                                                    }
                                                    style={DropdownStyle} outline >
                                                    {props.zipCode === "" ?
                                                        <a>{str.zip}</a>
                                                        :
                                                        <a>{props.zipCode}</a>
                                                    }
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    modifiers={DropdownModifiers}
                                                >
                                                    {/* {this.state.zipCode.map(product => {
                                return (
                                  <DropdownItem onClick={(e) => this.onChangeSubDistrict(e, product)}>{product.name_th}</DropdownItem>
                                )
                              }
                              )} */}
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </AvGroup>
                                    </Colxx>
                                </AvForm>

                                <div className="text-center" style={{ marginBottom: 30 }}>
                                    <Button
                                        color="primary"
                                        className="btn-shadow"
                                        size="lg"
                                        onClick={method.checkConfirm}
                                    >
                                        {str.register}
                                    </Button>
                                </div>
                            </Form>
                        </div>

                    </Colxx>
                </Row>
            </Container>
        );
    }
}

class TabletLayout extends Component {
    render() {
        const props = _.get(this.props, "state")
        const method = _.get(this.props, "method")
        return (
            <Container className="container d-flex flex-column justify-content-center">
                <Row>
                    <Colxx xxs="12" className="text-center">
                        <NavLink to={`/`} className="white">
                            <span className="logo-single2" />
                        </NavLink>
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        <h1>{`${str.subtitle1} `}</h1><h1 className="font-weight-semibold">{str.subtitle2}</h1>
                    </Colxx>
                </Row>
                <Row className="d-flex flex-row justify-content-center" style={{ marginTop: 20 }}>
                    <Colxx xxs="10">
                        <CardTitle className="mb-4">
                            {str.register}
                        </CardTitle>
                    </Colxx>
                </Row>
                <Row className="d-flex flex-row justify-content-center">
                    <Colxx xxs="10">
                        <Form>
                            <AvForm className="mb-5 row">
                                <Colxx sm={6}>
                                    <AvGroup>
                                        <Label className="av-label" for="avexampleEmail">
                                            {str.email}
                                        </Label>
                                        <AvInput name="email" id="avexampleEmail" type="text" style={radius} required
                                            onChange={(e) => method.onEmailChange(e, "email")}
                                        />
                                        <AvFeedback>
                                            {str.noEmailMessage}
                                        </AvFeedback>
                                        <div style={validateStyle}>
                                            {props.messageMail === "false_matching" && props.email != "" ?
                                                str.emailNotValid
                                                :
                                                props.messageMail === USERNAME_AVAILABLE && props.email != "" ?
                                                    <div style={{ color: "#32CD32" }}>
                                                        {str.emailOk}
                                                    </div>
                                                    :
                                                    props.messageMail === USERNAME_ALREADY_TAKEN && props.email != "" ?
                                                        str.emailExists
                                                        :
                                                        ""
                                            }
                                        </div>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    <AvGroup>
                                        <Label className="av-label" for="avexampleConEmail">
                                            {"อีเมลผู้แนะนำระบบ "}
                                        </Label>
                                        <AvInput name="ConEmail" id="avexampleConEmail" type="text" style={radius} required
                                            onChange={(e) => method.handleChangeData(e, "supporter")}
                                        />
                                        <AvFeedback>
                                            {"กรุณากรอกข้อมูล"}
                                        </AvFeedback>
                                        <div style={validateStyle}>
                                            {props.checkSupporter === true && props.supporter != "" ?
                                                <div style={{ color: "#32CD32" }}>
                                                    {"อีเมลผู้แนะนำระบบถูกต้อง"}
                                                </div>
                                                :
                                                props.checkSupporter === false && props.supporter != "" ?
                                                    "อีเมลผู้แนะนำระบบไม่ถูกต้อง"
                                                    :
                                                    ""
                                            }
                                        </div>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    <PasswordInput
                                        label={str.password}
                                        value={props.password}
                                        onChange={(value) => method.validateData({ target: { value: value } }, "password")}
                                        isCorrect={!_.isEmpty(props.password)}
                                        message={str.passwordErrorMessage}
                                        labelSize="0.8rem" />
                                </Colxx>
                                <Colxx sm={6}>
                                    <PasswordInput
                                        label={str.confirmPassword}
                                        value={props.conPassword}
                                        onChange={(value) => method.validateData({ target: { value: value } }, "conPassword")}
                                        isCorrect={props.validatePassword}
                                        message={str.confirmPasswordMessage}
                                        labelSize="0.8rem" />
                                </Colxx>
                                <Colxx sm={6}>
                                    <AvGroup>
                                        <Label className="av-abel" for="avexampleName">
                                            {str.nameSurname}
                                        </Label>
                                        <AvInput className="form-conrol" name="name" id="avexampleName" style={radius} required
                                            onChange={(e) => method.handleChangeData(e, "name")}
                                        />
                                        <AvFeedback>
                                            {str.nameErrorMessage}
                                        </AvFeedback>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    <AvGroup>
                                        <Label className="av-label" for="avexampleTel">
                                            {str.telephoneNumber}
                                        </Label>

                                        <AvInput name="tel" id="avexampleTel" style={radius} required
                                            onChange={(e) => method.handleChangeData(e, "tel")}
                                        />
                                        <AvFeedback>
                                            {str.telMessage}
                                        </AvFeedback>
                                        <div style={validateStyle}>
                                            {props.phoneNumberForm === false && props.tel != "" ?
                                                str.telErrorMessage
                                                :
                                                ""
                                            }
                                        </div>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    < Label className="av-label" for="avexampleLastName">
                                        {str.province}
                                    </Label>
                                    <AvGroup>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle caret size="lg" disabled={false} style={DropdownStyle} outline >
                                                {props.provinceSelected === "" ?
                                                    <a>{str.province}</a>
                                                    :
                                                    <a>{props.provinceSelected}</a>
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu
                                                modifiers={DropdownModifiers}
                                            >
                                                {props.provinces.map(product => {
                                                    return (
                                                        <DropdownItem onClick={(e) => method.onChangeProvince(e, product)}>{product.name_th}</DropdownItem>
                                                    )
                                                }
                                                )}
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    < Label className="av-label" for="avexampleLastName">
                                        {str.district}
                                    </Label>
                                    <AvGroup>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle caret size="lg"
                                                disabled={props.provinceSelected === "" ?
                                                    true
                                                    :
                                                    false
                                                }
                                                style={DropdownStyle} outline >
                                                {props.districtSelected === "" ?
                                                    <a>{str.district}</a>
                                                    :
                                                    <a>{props.districtSelected}</a>
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu
                                                modifiers={DropdownModifiers}
                                            >
                                                {props.districts.map(product => {
                                                    return (
                                                        <DropdownItem onClick={(e) => method.onChangeDistrict(e, product)}>{product.name_th}</DropdownItem>
                                                    )
                                                }
                                                )}
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    < Label className="av-label" for="avexampleLastName">
                                        {str.subdistrict}
                                    </Label>
                                    <AvGroup>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle caret size="lg"
                                                disabled={props.districtSelected === "" ?
                                                    true
                                                    :
                                                    false
                                                }
                                                style={DropdownStyle} outline >
                                                {props.subDistrictSelected === "" ?
                                                    <a>{str.subdistrict}</a>
                                                    :
                                                    <a>{props.subDistrictSelected}</a>
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu
                                                modifiers={DropdownModifiers}
                                            >
                                                {props.subDistricts.map(product => {
                                                    return (
                                                        <DropdownItem onClick={(e) => method.onChangeSubDistrict(e, product)}>{product.name_th}</DropdownItem>
                                                    )
                                                }
                                                )}
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    < Label className="av-label" for="avexampleLastName">
                                        {str.zip}
                                    </Label>
                                    <AvGroup>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle caret size="lg"
                                                disabled={/*props.subDistrictSelected === "" ?
                                                    true
                                                    :
                                                    false*/true
                                                }
                                                style={DropdownStyle} outline >
                                                {props.zipCode === "" ?
                                                    <a>{str.zip}</a>
                                                    :
                                                    <a>{props.zipCode}</a>
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu
                                                modifiers={DropdownModifiers}
                                            >
                                                {/* {this.state.zipCode.map(product => {
                                return (
                                  <DropdownItem onClick={(e) => this.onChangeSubDistrict(e, product)}>{product.name_th}</DropdownItem>
                                )
                              }
                              )} */}
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </AvGroup>
                                </Colxx>
                            </AvForm>

                            <div className="text-center" style={{ marginBottom: 30 }}>
                                <Button
                                    color="primary"
                                    className="btn-shadow"
                                    size="lg"
                                    onClick={(e) => method.checkConfirm()}
                                >
                                    {str.register}
                                </Button>
                            </div>
                        </Form>
                    </Colxx>
                </Row>
            </Container>
        );
    }
}

class MobileLayout extends Component {

    render() {
        const props = _.get(this.props, "state")
        const method = _.get(this.props, "method")
        const formStyle = {
            width: "100%",
            height: 30,
            borderRadius: 15
        }
        return (
            <Container className="container" style={{ marginTop: 25, overflowY: "scroll", overflowX: "hidden" }}>
                <Row>
                    <Colxx xxs="12" className="text-center">
                        <NavLink to={`/`} className="white">
                            <span className="logo-single2"
                                style={{
                                    width: 150,
                                    height: 75,
                                    backgroundSize: "contain",
                                    marginBottom: 5
                                }} />
                        </NavLink>
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        <h5>{`${str.subtitle1} `}</h5><h5 className="font-weight-semibold">{str.subtitle2}</h5>
                    </Colxx>
                </Row>
                <Row className="d-flex flex-row justify-content-center" style={{ marginTop: 20 }}>
                    <Colxx xxs="10">
                        <CardTitle className="mb-4 text-center">
                            <bold>{str.register}</bold>
                        </CardTitle>
                    </Colxx>
                </Row>
                <Row className="d-flex flex-row justify-content-center">
                    <Colxx xxs="10">
                        <Form>
                            <AvForm className="mb-5 row">
                                <Colxx sm={6}>
                                    <AvGroup>
                                        <Label className="av-label" for="avexampleEmail">
                                            {str.email}
                                        </Label>
                                        <AvInput name="email" id="avexampleEmail" type="text" style={radius} required
                                            onChange={(e) => method.onEmailChange(e, "email")}
                                        />
                                        <AvFeedback>
                                            {str.noEmailMessage}
                                        </AvFeedback>
                                        <div style={validateStyle}>
                                            {props.messageMail === "false_matching" && props.email != "" ?
                                                str.emailNotValid
                                                :
                                                props.messageMail === USERNAME_AVAILABLE && props.email != "" ?
                                                    <div style={{ color: "#32CD32" }}>
                                                        {str.emailOk}
                                                    </div>
                                                    :
                                                    props.messageMail === USERNAME_ALREADY_TAKEN && props.email != "" ?
                                                        str.emailExists
                                                        :
                                                        ""
                                            }
                                        </div>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    <AvGroup>
                                        <Label className="av-label" for="avexampleConEmail">
                                            {"อีเมลผู้แนะนำระบบ "}
                                        </Label>
                                        <AvInput name="ConEmail" id="avexampleConEmail" type="text" style={radius} required
                                            onChange={(e) => method.handleChangeData(e, "supporter")}
                                        />
                                        <AvFeedback>
                                            {"กรุณากรอกข้อมูล"}
                                        </AvFeedback>
                                        <div style={validateStyle}>
                                            {props.checkSupporter === true && props.supporter != "" ?
                                                <div style={{ color: "#32CD32" }}>
                                                    {"อีเมลผู้แนะนำระบบถูกต้อง"}
                                                </div>
                                                :
                                                props.checkSupporter === false && props.supporter != "" ?
                                                    "อีเมลผู้แนะนำระบบไม่ถูกต้อง"
                                                    :
                                                    ""
                                            }
                                        </div>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    <PasswordInput
                                        label={str.password}
                                        value={props.password}
                                        onChange={(value) => method.validateData({ target: { value: value } }, "password")}
                                        isCorrect={!_.isEmpty(props.password)}
                                        message={str.passwordErrorMessage}
                                        labelSize="0.8rem" />
                                </Colxx>
                                <Colxx sm={6}>
                                    <PasswordInput
                                        label={str.confirmPassword}
                                        value={props.conPassword}
                                        onChange={(value) => method.validateData({ target: { value: value } }, "conPassword")}
                                        isCorrect={props.validatePassword}
                                        message={str.confirmPasswordMessage}
                                        labelSize="0.8rem" />
                                </Colxx>
                                <Colxx sm={6}>
                                    <AvGroup>
                                        <Label className="av-abel" for="avexampleName">
                                            {str.nameSurname}
                                        </Label>
                                        <AvInput className="form-conrol" name="name" id="avexampleName" style={radius} required
                                            onChange={(e) => method.handleChangeData(e, "name")}
                                        />
                                        <AvFeedback>
                                            {str.nameErrorMessage}
                                        </AvFeedback>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    <AvGroup>
                                        <Label className="av-label" for="avexampleTel">
                                            {str.telephoneNumber}
                                        </Label>

                                        <AvInput name="tel" id="avexampleTel" style={radius} required
                                            onChange={(e) => method.handleChangeData(e, "tel")}
                                        />
                                        <AvFeedback>
                                            {str.telMessage}
                                        </AvFeedback>
                                        <div style={validateStyle}>
                                            {props.phoneNumberForm === false && props.tel != "" ?
                                                str.telErrorMessage
                                                :
                                                ""
                                            }
                                        </div>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    < Label className="av-label" for="avexampleLastName">
                                        {str.province}
                                    </Label>
                                    <AvGroup>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle caret size="lg" disabled={false} style={DropdownStyle} outline >
                                                {props.provinceSelected === "" ?
                                                    <a>{str.province}</a>
                                                    :
                                                    <a>{props.provinceSelected}</a>
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu
                                                modifiers={DropdownModifiers}
                                            >
                                                {props.provinces.map(product => {
                                                    return (
                                                        <DropdownItem onClick={(e) => method.onChangeProvince(e, product)}>{product.name_th}</DropdownItem>
                                                    )
                                                }
                                                )}
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    < Label className="av-label" for="avexampleLastName">
                                        {str.district}
                                    </Label>
                                    <AvGroup>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle caret size="lg"
                                                disabled={props.provinceSelected === "" ?
                                                    true
                                                    :
                                                    false
                                                }
                                                style={DropdownStyle} outline >
                                                {props.districtSelected === "" ?
                                                    <a>{str.district}</a>
                                                    :
                                                    <a>{props.districtSelected}</a>
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu
                                                modifiers={DropdownModifiers}
                                            >
                                                {props.districts.map(product => {
                                                    return (
                                                        <DropdownItem onClick={(e) => method.onChangeDistrict(e, product)}>{product.name_th}</DropdownItem>
                                                    )
                                                }
                                                )}
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    < Label className="av-label" for="avexampleLastName">
                                        {str.subdistrict}
                                    </Label>
                                    <AvGroup>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle caret size="lg"
                                                disabled={props.districtSelected === "" ?
                                                    true
                                                    :
                                                    false
                                                }
                                                style={DropdownStyle} outline >
                                                {props.subDistrictSelected === "" ?
                                                    <a>{str.subdistrict}</a>
                                                    :
                                                    <a>{props.subDistrictSelected}</a>
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu
                                                modifiers={DropdownModifiers}
                                            >
                                                {props.subDistricts.map(product => {
                                                    return (
                                                        <DropdownItem onClick={(e) => method.onChangeSubDistrict(e, product)}>{product.name_th}</DropdownItem>
                                                    )
                                                }
                                                )}
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </AvGroup>
                                </Colxx>
                                <Colxx sm={6}>
                                    < Label className="av-label" for="avexampleLastName">
                                        {str.zip}
                                    </Label>
                                    <AvGroup>
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle caret size="lg"
                                                disabled={/*props.subDistrictSelected === "" ?
                                                    true
                                                    :
                                                    false*/true
                                                }
                                                style={DropdownStyle} outline >
                                                {props.zipCode === "" ?
                                                    <a>{str.zip}</a>
                                                    :
                                                    <a>{props.zipCode}</a>
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu
                                                modifiers={DropdownModifiers}
                                            >
                                                {/* {this.state.zipCode.map(product => {
                                return (
                                  <DropdownItem onClick={(e) => this.onChangeSubDistrict(e, product)}>{product.name_th}</DropdownItem>
                                )
                              }
                              )} */}
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </AvGroup>
                                </Colxx>
                            </AvForm>

                            <div className="text-center" style={{ marginBottom: 30 }}>
                                <Button
                                    color="primary"
                                    className="btn-shadow"
                                    size="lg"
                                    onClick={(e) => method.checkConfirm()}
                                >
                                    {str.register}
                                </Button>
                            </div>
                        </Form>
                    </Colxx>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    const { user, loading } = authUser;
    return { user, loading };
};

export default connect(
    mapStateToProps,
    {
        registerUser
    }
)(Register);  