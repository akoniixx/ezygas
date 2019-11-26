import React, { useState, useEffect } from "react";
import { Separator } from "Components/CustomBootstrap";
import axios from 'axios';
import { connect } from "react-redux";
import { getCustomer, getStock } from "Redux/actions";
import Media from 'react-media';
import * as screen from 'Constants/screenWidth';
import styled from 'styled-components';

//Child Components
import Header from './header';
import StockList from './stockList';
// import ModalOrderManagement from './orderManagement'

//Modal
import SideButton from 'Components/SideButton'
import OrderManagement from "./orderManagement";
import { ModalConfirm, ModalSuccess } from "./modals";

const apiCustomer = "/api/customer/"
const apiOrder = "/api/order/"

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const POSContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
min-height: 470px;
`;

const Pos = (props) => {
  //?States
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSideButtonModalOpen, setIsSideButtonModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]); //!valueCheck in old pos
  const [itemsList, setItemsList] = useState([]);
  //? Summation for all in array of default... states above
  const [summation, setSummation] = useState({ gas: 0, cost: 0 });
  //? false if api says "quantity is not enough" after post an order.
  const [isEnoughQuantity, setIsEnoughQuantity] = useState(true); //! CheckOrderMes in old pos
  const [redirectToOrderListPrompt, setRedirectToOrderListPrompt] = useState(false); //!ChangeToOrderList in old pos
  //? Selecting Customer states
  const [customer, setCustomer] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState(null);

  //* Checked Items handler
  // ! unCheck() in old pos
  const onItemUncheck = (index) => {
    let prev = checkedItems.slice();
    prev[index] = false;
    setCheckedItems(prev);
  }

  //! check() in old pos
  const onItemCheck = (isChecked, item) => {
    let prev = checkedItems.slice();
    prev[item.id] = isChecked;
    setCheckedItems(prev);
  }

  //! clearItem() in old pos
  const clearItems = () => {
    setItemsList([]);
    setCheckedItems([]);
    setSummation({ gas: 0, cost: 0 });
    setDataToSubmit(null);
  }

  //* Modals toggler
  const toggleModalConfirm = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
  }
  const toggleModalSuccess = (submitResult) => {
    setIsSuccessModalOpen(!isSuccessModalOpen);
    //* submitResult != null means after posting, items must be cleared.
    if (submitResult != null) clearItems();
    if (submitResult && isEnoughQuantity) {
      //* submission successful, confirm redirecting to order list
      setRedirectToOrderListPrompt(true);
    } else {
      setRedirectToOrderListPrompt(false);
      setIsEnoughQuantity(true);
      loadStock();
    }
  }
  const toggleModalSideButton = () => {
    setIsSideButtonModalOpen(!isSideButtonModalOpen);
  }

  //* New Order (CreateOrder() in old pos)
  const createOrder = () => {
    console.log('creating order');
    console.log('customer', customer);
    const customerId = customer.id || -1;
    const data = {
      ...dataToSubmit,
      customer: customerId,
      service_charge: 10
    }
    fetch(apiOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.message === "quantity is not enough") {
          setIsEnoughQuantity(false);
        }
      })
      .catch(error => { });
    //* We not close confirm modal yet, so close it.
    toggleModalConfirm();
    //* Prompt a modal to report submission status.
    toggleModalSuccess();
  }

  //* APIs data lodaers
  //! getId() in old pos
  const loadCustomerById = () => {
    let id = window.location.href.split("id=")[1];
    if (id == null) {
      let path = `/orders/order`;
      props.history.push(path);
    } else {
      const url = `${apiCustomer}${id}/`;
      axios.get(url)
        .then(res => {
          const customer = res.data.data;
          setCustomer(customer);
        })
        .catch(error => console.error(`pos: load customer (${id}) error:`, error));
    }
  }
  //! dataStock() in old pos
  const loadStock = () => props.getStock();

  //* componentDidMount
  //TODO: second parameter MUST be an empty array to make useEffect run only once.
  useEffect(() => {
    loadStock();
    loadCustomerById();
  }, []);

  //* Summation Calculator
  const calculateSumGas = () => {
    let sum = 0;
    itemsList.forEach(
      (item) => item ? sum = sum + +item.quantity : ''
    );
    return sum;
  }
  const calculateSumCost = () => {
    let sum = 0;
    itemsList.forEach(
      (item) => item ? sum = sum + (+item.price) : ''
    );
    return sum;
  }

  //* States changed listeners
  useEffect(() => {
    const sum = {
      //? Summation of cylinders quantity in entire itemslist
      gas: calculateSumGas(),
      //? Total price in entire itemslist
      cost: calculateSumCost()
    }
    setSummation(sum);
    console.log('itemsList listener', itemsList)
  }, [itemsList]);

  useEffect(() => {
    console.log('summation listener', summation);
  }, [summation]);

  useEffect(() => {
    console.log('submit data updated', dataToSubmit);
  }, [dataToSubmit])

  //* Data to send to StockList
  const stockListProps = {
    stock: props.stock.list || [],
    itemsList: itemsList,
    setItemsList: setItemsList,
    checkedItems: checkedItems,
    setCheckItems: setCheckedItems,
    onItemCheck: onItemCheck
  };
  //* Data to send to OrderManagement
  const orderManagementProps = {
    clearItems: clearItems,
    itemsList: itemsList,
    setItemsList: setItemsList,
    onItemUncheck: onItemUncheck,
    summation: summation,
    toggleModalConfirm: toggleModalConfirm,
    setDataToSubmit: setDataToSubmit,
    isSideButtonModalOpen: isSideButtonModalOpen,
    toggleModalSideButton: toggleModalSideButton
  }
  //* Data send to ModalConfirm
  const modalConfirmProps = {
    isOpen: isConfirmModalOpen,
    toggleModal: toggleModalConfirm,
    dataToSubmit: dataToSubmit,
    summation: summation,
    createOrder: createOrder
  }
  //* Data send to ModalSuccess
  const modalSuccessProps = {
    isOpen: isSuccessModalOpen,
    toggleModal: toggleModalSuccess,
    submitResult: isEnoughQuantity,
    clearItems: clearItems
  }
  return (
    <div className="pos disable-text-selection">
      <Media query={screen.mobileScreenQuery}>
        <SideButton
          button={
            <img
              className="sidebar-icon"
              src='/assets/img/icon_pos_white.png' />
          }
          onClick={toggleModalSideButton} />
      </Media>
      <Header customer={customer} />
      <Separator className="mb-5" />
      <POSContainer>
        <StockList {...stockListProps} />
        <OrderManagement {...orderManagementProps} />
      </POSContainer>
      <ModalConfirm {...modalConfirmProps} />
      <ModalSuccess {...modalSuccessProps} />
    </div>
  );
}

const mapStateToProps = ({ customer, stock }) => {
  return {
    customer,
    stock
  };
};
export default connect(
  mapStateToProps,
  {
    getCustomer,
    getStock,
  }
)(Pos);