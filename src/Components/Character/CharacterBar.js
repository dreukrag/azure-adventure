import React from 'react';
import StatBar from './StatBar';

export default class CharacterBar extends React.Component {
    maxCore = 1;
    render = () => (
        <div className="character-bar__cont">
            <div className="character-bar__main">
                <p className="playerName">{this.props.plyChar.name}</p>
                <p>Combat Stats</p>
                <div className="character-bar__status">
                    <StatBar name="Health" value={35} valueMax={55} />
                    <StatBar name="Armor" value={5} valueMax={100} />
                    <StatBar name="Shield" value={15} valueMax={35} />
                </div>
                <p>Core Stats</p>
                <div className="character-bar__stats">
                    <StatBar name="Strength" value={this.props.plyChar.coreStats.strength} valueMax={this.maxCore} />
                    <StatBar name="Inteligence" value={this.props.plyChar.coreStats.inteligence} valueMax={this.maxCore} />
                    <StatBar name="Agility" value={this.props.plyChar.coreStats.agility} valueMax={this.maxCore} />
                    <StatBar name="Reflexes" value={this.props.plyChar.coreStats.reflexes} valueMax={this.maxCore} />
                </div>
            </div>
        </div>
    )
    componentWillMount = () => {
        this.maxCore = this.props.plyChar.level * 5;
    }
}