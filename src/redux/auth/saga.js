
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
// import { auth } from '../../firebase';
import { urls } from 'Constants/defaultValues'
import { getCookie } from 'Util/Utils';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from 'Constants/actionTypes';
import {
    loginUserSuccess,
    registerUserSuccess
} from './actions';

// LOGIN LOCAL
const loginUserLocal = {
    user:{
        uid:2,
        username: "easy@gas.co"
    }
}
// const loginWithEmailPasswordAsync = async (email, password) =>
//     await auth.signInWithEmailAndPassword(email, password)
//         .then(authUser => authUser)
//         .catch(error => error);

// LOGIN      
const loginUrl = `/accounts/login/`
function loginApi(email, password) {
    var csrftoken = getCookie('csrftoken');
    return fetch(loginUrl, {
        credentials: 'include',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}

const loginWithEmailPasswordDjangoAsync = async (email, password) =>
    await loginApi(email, password)
        .then(authUser => authUser)
        .catch(error => error);

function* loginWithEmailPasswordDjango({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        const loginUser = yield call(loginWithEmailPasswordDjangoAsync, email, password);
        if (!loginUser.message) {
            localStorage.setItem('user_id', loginUser.user.uid);
            yield put(loginUserSuccess(loginUser));
            history.push('/'+ urls.analyze + '/' + urls.dashboards);
        } else if (loginUser.message === "pending") {
            history.push('/pending');   
        } else if (loginUser.message === "username or password is incorrect") {
            alert("อีเมลและพาสเวิร์ดไม่ถูกต้อง")
        }else {
            // const loginUserLocal = yield call(loginWithEmailPasswordAsync, email, password);
            localStorage.setItem('user_id', loginUserLocal.user.uid);
            yield put(loginUserSuccess(loginUserLocal));
            history.push('/'+ urls.analyze + '/' + urls.dashboards);
        }
    } catch (error) {
        //catch throw
        //console.log('login error : ', error)
    }   
}

// LOGOUT
const logoutUrl = `/accounts/logout/`
function logoutApi() {
    var csrftoken = getCookie('csrftoken');
    return fetch(logoutUrl, {
        credentials: 'include',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({}),
    })
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}

const logoutAsyncDjango = async (history) => {
    await logoutApi()
        .then(authUser => authUser)
        .catch(error => error)
    history.push('/')
}

function* logoutDjango({ payload }) {
    const { history } = payload
    try {
        yield call(logoutAsyncDjango, history);
        localStorage.removeItem('user_id');
    } catch (error) {
    }
}

// REGISTER 
const registerWithEmailPasswordAsync = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);

function* registerWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        if (!registerUser.message) {
            localStorage.setItem('user_id', registerUser.user.uid);
            yield put(registerUserSuccess(registerUser));
            history.push('/pending')
        } else {
            // catch throw
            //console.log('register failed :', registerUser.message)
        }
    } catch (error) {
        // catch throw
        //console.log('register error : ', error)
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPasswordDjango);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logoutDjango);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser)
    ]);
}