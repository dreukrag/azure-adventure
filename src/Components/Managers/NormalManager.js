import React from 'react';

export default class NormalManager extends React.Component {
    mainPage = ({ rows: [], order: 0 });
    mainInventoryPage = ({ rows: { row1: [], row2: [], row3: [] }, order: 0 });
    currentPage = this.mainPage;
    render = () => (
        <div className="action-bar__main">
            <div className="action-bar__buttons">
                {this.mainPage.rows}
            </div>
        </div>
    )
    

    componentWillMount = () => {
        this.mainPage = this.makeMainPage(this.props.currentLocation);
        this.setCurrentPage(this.props.screenType)
        //this.mainInventoryPage = makeMainInventoryPage();        
    }
    componentWillUpdate = () => {
        this.mainPage = this.makeMainPage(this.props.currentLocation);
        this.setCurrentPage(this.props.screenType)
        //this.mainInventoryPage = makeMainInventoryPage();
    }
    setCurrentPage = (st) => {
        
        if (st == "normal") { this.currentPage = this.mainPage; }
        else if (st == "simpleDialogue") { this.currentPage = this.simpleDialoguePage; }
        else if (st == "sd") { }
    }

    Page = () => ({ rows:[] , order: 0 })

    dir = (src, lt) => {
        var vctr = { X: lt.X - src.X, Y: lt.Y - src.Y }
        var angle = Math.atan2(vctr.X, vctr.Y);
        switch (angle) {
            case 0 || 360:
                return "east"
            case 90:
                return "north"
            case 180:
                return "west"
            case 270:
                return "south"
            default:
                return null;
        }
    }
    dir = (lt) => (this.dir(this.props.currentLocation, lt))

