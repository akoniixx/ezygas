import React, { Component, Fragment } from 'react';
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Container
} from "reactstrap";
import { Colxx } from 'Components/CustomBootstrap';
import Media from 'react-media';
import { NavLink } from "react-router-dom";
import { loginUser } from "Redux/actions";
import { connect } from 'react-redux';
import { Separator } from "Components/CustomBootstrap";
import { desktopScreenQuery, tabletScreenQuery, mobileScreenQuery } from 'Constants/screenWidth';

class LoginLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onChangePayload = this.onChangePayload.bind(this);
    this.onUserLogin = this.onUserLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.onUserLogin();
    }
  }

  onChangePayload = (event, type) => {
    if (type == 'password') {
      this.setState({
        password: event.target.value.trim()
      });
    } else {
      this.setState({
        email: event.target.value.trim()
      });
    }
  }

  onUserLogin() {
    if (this.state.email == undefined) {
      this.setState({
        email: ""
      });
    }
    if (this.state.password == undefined) {
      this.setState({
        password: ""
      });
    }
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.loginUser(this.state, this.props.history)
      // console.log("test", this.props.loginUser.message)
    }
  }

  componentDidMount() {
    document.body.classList.add("background");
  }

  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <Media query={mobileScreenQuery}>
            <MobileLayout
              email={this.state.email}
              password={this.state.password}
              onChangePayload={this.onChangePayload}
              onUserLogin={this.onUserLogin}
              handleKeyPress={this.handleKeyPress}
            />
          </Media>
          <Media query={tabletScreenQuery}>
            <TabletLayout
              email={this.state.email}
              password={this.state.password}
              onChangePayload={this.onChangePayload}
              onUserLogin={this.onUserLogin}
              handleKeyPress={this.handleKeyPress}
            />
          </Media>
          <Media query={desktopScreenQuery}>
            <DesktopLayout
              email={this.state.email}
              password={this.state.password}
              onChangePayload={this.onChangePayload}
              onUserLogin={this.onUserLogin}
              handleKeyPress={this.handleKeyPress}
            />
          </Media>
        </main>
      </Fragment>
    );
  }

}

const radius = {
  borderRadius: 25.5,
  marginBottom: 10
}

class DesktopLayout extends Component {

  render() {
    return (
      <div className="container">
        <Row className="h-100">
          <Colxx xxs="12" md="4" className="mx-auto my-auto">
            <div className="form-side">
              <div className="text-center">
                <NavLink to={`/`} className="white">
                  <span className="logo-login" />
                </NavLink>
              </div>
              <Row style={{ margin: "-30px 0px" }}>
              </Row>
              <CardTitle className="mb-4">
                <IntlMessages id="เข้าสู่ระบบ" />
              </CardTitle>
              <Form>
                <Label className="av-label" for="avexampleEmail">
                  <IntlMessages id="user.email" />
                </Label>
                <Input name="email" id="avexampleEmail" type="text" style={radius} required
                  onChange={(event) => this.props.onChangePayload(event, 'email')}
                />
                <Label className="av-label" for="avexampleEmail">
                  <IntlMessages
                    id="user.password"
                    defaultValue={this.props.password}
                  />
                </Label>

                <Input type="password" style={radius} onChange={(event) => this.props.onChangePayload(event, 'password')} onKeyPress={(e) => this.props.handleKeyPress(e)} />

               
                
                <p/>
              
                <div className="text-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={(e) => this.props.onUserLogin(e)}
                  >
                    <IntlMessages id="user.login-button" />
                  </Button>
                </div>
                
                <p/>
                
                
                <Separator className="mb-2" />
                
                
              <p/>
                <Row>
                  <Colxx xxs="12">
                  <div className="d-flex justify-content-center align-items-center">
                  
                 
                     {/*  <NavLink to={`/forgot-password`}>
                        <IntlMessages id="ลืมรหัสผ่าน ?" />
                      </NavLink> */}
                    

                  <NavLink to={`/register`}>
                  <div className="text-primary">
                    <u>
                    <IntlMessages id="สมัครสมาชิก" />
                    </u>
                    </div>
                  </NavLink>
                </div>
                  </Colxx>
                </Row>
                



              </Form>
            </div>
          </Colxx>
        </Row>
      </div>
    );
  }
}

