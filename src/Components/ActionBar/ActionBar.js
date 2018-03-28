import React from 'react';
import Button from './Button';
export default class ActionBar extends React.Component {

    render = () => (
        <div className="action-bar__main">
            <div className="action-bar__buttons">
                {this.buildOptionList(this.props.currentLocation, this.props.gameMode, this.props.interactionInfo, this.props.combatInfo)}
            </div>
        </div>
    )
    //current location, screen type
    //This method checks the type of screen that was requested and renders the proper controls
    disabledButton = (n) => <button key={n} className="btn-disabled" />;
    backButton =()=><button key={4} onClick={(e) => { this.props.stateFunc("normal") }}>Back</button>
    moveToLocButton = (lt, n) => {
        if (typeof lt === "undefined") { return this.disabledButton(n) }
        var a = (
            <button key={n} onClick={(e) => { this.props.moveFunc(e, lt) }}>
                {lt.name}
            </button>
        )
        return a
    };
    inventoryButton = () => <button key={4} onClick={(e) => { this.props.stateFunc("inventory") }}>Inventory</button>
    buildEmptyActionBar = () => {
        var rows = [];
        for (var o = 0; o < 3; o++) {
            var row = []
            for (var i = 0; i < 5; i++) {
                if( 0==2 && i==4){
                    row.push(this.backButton(i));
                }else{
                    row.push(this.disabledButton(i));                    
                }
            }
            rows.push(<div key={o} className="action-bar__row">{row}</div>);
        }
        return rows
    }

    //The default button set is the movement + inventory + actions
    AssignButtons = (thingsToBecomeButtons:[{obj:{}, position:[]}], RowToAssignTo, insertDefaults="normal") => {
        if(RowToAssignTo == undefined)return;
        var currRow = 0;
        var freePositionsInteract = [[0, 1, 2, 3], [3, 4], [3, 4]];
        var freePositionsInventory = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3]];
        
        thingsToBecomeButtons.forEach((ttbb) => {
                switch(ttbb.obj.type){
                    case "movement":
                        RowToAssignTo[ttbb.position[0]].props.children[ttbb.position[1]] = this.moveToLocButton(ttbb.obj, ttbb.position[1]);
                        break;
                    case "interaction":
                        if(freePositionsInteract[0].length == 0)currRow++;
                        RowToAssignTo[currRow].props.children[freePositionsInteract[0].shift()] = 
                        <Button objectToRepresent={ttbb.obj}  clickFunction={(e,key)=>{this.props.interactionFunc(e,key)}}/>;
                    break;
                    case "item":
                        if(freePositionsInventory[0].length == 0)currRow++;
                        RowToAssignTo[currRow].props.children[freePositionsInventory[0].shift()] = 
                        <Button objectToRepresent={ttbb.obj}  clickFunction={(e,key)=>{this.props.interactionFunc(e,key)}}/>;
                    break;
                }
        });
        if(insertDefaults!=false){
            switch (insertDefaults){
                case "inventory":
                    RowToAssignTo[2].props.children[4] = this.backButton();
                break;
                case "normal":
                    RowToAssignTo[0].props.children[4] = this.inventoryButton();                
                break;
            }
        }
    };

    BasePage = (cL) =>{
        var buttonsToBeRendered = [];

        cL.leadsTo.find((element) => { if( element.movementType === "up"){
            buttonsToBeRendered.push({obj:element,position:[1,0],type:"up"}) }})
        cL.leadsTo.find((element) => { if( element.movementType === "north"){
            buttonsToBeRendered.push({obj:element,position:[1,1],type:"north"}) }})
        cL.leadsTo.find((element) => { if( element.movementType === "down"){
            buttonsToBeRendered.push({obj:element,position:[1,2],type:"down"}) }})
        cL.leadsTo.find((element) => { if( element.movementType === "west"){
            buttonsToBeRendered.push({obj:element,position:[2,0],type:"west"}) }})
        cL.leadsTo.find((element) => { if( element.movementType === "south"){
            buttonsToBeRendered.push({obj:element,position:[2,1],type:"south"}) }})
        cL.leadsTo.find((element) => { if( element.movementType === "east"){
            buttonsToBeRendered.push({obj:element,position:[2,2],type:"east"}) }})
        if(cL.objects) buttonsToBeRendered=buttonsToBeRendered.concat(cL.objects.map( x => ({obj:x, position:[]})));
        return buttonsToBeRendered;
    }

    buildOptionList = (cL, st= null, interaction = null, combat = null) => {
        var pagesNumber;
        var freePositionsInteract;
        //Builds a row full of disabled buttons
        var mainRow = this.buildEmptyActionBar()
        //Default page in case something goes wrong, this is to be the 'root'
        var backupPage = this.BasePage(cL);

        //render the default page at the start, other conditionals to follow
        if(st=="normal" || st==null){
            this.AssignButtons(this.BasePage(cL), mainRow);            
        }else if(st=="inventory"){
            var crapToRender = this.props.playerInfo.inventory.map( x => ({obj:x, position:[]}))
            this.AssignButtons(crapToRender, mainRow, "inventory");                        
        }else{
            console.log("Couldn't determine what to render on the action bar!")
            this.AssignButtons(this.BasePage(cL), mainRow);                        
        }
        return mainRow;
    }
}