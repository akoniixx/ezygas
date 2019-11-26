import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import Text from "Components/Text";
import Button from "Components/Button"
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const props = this.props
        const method = props.method
        const privatePrice = props.privatePrice || []
        const textHeader = (<div className="ml-4 mb-1" style={{ display: "flex", alignItems: "baseline" }}>
            <b><Text type="normal"
                text={"ชื่อโปรโมชั่น"}
                size={"1rem"}
                align="start" /></b>
        </div>)
        const textEmpty = (<div style={{ fontSize: "1.5rem" }}>
            <b><Text type="normal"
                text={"ยังไม่มีรายการ"}
                size={"1.5rem"}
                align="start" /></b>
        </div>)
        const dataEmpty = (privatePrice.length === 0) ? textEmpty : ""
        const header = (window.innerWidth >= 414 && privatePrice.length != 0) ? textHeader : ""
        return (
            <div>
                {header}
                {dataEmpty}
                {privatePrice.map(
                    (items) => (
                        <div>
                            <Card className="mb-2">
                                <CardBody className="pl-4 pr-4 pt-3 pb-3">
                                    <div className="d-flex flex-row justify-content-center">
                                        <div className="d-flex flex-column justify-content-center pr-4" style={{ display: "flex", flexBasis: "80%" }}>
                                            <Text
                                                type="normal"
                                                text={items.name_th}
                                                size={"1rem"}
                                                align={"start"} />
                                        </div>
                                        <div className="d-flex flex-row justify-content-center" style={{ display: "flex", flexBasis: "20%" }}>
                                            <Button type="info" text="แก้ไข"
                                                onClick={(e) => (method.handleState(e, "items", items), method.toggleModalCreatePrivatePrice())} />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    )
                )}
            </div>
        )
    }
}

export default index;