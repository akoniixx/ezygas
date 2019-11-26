import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import Text from 'Components/Text';
import Button from 'Components/Button';
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ModalMobileCSS = css`
transform: translate(0%, 50%) !important;
max-width: 90vw;
`;
const POSModal = styled(Modal)`
display: flex;
transform: translate(0%, 100%) !important;
border-radius: 25.5px;
padding: 10px;
margin: 0 auto;
background-color: white;
max-width: 30vw;
${({ ismobile }) => ismobile ? ModalMobileCSS : ''}
`;
const Header = styled(ModalHeader)`
border-bottom: none !important;
margin: 0 auto;
`;
const Message = styled.div`
display: flex;
flex-direction: column;
color: #0C0CA9 !important;
font-weight: bold;
font-size: .9em !important;
`;
const ButtonGroup = styled.div`
display: flex;
justify-content: ${({ validated }) => validated ? 'space-between' : 'center'};
& > *:not(:first-child) {
    margin-left: 0.5rem;
}
`;

//* Modal Prompt to confirm submitting order data.
//* Modal warn for data validation
export const ModalConfirm = ({ isOpen, toggleModal, dataToSubmit, summation, createOrder }) => {
    const validated = dataToSubmit;
    const ismobile = window.innerWidth <= 1024;
    return (
        <POSModal
            isOpen={isOpen}
            toggle={toggleModal}
            ismobile={ismobile}
            aria-labelledby="example-modal-sizes-title-sm"
            backdrop={true}
        >
            <Header>
                <Message>
                    {!validated ?
                        <Fragment>
                            <Text
                                type="normal"
                                text="การทำรายการเกิดข้อผิดพลาด"
                            />
                            <Text
                                type="normal"
                                text="กรุณาตรวจรายการพร้อมกรอกข้อมูลให้ครบถ้วน"
                            />
                            <Text
                                type="normal"
                                text="หรือ"
                            />
                            <Text
                                type="normal"
                                text="เวลาที่เลือกไม่เหมาะสม"
                            />
                        </Fragment>
                        :
                        <Text
                            type="normal"
                            text={`ยืนยันการสั่งซื้อจำนวน ${summation.gas} ถัง`}
                        />
                    }
                </Message>
            </Header>
            <ModalBody>
                <ButtonGroup validated={validated}>
                    {validated ?
                        <Fragment>
                            <Button
                                type="cancel"
                                text="ยกเลิก"
                                onClick={toggleModal}
                            />
                            <Button
                                type="primary"
                                text="ยืนยัน"
                                onClick={(e) => { e.preventDefault(); createOrder(); }}
                            />
                        </Fragment>
                        :
                        <Button
                            type="primary"
                            text="ตกลง"
                            onClick={toggleModal}
                        />
                    }
                </ButtonGroup>
            </ModalBody>
        </POSModal>
    );
}

//* Modal notice when submission completed or failed.
export const ModalSuccess = ({ isOpen, toggleModal, submitResult }) => {
    const ismobile = window.innerWidth <= 1024;
    return (
        <POSModal
            isOpen={isOpen}
            toggle={toggleModal}
            isMobile={ismobile}
            aria-labelledby="example-modal-sizes-title-sm"
            backdrop={true}
        >
            <Header>
                <Message>
                    {submitResult ?
                        <Text
                            type="normal"
                            text="การสั่งซื้อสำเร็จ"
                        />
                        :
                        <Text
                            type="normal"
                            text="จำนวนสินค้าไม่พอสั่งซื้อ"
                        />
                    }
                </Message>
            </Header>
            <ModalBody>
                <ButtonGroup validated={false}>
                    <Button
                        type="primary"
                        text="ตกลง"
                        onClick={(e) => { e.preventDefault(); toggleModal(submitResult) }}
                    />
                </ButtonGroup>
            </ModalBody>
        </POSModal>
    );
}