    //current location, screen type
    //This method checks the type of screen that was requested and renders the proper controls
    disabledButton = (n) => (<button key={n} className="btn-disabled" />);
    moveToLocButton = (lt, n) => {
        console.log(typeof lt === "undefined")
        if (typeof lt === "undefined") { return this.disabledButton() }
        var a = (
            <button key={"botao"+n} onClick={(e) => { this.props.moveFunc(e, lt) }}>
                {lt.name}
            </button>
        )
        return a
    };
    AdvanceStateButton = (answr) => {
        if (typeof answr === 'undefined') { return this.disabledButton() }
        if (answr == "yes") {
            return (<button onClick={(e) => { this.props.advanceStateFunc(e, answr) }}>
                {"Yes"}
            </button>)
        } else if (answr == "no") {
            return (<button onClick={(e) => { this.props.advanceStateFunc(e, answr) }}>
                {"No"}
            </button>)
        } else if (answr == "next") {
            return (<button onClick={(e) => { this.props.advanceStateFunc(e, answr) }}>
                {"Next"}
            </button>)
        } else {
            return (<button onClick={(e) => { this.props.advanceStateFunc(e, "error") }}>
                {"Implode the universe"}
            </button>)
        }

    };
    makeMainPage = (cL) => {
        var thisPage = this.Page()
        var r1 = [];
        var r2 = [];
        var r3 = [];
        
        //1st row - placeholder
        for (var i = 0; i < 5; i++) {
            r1.push(this.disabledButton(i));
            //r1.push(<button>row1</button>);
        }
        //2nd row
        for (var i = 0; i < 5; i++) {
            if (i === 0) {
                r2.push(this.disabledButton(i));
            } else if (i === 1) {
                r2.push(
                    this.moveToLocButton(cL.leadsTo.find((element) => { return element.type === "north" }), i)
                )
            } else { r2.push(this.disabledButton(i)) }
        }
        //3rd row
        for (var i = 0; i < 5; i++) {
            if (i === 0) {
                r3.push(this.moveToLocButton(cL.leadsTo.find((element) => { return element.type === "west" }), i))
            } else if (i === 1) {
                r3.push(this.moveToLocButton(cL.leadsTo.find((element) => { return element.type === "south" }), i))
            } else if (i === 2) {
                r3.push(this.moveToLocButton(cL.leadsTo.find((element) => { return element.type === "east" }), i))
            } else { r3.push(this.disabledButton(i)) }
        }
        thisPage.rows.push(<div key="1" className="action-bar__row">{r1}</div>)
        thisPage.rows.push(<div key="2" className="action-bar__row">{r2}</div>)
        thisPage.rows.push(<div key="3" className="action-bar__row">{r3}</div>)
        
        return thisPage;
    }
    makeSimpleDialoguePage = (cL) => {
        var thisPage = this.Page();
        var r1 = [];
        var r2 = [];
        var r3 = [];
        for (var i = 0; i < 5; i++) {
            if (i == 0) { r1.push(this.AdvanceStateButton("yes")) }
            else if (i == 1) { r1.push(this.AdvanceStateButton("no")); }
            else { r1.push(this.disabledButton()) }
        }
        for (var i = 0; i < 5; i++) { r2.push(this.disabledButton()); }
        for (var i = 0; i < 5; i++) { r3.push(this.disabledButton()); }
        thisPage.rows.push(<div className="action-bar__row">{r1}</div>)
        thisPage.rows.push(<div className="action-bar__row">{r2}</div>)
        thisPage.rows.push(<div className="action-bar__row">{r3}</div>)
        return thisPage;
    }
    //cL = currentLocation
    //st = screen type, the game state, is it showing a location (normal), is it combat, or maybe dialogue (simple or complex)
    //dl = dialogue, when we want to display a dialogue
    buildOptionList = (cL, st, dl = null) => {
        var rtn = [];
        var OptLst1 = [];
        var OptLst2 = [];
        var OptLst3 = [];
        var pagesNumber;

        if (st === "normal") {
            //check cL objects and assign them to first row, if there are more then 5 the 5th btn is used to lead to another page
            if (cL.hasOwnProperty("objects")) {
                if (cL.objects.length() <= 5) { pagesNumber = 1; }
                else if (cL.objects.length() > 5) {
                    pagesNumber = 1;
                }
            }

            //1st row - placeholder
            for (var i = 0; i < 5; i++) {
                OptLst1.push(this.disabledButton());
            }
            //check cL leadsTo and set the buttons onClick funct to correctly display and lead to the apropriate place.
            //2nd row
            for (var i = 0; i < 5; i++) {
                var btn;
                if (i === 0) {
                    btn = this.disabledButton();
                } else if (i === 1) {
                    btn = this.moveToLocButton(cL.leadsTo.find((element) => { return element.type === "north" }));
                } else { btn = this.disabledButton() }
                OptLst2.push(btn);
                btn = null;

            }
            //3rd row
            for (var i = 0; i < 5; i++) {
                var btn;
                if (i === 0) {
                    btn = this.moveToLocButton(cL.leadsTo.find((element) => { return element.type === "west" }))
                } else if (i === 1) {
                    btn = this.moveToLocButton(cL.leadsTo.find((element) => { return element.type === "south" }));
                } else if (i === 2) {
                    btn = this.moveToLocButton(cL.leadsTo.find((element) => { return element.type === "east" }));
                } else { btn = this.disabledButton() }
                OptLst3.push(btn);
                btn = null;
            }

        } else if (st === "simpleDialogue") {
            for (var i = 0; i < 5; i++) {
                var btn;
                if (i == 0) { btn = this.AdvanceStateButton("yes"); }
                else if (i == 1) { btn = this.AdvanceStateButton("no"); }
                else { btn = this.disabledButton(); }
                OptLst1.push(btn);
                btn = null;
            }
            for (var i = 0; i < 5; i++) { OptLst2.push(this.disabledButton()); }
            for (var i = 0; i < 5; i++) { OptLst3.push(this.disabledButton()); }
        }

        //return the list once everything is done
        rtn.push(<div className="action-bar__row">{OptLst1}</div>)
        rtn.push(<div className="action-bar__row">{OptLst2}</div>)
        rtn.push(<div className="action-bar__row">{OptLst3}</div>)
        return rtn;

        // for (var i = 0; i < 5; i++) {
        //     var btn;
        //     btn = this.disabledButton()
        //     OptLst1.push(btn);
        //     btn = null;
        // }
    }
}