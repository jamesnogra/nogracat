import React from 'react';

class CatDetails extends React.Component {

    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={this.props.selectedImage} alt={this.props.catDetails.name}></img>
                <div className="card-body">
                    <h3>{this.props.catDetails.name}</h3>
                    <h5>Origin: {this.props.catDetails.origin}</h5>
                    <h5>Temperament: {this.props.catDetails.temperament}</h5>
                    <p>{this.props.catDetails.description}</p>
                </div>
            </div >
        );
    }
}

export default CatDetails;