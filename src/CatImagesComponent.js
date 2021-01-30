import React from 'react';

class CatComponent extends React.Component {

    // When View Details button is clicked
    viewDetails = (image_url) => {
        // Change the selected image of CatComponent
        this.props.changeSelectedImage(image_url);
        // Set the viewer to show details mode
        this.props.changeShowDetails(true);
    }

    render() {
        return (
            <div className="each-cat-image">
                <img className="fill-cat-image" src={this.props.imageUrl} alt={this.props.imageUrl} />
                <center>
                    <button onClick={() => this.viewDetails(this.props.imageUrl)} className="btn btn-primary">View details</button>
                </center>
            </div >
        );
    }
}

export default CatComponent;