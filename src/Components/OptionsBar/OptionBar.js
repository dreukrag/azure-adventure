import React from 'react';
import MiniMap from './MiniMap';

export default class OptionBar extends React.Component {

    render = () => (
        <div className="option-bar__cont">
            <div className="option-bar__main">
                <p className="option-bar__locationName">
                {this.props.currentLocation.get('name')}
                </p>
                <MiniMap currentLocation={this.props.currentLocation} mapList={this.props.mapList}/>

            </div>
        </div>
    )

    componentDidMount=()=>{

    }
}