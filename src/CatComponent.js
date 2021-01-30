import React from 'react';
import CatImagesComponent from './CatImagesComponent';

class CatComponent extends React.Component {

    state = {
        catBreeds: [],
        selectedBreedImages: [],
        selectedBreed: []
    };

    // Load from API the cat breed during initial page load
    componentDidMount() {
        // Make the request to get cat breed list
        fetch(
            `${process.env.REACT_APP_CAT_API_URL}?api_key=${process.env.REACT_APP_CAT_API_KEY}`
        ).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data);
            this.setState({ catBreeds: data })
        }).catch((error) => {
            alert(process.env.REACT_APP_API_ERROR_MESSAGE);
            console.log(error);
        });
    }

    // When there's a change in the value of the cat breed dropdown
    selectBreed = (evt) => {
        // Empty the array of images (clear results)
        if (evt.target.value == "") {
            this.setState({
                selectedBreedImages: [],
                selectedBreed: []
            });
            return;
        }
        console.log(this.state.catBreeds[evt.target.value]);
        // Wait for the state to be set before loading the images
        this.setState({ selectedBreed:  this.state.catBreeds[evt.target.value]} , () => {
            this.loadCatImages(10);
        })
    }

    loadCatImages = (limit) => {
        // Make the request to get cat images initially at 10
        fetch(
            `${process.env.REACT_APP_CAT_IMAGES_URL}?api_key=${process.env.REACT_APP_CAT_API_KEY}&breed_id=${this.state.selectedBreed.id}&limit=${limit}`
        ).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({ selectedBreedImages: data });
            console.log(this.state.selectedBreedImages);
        }).catch((error) => {
            alert(process.env.REACT_APP_API_ERROR_MESSAGE);
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <div>
                    <select onChange={this.selectBreed} className="form-control" name="cat-breed" id="cat-breed">
                        <option value="">Select a Breed</option>
                        {this.state.catBreeds.map((cat, index) => {
                            return <option key={cat.id} value={index}>{cat.name}</option>
                        })}
                    </select>
                    {typeof this.state.selectedBreed.name !== 'undefined' && this.state.selectedBreed.name.length > 0 &&
                        <h2>Breed: {this.state.selectedBreed.name}</h2>
                    }
                    <div className="cat-images">
                        {this.state.selectedBreedImages.map((img) => {
                            return <CatImagesComponent imageUrl={img.url} key={img.id} />
                        })}
                    </div>
                </div>
            </div >
        );
    }
}

export default CatComponent;