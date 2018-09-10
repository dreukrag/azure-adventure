import React from 'react';

export default class GameWorld extends React.Component {
    render = () => (
        <div className="game-world__main">
            {this.props.currentLocation.get('description').map(
                (arrMbr) => (<p>{arrMbr}</p>)
            )}
        </div>
    )

    componentWillMount = () =>{
    }


}