class TabletLayout extends Component {
  render() {
    return (
      <Container className="container">
        <Row className="h-100 d-flex flex-row justify-content-center">
          <Colxx xxs="8" className="d-flex flex-column justify-content-center">
            <Row className="d-flex flex-row justify-content-center">
              <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                <NavLink to={`/`} className="white">
                  <span className="logo-login" />
                </NavLink>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <CardTitle>
                  <IntlMessages id="เข้าสู่ระบบ" />
                </CardTitle>
              </Colxx>
            </Row>
            <Form>
              <Label className="av-label" for="avexampleEmail">
                <IntlMessages id="user.email" />
              </Label>
              <Input name="email" id="avexampleEmail" type="text" style={radius} required
                onChange={(event) => this.props.onChangePayload(event, 'email')}
              />
              <Label className="av-label" for="avexampleEmail">
                <IntlMessages
                  id="user.password"
                  defaultValue={this.props.password}
                />
              </Label>
              <Input type="password" style={radius} onChange={(event) => this.props.onChangePayload(event, 'password')} onKeyPress={(e) => this.props.handleKeyPress(e)} />
            </Form>
            <div className="d-flex justify-content-center align-items-center">
                  
                  {/*
                      <NavLink to={`/forgot-password`}>
                        <IntlMessages id="ลืมรหัสผ่าน ?" />
                      </NavLink>
                      */}

                  <NavLink to={`/register`}>
                  <div className="text-primary">
                    <u>
                    <IntlMessages id="สมัครสมาชิก" />
                    </u>
                    </div>
                  </NavLink>
                </div>
            <Row style={{ marginTop: 25 }}>
              <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={(e) => this.props.onUserLogin(e)}
                >
                  <IntlMessages id="user.login-button" />
                </Button>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Container>
    );
  }
}

class MobileLayout extends Component {
  render() {
    return (
      <Container className="container">
        <Row className="h-100 d-flex flex-row justify-content-center">
          <Colxx xxs="8" className="d-flex flex-column justify-content-center">
            <Row className="d-flex flex-row justify-content-center">
              <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                <NavLink to={`/`} className="white">
                  <span className="logo-login"
                    style={{
                      width: 150,
                      height: 150,
                      marginBottom: 30
                    }} />
                </NavLink>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <CardTitle>
                  <IntlMessages id="เข้าสู่ระบบ" />
                </CardTitle>
              </Colxx>
            </Row>
            <Form>
              <Label className="av-label" for="avexampleEmail">
                <IntlMessages id="user.email" />
              </Label>
              <Input name="email" id="avexampleEmail" type="text" style={radius} required
                onChange={(event) => this.props.onChangePayload(event, 'email')}
              />
              <Label className="av-label" for="avexampleEmail">
                <IntlMessages
                  id="user.password"
                  defaultValue={this.props.password}
                />
              </Label>
              <Input type="password" style={radius} onChange={(event) => this.props.onChangePayload(event, 'password')} onKeyPress={(e) => this.props.handleKeyPress(e)} />
            </Form>
            <div className="d-flex justify-content-center align-items-center">
                  
                  {/*
                      <NavLink to={`/forgot-password`}>
                        <IntlMessages id="ลืมรหัสผ่าน ?" />
                      </NavLink>
                      */}

                  <NavLink to={`/register`}>
                  <div className="text-primary">
                    <u>
                    <IntlMessages id="สมัครสมาชิก" />
                    </u>
                    </div>
                  </NavLink>
                </div>
            <Row style={{ marginTop: 25 }}>
              <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={(e) => this.props.onUserLogin(e)}
                >
                  <IntlMessages id="user.login-button" />
                </Button>
              </Colxx>
            </Row>
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

export default connect(mapStateToProps, { loginUser })(LoginLayout);