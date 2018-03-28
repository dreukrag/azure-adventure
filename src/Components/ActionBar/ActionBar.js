import React from 'react';
import Button from './Button';
export default class ActionBar extends React.Component {
    mainPage = ({ rows: [], order: 0 });
    mainInventoryPage = ({ rows: { row1: [], row2: [], row3: [] }, order: 0 });
    currentPage = this.mainPage;
    render = () => (
        <div className="action-bar__main">
            <div className="action-bar__buttons">
                {this.buildOptionList(this.props.currentLocation, this.props.gameMode, this.props.interactionInfo, this.props.combatInfo)}
            </div>
        </div>
    )
    //current location, screen type
    //This method checks the type of screen that was requested and renders the proper controls
    disabledButton = (n) => (<button key={n} className="btn-disabled" />);
    backButton =()=>(<button key={4} onClick={(e) => { this.buildOptionList(this.props.currentLocation, this.props.gameMode, this.props.interactionInfo, this.props.combatInfo) }}>Back</button>)
    moveToLocButton = (lt, n) => {
        if (typeof lt === "undefined") { return this.disabledButton(n) }
        var a = (
            <button key={n} onClick={(e) => { this.props.moveFunc(e, lt) }}>
                {lt.name}
            </button>
        )
        return a
    };
    inventoryButton = () => (
        <Button />
    )
    //cL = currentLocation
    //st = screen type, the game state, is it showing a location (normal), is it combat, or maybe dialogue (simple or complex)
    //dl = dialogue, when we want to display a dialogue

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
        console.log(this.totalEntities(this.props.currentLocation));
        return rows
    }

    totalEntities = (local =this.props.currentLocation) => {
        if(local==null || local == undefined){return null}
        var totalCount = 0;
        totalCount += local.leadsTo? local.leadsTo.length:0;
        totalCount += local.objects? local.objects.length:0;
        
        return totalCount;        
    }

    //The default button set is the movement + inventory + actions
    buildButtons = (thingToBecomeButtons = [[]], type = "") => {
        var list = new Array();
        //TO-DO:Typechecking?
        //TO-DO:Maybe use normal for, to keep track of index and find the position desired
        thingToBecomeButtons.forEach((ttbb,index) => {
                //TO-DO:Make a button matching whater ttbb is
                //TO-DO:Add button to the action bar
                list.push(<Button objectToRepresent = {ttbb[0]} key={ttbb[1]}/>)
        });

    };

    buildOptionList = (cL, st, interaction = null, combat = null) => {
        var pagesNumber;
        var freePositions;
        //Builds a row full of disabled buttons
        var mainRow = this.buildEmptyActionBar()
        //Now what should we render?
        //(st === ?)

        //Normal game movement stuff and interacting
        if (st === "normal") {
            //0,4 -> inventory button
            //1,0 to 1,2 -> up, north, down
            //2,0 to 2,2 -> west, south, east
            if (cL.objects && cL.objects.length != 0) {
                console.log("found!")
                //pagesNumber = Math.ceil(cL.objects.length / 8);
                let currObj = 0;
                freePositions = [[0, 1, 2, 3], [3, 4], [3, 4]];
                freePositions.forEach((val,index)=>{
                    val.forEach((vl,indx)=>{
                        if(currObj>=cL.objects.length){return};                        
                        console.log("Found object at " + index + " " + vl);
                        mainRow[index].props.children[vl]=<Button objectToRepresent={cL.objects[currObj]}  clickFunction={(e,key)=>{this.props.interactionFunc(e,key)}}/>;
                        currObj++;
                    })
                })
            }
            //First we grab the buttons for movement
            mainRow[1].props.children[0] = this.moveToLocButton(cL.leadsTo.find((element) => { return element.movementType === "up" }))
            mainRow[1].props.children[1] = this.moveToLocButton(cL.leadsTo.find((element) => { return element.movementType === "north" }))
            mainRow[1].props.children[2] = this.moveToLocButton(cL.leadsTo.find((element) => { return element.movementType === "down" }))
            mainRow[2].props.children[0] = this.moveToLocButton(cL.leadsTo.find((element) => { return element.movementType === "west" }))
            mainRow[2].props.children[1] = this.moveToLocButton(cL.leadsTo.find((element) => { return element.movementType === "south" }))
            mainRow[2].props.children[2] = this.moveToLocButton(cL.leadsTo.find((element) => { return element.movementType === "east" }))

            mainRow[0].props.children[4] = this.inventoryButton();  //Inventory
            mainRow[1].props.children[4] = this.inventoryButton();  //Rest
            
        } else if (st === "interact") {
            
        } else if (st === "combat") { }

        //return the list once everything is done
        return mainRow;
    }
}