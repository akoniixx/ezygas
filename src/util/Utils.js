import moment from 'moment';
import { month } from "Constants/dataTime";

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key], B = b[key];
    if (order.indexOf(A + "") > order.indexOf(B + "")) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};


export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return dd + '.' + mm + '.' + yyyy;
}

export const getFullYear = () => {
  const today = new Date();
  let y = today.getFullYear();
  return y;
}

export const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes()
}

export const addCommas = (nStr) => {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

export function getCookie(name) {
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

export function convertTel(tel, changeTo = "0") {
  if (changeTo === "0" && tel.substring(0, 3) == "+66") {
    return "0" + tel.substring(3);
  }
  if (changeTo === "+66" && tel.substring(0, 1) == "0") {
    return "+66" + tel.substring(1);
  }
  return tel;
}

export function extractTimeFromAPI(time) {
  return time.substring(11, 16);
}

export function isNaturalNumber(number){
  return (!isNaN(number) && number >= 0);
}

export function handletoNumber(input){
  let number = 0
  if (!isNaN(parseInt(input, 10))) {
    number = parseInt(input, 10)
  } else {
    number = ""
  }
  return number
}

export function dateTimeForm(){
  let time = new Date().toString().split(" ")
  time = "" + time[3] + "-" + month[time[1]] + "-" + time[2] + "T" + time[4].substring(0, 5) + ":00+07:00"
  return time
}


