import React from 'react';
import Hairlist from './HairList.json'

export default class Actor  {
    constructor(props) {
        this.GenerateAppearance();
    }

    actorAppearance = {
        haircolor: "",
        skincolor: "",
        hair: { front: [], side: [], back: [] },
        face: [],
        torso: [],
        legs: [],
        feet: []
    };

    playerStats = {
        name: "",
        profession: "",
        currentlyAt: "",
        placesPersonal: {
            live: "",
            work: "",
            study: ""
        },
        places: {
            eat: [],
            dine: [],
            lunch: [],
            fun: [],
            chores: []
        },
        placesHistory: [],
        goals: []
    }

    Place = (nm, cst) => {
        return (
            { name: "", cost: 0 }
        )
    }

    Goal = (nm, pr) => {
        return ({ name: "", priority: "" })
    }

    AskInitialQuestions = () => {
        //Basic, introduction for first time
        //Introduce self
        //What is your name?
        //What you do, or did, for work?
        //What does that involves?
        //Where are we right now?
        //What kind of place is this?

        //Check if the player has filled the other options
        //Where do you live?
        //Where do you work?
        //Where do you study?

        //Check if the player has added locations
        //Do you know any good places to eat?
        //What about lunch?
        //And dining?
        //Tell me about some places to have some fun
        //Are there any places you regularly go for chores?
    }

    GenerateAppearance = () => {
        var appearance = {
            haircolor: "",
            skincolor: "",
            hair: { front: [], side: [], back: [] },
            face: [],
            torso: [],
            legs: [],
            feet: []
        }
        appearance.hair.front.push(this.pickRandom(Hairlist.front));
        appearance.hair.side.push(this.pickRandom(Hairlist.side));
        appearance.hair.back.push(this.pickRandom(Hairlist.back));

        appearance.face.push("Two small cute curled horns decorate her forehead, partially covered by her hair");
        appearance.face.push("Her well defined brows sit atop her eyes");
        appearance.face.push("Her eyes are almond shaped with emerald-green irises");
        appearance.face.push("Her lips are velvet red, in color and texture");
        appearance.face.push("When she smiles you sometime cath a glimpse of her slightly sharpened canines, ivory white as her other teeth.");

        appearance.torso.push("Part of her $haircolor hair flows down her shoulder.");
        appearance.torso.push("She is wearing a sleeved kaki shirt.");
        appearance.torso.push("A beautifull light brown laced corset is worn on her lower torso");
        appearance.torso.push("She wears elbow long horse riding gloves");

        appearance.legs.push("Her legs are covered in dark-grey riding breeches");

        appearance.feet.push("She's wearing over-the-knee brown leather riding boots, sporting a short heel");

        this.actorAppearance = appearance;
        
    }

    pickRandom = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}