import React, { Component } from 'react';

export default class CheckBox extends Component {

    render() {
        const props = this.props;
        const checked = _.get(props, 'checked', false);
        const disabled = _.get(props, 'disabled', false);
        const handleCheck = _.get(props, 'handleCheck', []);
        const text = _.get(props, 'text', null);
        return (
            // Outer div use for padding y from parent.
            <div className="checkbox-component">
                {
                    text != null ?
                        <span className={`checkbox-label${checked ? '-checked' : ''} ${disabled ? 'checkbox-label-disabled' : ''} h-100 mr-2`}>{text}</span>
                        : ''
                }
                <div
                    className={`checkbox-container${disabled ? ' checkbox-disabled' : ''}${checked ? ' checked' : ''}`}
                    onClick={() => { disabled ? '' : handleCheck() }} >
                    <span className={`checkmark${disabled ? ' checkmark-disabled' : ''}${checked ? ' checked' : ''}`}></span>
                </div>
            </div>
        );
    }
}