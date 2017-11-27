import React from 'react';

export default class StatBar extends React.Component {
    barWidth;
    render = () => (
        <div className="StatBar__main">
            <span className="StatBar__name">{this.props.name}</span>
            <div className="StatBar__bar" style={{width:this.barWidth}}></div>
            <span className="StatBar__value">{this.props.value}</span>            
        </div>
    )

    componentDidMount = () =>{
        this.calcWidth();
    }

    componentDidUpdate = () =>{
        this.calcWidth();
    }

    calcWidth = () => {
        this.barWidth = this.props.value/this.props.valueMax;
        this.barWidth = this.barWidth *100;
        this.barWidth = this.barWidth + "%";
    }
}