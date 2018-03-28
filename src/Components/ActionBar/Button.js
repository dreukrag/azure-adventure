import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldDescriptionBeShown: "none"
        }
    }

    functionToBeCalled = null;

    onComponentDidMount = () => {
        //No description parameter, don't even add the div for the description
        //No text parameter, don't do the button
    }

    render = () => {

        return (
            //TO-DO: conditional render, no need for description if theres nothing to be shown
            <button
                style={{ position: "relative" }} onTouchStart={(e) => { this.hover(true) }} onTouchEnd={(e) => { this.hover(false) }} onMouseEnter={(e) => { this.hover(true) }} onMouseLeave={(e) => { this.hover(false) }} onClick={(e)=>{
                    this.props.clickFunction(e, this.props.objectToRepresent.key)
                }}>

                {this.props.objectToRepresent.name}

                <div className="btn-descriptionBox" style={{ display: this.state.shouldDescriptionBeShown }}>
                    {
                        this.props.objectToRepresent.description && this.props.objectToRepresent.text
                    }
                </div>
            </button>

        )
    }

    hover = () => {
        switch (this.state.shouldDescriptionBeShown) {
            case "none":
                this.setState({ shouldDescriptionBeShown: "block" });
                break;
            case "block":
                this.setState({ shouldDescriptionBeShown: "none" });
                break;
        }
    }
    hover = (bool) => {
        if (bool) { this.setState({ shouldDescriptionBeShown: "block" }) }
        else { this.setState({ shouldDescriptionBeShown: "none" }) }
    }
}

Button.defaultProps = {
    objectToRepresent: {
        name: "name",
        text: "text",
        description: "description",
        key:""
    },
    clickFunction:null
}