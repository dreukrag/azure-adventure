import React from 'react';

export default class ActionBar extends React.Component {

    render = () => (
        <div className="action-bar__main">
            <form>
                <input className="parser" type="text" />
                <input className="parser-submit" type="submit" />
            </form>
            <div className="action-bar__row">
                {this.buildOptionList()}
                <button>{text}</button>
                <button>{text}</button>
                <button>{text}</button>
                <button>{text}</button>
                <button>{text}</button>


            </div>
        </div>
    )
    buildOptionList = () => {
        console.log('building options')
        var OptLst = []
        this.props.currentLocation.leadsTo.forEach(function (element) {
            var text;
            element.hasOwnProperty("name") ? text = element.name : text = "go to " + element.X + " " + element.Y;
            OptLst.push(<button onClick={(e) => { this.props.buttonFunc(e, element.X, element.Y) }}>{text}</button>)
        }, this);
        console.log(OptLst);
        return OptLst;
    }
}