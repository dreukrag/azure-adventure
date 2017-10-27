import React from 'react';

export default class CharacterBar extends React.Component {

    render = () => (
        <div className="character-bar__cont">
            <div className="character-bar__main">
                <span>Strength</span>
                <span>Intelligence</span>
                <span>Willpower</span>
                <span>Wisdon</span>
                <span>Agility</span>
                <span>Endurance</span>
                <span>Dextrety</span>
            </div>
        </div>
    )
}