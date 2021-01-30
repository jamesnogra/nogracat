import React from 'react';

class CatComponent extends React.Component {

    render() {
        return (
            <div className="each-cat-image">
                <img className="fill-cat-image" src={this.props.imageUrl} />
            </div >
        );
    }
}

export default CatComponent;