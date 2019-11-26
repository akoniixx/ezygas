import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class PlusButton extends Component {
    render() {
        const props = this.props;
        const onClick = _.get(props, 'onClick', () => { console.log('You forgot the onClick function!') });
        return (
            <Button
                className="buttons quantity plus"
                outline color="primary"
                size="sm"
                onClick={onClick} >+</Button>
        );
    }
}

export class MinusButton extends Component {
    render() {
        const props = this.props;
        const onClick = _.get(props, 'onClick', () => { console.log('You forgot the onClick function!') });
        return (
            <Button
                className="buttons quantity minus"
                outline color="primary"
                size="sm"
                onClick={onClick} >-</Button>
        );
    }
}