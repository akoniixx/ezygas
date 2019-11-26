import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import Header from "./header";
import { Separator } from "Components/CustomBootstrap";
import _ from "lodash";
import { connect } from "react-redux";
import { getCustomer, postCustomer, postCheckCustomerName, selectedCustomer } from "Redux/actions";
//Child Components
import CustomerList from "./customerList";
import ModalCustomer from "./modalCustomer";
import { ModalNonCompleted, ModalCon, ModalSuccess } from "../modals";
class Order extends Component {

    constructor(props) {
        super(props);
        this.dataCustomer = this.dataCustomer.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.routeChangeOrder = this.routeChangeOrder.bind(this);
        this.CreateCustomer = this.CreateCustomer.bind(this);
        this.toggleModalConOpen = this.toggleModalConOpen.bind(this);
        this.toggleModalSuccessOpen = this.toggleModalSuccessOpen.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
        this.toggleModalnonCompletedOpen = this.toggleModalnonCompletedOpen.bind(this);
        this.phonenumber = this.phonenumber.bind(this);
        this.checkMessageSuccess = this.checkMessageSuccess.bind(this);
        this.state = {
            modalOpen: false,
            modalConOpen: false,
            modalSuccessOpen: false,
            modalNonCompleted: false,
            isLoading: true,
            search: "",
            addNewCustomer: true,
            id: "",
            name: "",
            address: "",
            tel: "",
            is_active: true,
            phoneNumberForm: true,
            mes: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            mes: _.get(nextProps.customer, "message")
        });
    }

    checkConfirm() {
        const { name, address, tel } = this.state
        if (name != "" && address != "" && tel != "") {
            this.toggleModalConOpen()
        } else {
            this.toggleModalnonCompletedOpen()
        }
    }

    checkMessageSuccess() {
        this.dataCustomer();
        const { name } = this.state
        this.toggleModal();
        this.toggleModalSuccessOpen();
        this.setState({
            search: name
        })
    }

    CreateCustomer(event) {
        const { name, address, tel, is_active, id } = this.state
        event.preventDefault();
        var data = {}
        var editTel = "+66" + this.state.tel.substring(1)
        if (name != "" && address != "" && tel != "" && this.phonenumber(tel) != false) {
            data = {
                name: name,
                address: address,
                tel: editTel,
                is_active: is_active
            }
            this.props.postCustomer(data, id)
            this.toggleModalConOpen();

        } else {
            this.toggleModalConOpen();
        }
    }

    componentDidMount() {
        this.dataCustomer();
    }

    dataCustomer() {
        this.props.getCustomer();
        this.props.getCustomer();
    }

    handleChangeData(e, index) {
        var state = {};
        state[index] = e.target.value;
        this.setState(state)
        if (index === "name") {
            let customerList = _.get(this.props, "customer.list", [])
            const checkName = _.find(customerList, (c) => { return c.name === state[index].trim() })
            if (checkName != undefined) {
                this.setState({
                    mes: 'This name is exists.'
                })
            } else {
                this.setState({
                    mes: ""
                })
            }
        } else if (index === "tel") {
            this.phonenumber(state[index])
        }
    }

    handleKeyPress(e, index) {
        var state = {};
        var rsep = ""
        var lastText = e.target.value[e.target.value.length - 1]
        let regularExpression = new Set(["[", "\\", "/", "(", ")"])
        regularExpression.forEach(regular => {
            if (lastText === regular) {
                lastText = ""
            }
        })
        if (lastText != undefined) {
            rsep = e.target.value.substring(0, e.target.value.length - 1) + lastText
        } else {
            rsep = ""
        }
        state[index] = rsep;
        this.setState(state)
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

    routeChangeOrder(items) {
        let path = `/orders/ecommerce`;
        this.props.history.push(path);
        this.props.selectedCustomer(items);
    }

    toggleModalnonCompletedOpen() {
        const { modalNonCompleted } = this.state
        this.setState({
            modalNonCompleted: !modalNonCompleted
        })
    }

    toggleModalSuccessOpen() {
        const { modalSuccessOpen } = this.state
        this.setState({
            modalSuccessOpen: !modalSuccessOpen
        })
        this.componentDidMount();
    }

    toggleModalConOpen() {
        const { modalConOpen } = this.state
        this.setState({
            modalConOpen: !modalConOpen
        });
    }

    toggleModal(addNewCustomer, data) {
        this.dataCustomer();// change to use reducer set message for smooth 
        const { modalOpen } = this.state
        this.setState({
            modalOpen: !modalOpen,
            phoneNumberForm: true
        });
        if (addNewCustomer === "info") {
            this.setState({
                id: data.id,
                name: data.name,
                tel: data.tel,
                address: data.address,
                addNewCustomer: false,
                mes: ""
            })
        } else if (addNewCustomer === "add") {
            this.setState({
                id: "",
                name: "",
                tel: "",
                address: "",
                addNewCustomer: true,
                mes: ""
            })
        }
    }

    render() {
        let { mes } = this.state
        const loading = this.props.customer.loading
        return (
            !this.state.isLoading ?
                <div className="loading"></div>
                :
                <Fragment>
                    {mes === "Success" && loading === true ?
                        this.checkMessageSuccess()
                        :
                        ""
                    }
                    {/* Modals */}
                    <ModalCustomer
                        state={this.state}
                        message={mes}
                        toggleModal={this.toggleModal}
                        checkConfirm={this.checkConfirm}
                        handleChangeData={this.handleChangeData} />
                    <ModalNonCompleted
                        state={this.state}
                        toggleModalnonCompletedOpen={this.toggleModalnonCompletedOpen} />
                    <ModalCon
                        state={this.state}
                        toggleModalConOpen={this.toggleModalConOpen}
                        CreateCustomer={this.CreateCustomer} />
                    <ModalSuccess
                        state={this.state}
                        toggleModalSuccessOpen={this.toggleModalSuccessOpen} />

                    {/* Header */}
                    <div className="customer-list disable-text-selection" >
                        <Header
                            state={this.state}
                            cutomerList={this.props.customer}
                            header={"บริการโทรสั่ง"}
                            addCustomer={"เพิ่มลูกค้า"}
                            toggleModal={this.toggleModal}
                            handleKeyPress={this.handleKeyPress} />
                        <Separator className="mb-2" />
                        {/* CustomerList */}
                        <CustomerList
                            state={this.state}
                            customerList={this.props.customer}
                            toggleModal={this.toggleModal}
                            routeChangeOrder={this.routeChangeOrder}
                        />
                    </div>
                </Fragment>
        );
    }
}

const mapStateToProps = ({ customer }) => {
    return {
        customer
    };
};
export default injectIntl(connect(
    mapStateToProps,
    {
        getCustomer,
        postCustomer,
        postCheckCustomerName,
        selectedCustomer
    }
)(Order));