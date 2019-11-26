import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class DeleteButton extends Component {
    render() {
        const props = this.props;
        const onClick = _.get(props, 'onClick', () => { console.log('You forgot the onClick function!') });
        return (
            <Button
                className="buttons x-button"
                outline color="primary"
                size="sm"
                onClick={onClick} >X</Button>
        );
    }
}