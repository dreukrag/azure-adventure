import React from 'react';
import './MainScreen.css';
import ActionBar from './ActionBar/ActionBar';
import OptionBar from './OptionsBar/OptionBar';
import CharacterBar from './Character/CharacterBar';
import Actor from '../Entities/Actor'

import GameWorld from './GameWorld';


import freePort from './Locations/FreePort.json';

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentMapTile: {
                name: "none",
                entryPoint: false,
                description: ["You shouldn't be seeing this"],
                X: 0,
                Y: 0,
                leadsTo: []
            },
            currentMap: []
        }
    }

    render = () => (
        <div className="main-screen__main">
            <OptionBar currentLocation={this.state.currentMapTile} mapList={this.state.currentMap}/>
            <div className="main-screen__gameArea wd-7">
                <GameWorld currentLocation={this.state.currentMapTile}/>
                <ActionBar currentLocation={this.state.currentMapTile} buttonFunc={this.moveToCoord} />
            </div>
            <CharacterBar/>
        </div>
    )

    componentDidMount = () => {

        //Initial map is freeport
        this.setState({
            currentMap: freePort,
            currentMapTile: freePort.find((element) => {
                return element.entryPoint == true;
            })
        })
        var act = new Actor()
        console.log(act.actorAppearance);

    }

    moveToCoord = (event, x, y) => {
        event.preventDefault();
        this.setState({
            currentMapTile: this.state.currentMap.find((element) => {
                return element.X == x && element.Y == y;
            })
        })
    }


}