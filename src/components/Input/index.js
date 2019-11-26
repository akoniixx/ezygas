import React, { Component } from 'react';
import { Input as Ip } from 'reactstrap';
import _ from 'lodash';

/**
 * Use these components when using input fields following Ezygas design pattern.
 * 
 * To use input components use by import scripts below.
 * import { TargetComponent } from 'Components/Input';
 */

export class Input extends Component {
    /**
     * Props list
     * 1. label -> Label of input.
     * 2. value -> Value of the input.
     * 3. onChange -> handle function for onChange event.
     * 4. disabled -> True when disable this component.
     * 5. placeholder -> message describes the expected value of an input field
     * 6. borderRadius -> change border radius
     */
    render() {
        const props = this.props;
        const label = _.get(props, 'label', null);
        const value = _.get(props, 'value', '');
        const onChange = _.get(props, 'onChange', []);
        const disabled = _.get(props, 'disabled', false);
        const placeholder = _.get(props, 'placeholder', '');
        const borderRadius = _.get(props, 'borderRadius', null);
        if (label == null) console.error('regular input:', 'warning, you haven\'t declare input label');
        if (label == null) console.error('regular input:', 'You must have label while use required input fields');
        return (
            <div className='regular-input'>
                {label != null ? <div className="label mb-1">{label}</div> : ''}
                <Ip
                    className="field"
                    disabled={disabled}
                    value={value}
                    placeholder={placeholder}
                    style={borderRadius == null? {} : {borderRadius: borderRadius}}
                    onChange={(e) => { onChange(e.target.value) }} />
            </div>
        );
    }
}

export class InputWithValidation extends Component {
    /**
     * Props list
     * 1. label -> Label of input.
     * 2. isRequired -> True if this input is required, false for vice versa.
     * 3. value -> Value of the input.
     * 4. onChange -> handle function for onChange event.
     * 5. isCorrect -> Validation status, true when correct, false for vice versa, null for uncheck.
     * 6. message -> Message of validation result.
     */
    render() {
        const props = this.props;
        const label = _.get(props, 'label', null);
        const isRequired = _.get(props, 'isRequired', false);
        const value = _.get(props, 'value', '');
        const onChange = _.get(props, 'onChange', []);
        const isCorrect = _.get(props, 'isCorrect', null);
        let message = _.get(props, 'message', '');
        //if (label == null) console.error('input with validation:', 'You haven\'t declare input label');
        if (isRequired && label == null) console.error('input with validation:', 'You must have label while use required input fields');
        if (isRequired && _.isEmpty(value)) message = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return (
            <div className='regular-input'>
                {label != null && !isRequired ? <div className="label mb-1">{label}</div> : ''}
                {label != null && isRequired ? <div className="label mb-1"><span className="required-dot" />{` ${label}`}</div> : ''}
                <div className={
                    `field-group d-flex flex-row${
                    (isCorrect != null && !isCorrect && !_.isEmpty(value))
                        ? ' incorrect' : isCorrect ? ' correct' : ''}`}>
                    <Ip
                        className="field"
                        value={value}
                        onChange={(e) => { onChange(e.target.value) }} />
                </div>
                {!_.isEmpty(message) ? <span className={`validation-message${isCorrect ? ' ' : ' in'}correct`}>{message}</span> : ''}
            </div>
        );
    }
}

export class PasswordInput extends Component {
    /**
     * Props list
     * 1. label -> Label of input.
     * 2. value -> Value of the input.
     * 3. onChange -> handle function for onChange event.
     * 4. isCorrect -> Validation status, true when correct, false for vice versa, null for uncheck.
     * 5. message -> Message of validation result.
     */
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.onShowPasswordToggle = this.onShowPasswordToggle.bind(this);
    }

    onShowPasswordToggle() {
        const prevState = this.state.show;
        this.setState({
            show: !prevState
        });
    }

    render() {
        const props = this.props;
        const label = _.get(props, 'label', null);
        const value = _.get(props, 'value', '');
        const onChange = _.get(props, 'onChange', []);
        const isCorrect = _.get(props, 'isCorrect', true);
        const labelSize = _.get(props, 'labelSize', null);
        let message = _.get(props, 'message', 'รหัสผ่านไม่ถูกต้อง');
        if (label == null) console.error('password input:', 'warning, you haven\'t declare input label');
        if (_.isEmpty(value)) message = "กรุณากรอกรหัสผ่าน";
        return (
            <div className='password-input'>
                <div className="label mb-1" style={
                    labelSize == null ?
                        {} :
                        {
                            fontSize: labelSize
                        }
                }>{label}</div>
                <div className={`field-group d-flex flex-row${!isCorrect && !_.isEmpty(value) ? ' incorrect' : ' '}`}>
                    <Ip
                        className="field"
                        type={this.state.show ? 'text' : 'password'}
                        value={value}
                        onChange={(e) => { onChange(e.target.value) }} />
                    <div className="show-password d-flex flex-column justify-content-center">
                        <i className="fa iconsmind-Eye-Blind password-button" onClick={this.onShowPasswordToggle} ></i>
                    </div>
                </div>
                {!_.isEmpty(message) ? <span className={`validation-message${isCorrect ? ' ' : ' incorrect'}`}>{message}</span> : ''}
            </div >
        );
    }
}