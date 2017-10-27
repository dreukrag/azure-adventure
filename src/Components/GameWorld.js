import React from 'react';

export default class GameWorld extends React.Component {
    render = () => (
        <div className="game-world__main">
            <p>
                {this.props.currentLocation.description.map(
                    (arrMbr)=>(<p>{arrMbr}</p>)
                )}
            </p>
        </div>
    )


}