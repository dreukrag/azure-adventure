import React from 'react';
import {Seq, fromJS, Map} from 'immutable';
import './MainScreen.css';
import ActionBar from './ActionBar/ActionBar';
import OptionBar from './OptionsBar/OptionBar';
import CharacterBar from './Character/CharacterBar';
import GameWorld from './GameWorld';
import Tile from '../Entities/Tile.json';
import DefMap from '../Entities/Map.json';

import freePort from './Locations/FreePort.json';
import Interactions from './Locations/Interactions.json'

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            gameMode:"normal",
            currentMapTile: fromJS(Tile), //{name: "none", entryPoint: false, description: ["You shouldn't be seeing this"], X: 0, Y: 0, leadsTo: []}
            currentMap: fromJS(DefMap),
            currentInteraction:{},
            playerCharacter: {
                name: "player",
                level:1,
                combatStats: [{}],
                coreStats: {
                    strength: 5,
                    inteligence: 3,
                    reflexes: 3,
                    agility: 4
                },
                
            },
            playerInventory:[
                    {name:"thingy", desc:"A thingamajig.", type:"item"},
                    {name:"McGuffin", desc:"People would die over who gets to possess this.",type:"item"}
                ]
        }
    }

    render = () => (
        <div className="main-screen__main">
            <OptionBar currentLocation={this.state.currentMapTile} mapList={this.state.currentMap.get('map')} />
            <div className="main-screen__gameArea wd-7">
                <GameWorld currentLocation={this.state.currentMapTile} />
                <ActionBar currentLocation={this.state.currentMapTile} moveFunc={this.moveToCoord} gameMode={this.state.gameMode} currentInteraction={this.state.currentInteraction} interactionFunc={this.changeCurrentInteraction} playerInfo = {this.state.playerCharacter} stateFunc={this.changeGameState} playerInventory={this.state.playerInventory}/>
            </div>
            <CharacterBar plyChar={this.state.playerCharacter} />
        </div>
    )

    componentDidMount = () => {
        //Setup variables as immutable objects
        const fp = fromJS(freePort);// Seq(freePort).map(x => x ).toObject();
        console.log(fp);
        //Initial map is freeport
        this.setState({
            currentMap: fp,
            currentMapTile: fp.get('map').find(
                (element) => {return element.get('entryPoint') === true}
            )  
        }, ()=>{console.log(this.state.currentMap)})
    }

    changeCurrentInteraction = (event, key="") =>{
        console.log("interaction interacted with")
        console.log("looking up " + key)
        event.preventDefault();
        if(key=""){console.log("Invalid interaction");return}
        let interaction = Interactions.key;
        this.setState({
            currentInteraction:interaction
        });
        if(this.state.currentInteraction==={}){
            this.setState({gameMode:"normal"});
        }else{this.setState({gameMode:"interaction"})}
    }

    moveToCoord = (event, lt) => {
        event.preventDefault();
        var proceed = false;
        if(lt.get('closed') === true){
            proceed = false;
        }else{proceed = true};

        //closed is usually a boolean value, if its a sting that means its referencing a variable on the map variables list, we must therefore check to see the value of said variable and evaluate the condition
        if(typeof lt.get('closed') === 'string'){
            var varToCheck = this.state.currentMap.get('mapVariables').find((v)=>{
                return v.get('var') === lt.get('closed')});
            //Non-existant variable
            if (typeof varToCheck === 'undefined'){
                this.pushText("A blinding flash appears before you. A rip in the very fabric of the universe stands before you. Horrifying visions of a dimension beyond yours can be seen trough that most unholy of portals. Without hesitation you step trough.")
                proceed = true;
            //Variable is set to true, we are permitted to continue
            }else if(varToCheck.val === true){
                proceed = true;
            //variable is set to false, we are not permitted to continue
            }else if(varToCheck.val === false){
                proceed = false;                
            //Somehow it can't evaluate. This should never happen but whatever
            }else{
                proceed = false;
            }
        }

        //If we cannot proceed, we add the textclosed text to the screen, otherwise we do as we please
        if(!proceed){this.pushText(lt.get('textClosed'));return false};
        this.pushText(lt.get('text'));
        console.log(this.state.currentMap);
        var destination = this.state.currentMap.get('map').find((element) => {
            return element.get('X') === lt.get('X') && element.get('Y') === lt.get('Y');})
        //We tried to move to a non-existing location
        if(typeof destination === 'undefined'){destination = this.implodeUniverse()}
        this.setState({
            currentMapTile: destination
        })
    }

    implodeUniverse = () => (
        fromJS({
            name: "none",
            entryPoint: false,
            description: ["You feel strange. All of sudden everything seems to be melting, your head starts to spin faster and faster. Your ears buzz and you think you can hear the screams of 100 billions souls crying out in agony.","Everything arround is spinning as if draining, yourself included.","You feel every single molecule of yours being destroyed.","All of sudden everything stops, there is nothing surrounded by nothing in nothing. Nothing arround you. Somehow amongst all of this nothingness there is you, you think.","From this nothing you hear a slow clap followed by a thunderous voice:","'Congratulations.'","'You destroyed my universe.'","Goddammit."],
            X: 100,
            Y: 100,
            leadsTo: []
        })
    )

    changeGameState = (st) =>{
        this.setState({
            gameMode:st
        })
    }

    pushText = (txt) => {
        console.log(txt);
    }
}