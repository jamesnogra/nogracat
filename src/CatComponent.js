import React from 'react';
import CatImagesComponent from './CatImagesComponent';

class CatComponent extends React.Component {

    state = {
        catBreeds: [],
        selectedBreed: ""
    };

    componentDidMount() {
        const catBreedApiUrl = process.env.REACT_APP_CAT_API_URL;
        const catBreedApiKey = process.env.REACT_APP_CAT_API_KEY;

        // Make the request
        fetch(catBreedApiUrl,
            { 'api_key': catBreedApiKey }
        ).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({ catBreeds: data })
            console.log(this.state.catBreeds);
        }).catch((error) => {
            alert('Apologies but we could not load new cats for you at this time! Miau!');
            console.log(error);
        });
    }

    selectBreed = (evt) => {
        this.setState({ selectedBreed: evt.target.value })
    }

    render() {
        return (
            <div>
                <div>
                    <select onChange={this.selectBreed} className="form-control" name="cat-breed" id="cat-breed">
                        <option value="">Select a Breed</option>
                        {this.state.catBreeds.map((cat) => {
                            return <option key={cat.id} value={cat.id}>{cat.name}</option>
                        })}
                    </select>
                </div>
            </div >
        );
    }
}

export default CatComponent;