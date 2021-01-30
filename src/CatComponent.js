import React from 'react';
import CatImagesComponent from './CatImagesComponent';
import CatDetails from './CatDetails';

class CatComponent extends React.Component {

    state = {
        catBreeds: [],
        selectedBreedImages: [],
        selectedBreed: [],
        selectedImage: "",
        selectedCatIndex: -1,
        showDetails: false
    };

    // Changing the flag whether to show a list or show details
    // showDetails=false means list of cat images will be shown
    // showDetails=true means details of selected cat will be show
    // Also happens in CatImagesComponent
    changeShowDetails= (val) => {
        this.setState({showDetails: val});
    }

    // Change selectedImage
    // Happens in CatImagesComponent
    changeSelectedImage = (url) => {
        this.setState({selectedImage: url});
    }

    // Back button is clicked
    backButtonClicked = () => {
        this.changeShowDetails(false);
    }

    // Load more images button is clicked
    loadMoreImagesButtonClicked = () => {
        this.loadCatImages(100);
    }

    // Load from API the cat breed during initial page load
    componentDidMount() {
        // Make the request to get cat breed list
        fetch(
            `${process.env.REACT_APP_CAT_API_URL}?api_key=${process.env.REACT_APP_CAT_API_KEY}`
        ).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({ catBreeds: data })
        }).catch((error) => {
            alert(process.env.REACT_APP_API_ERROR_MESSAGE);
            console.log(error);
        });
    }

    // When there's a change in the value of the cat breed dropdown
    selectBreed = (evt) => {
        // Empty the array of images (clear results)
        if (evt.target.value === "") {
            this.setState({
                selectedBreedImages: [],
                selectedBreed: [],
                selectedCatIndex: -1
            });
            return;
        }
        // Wait for the state to be set before loading the images
        this.setState({ 
            selectedBreed: this.state.catBreeds[evt.target.value],
            selectedCatIndex: evt.target.value
        } , () => {
            this.loadCatImages(10);
        })
    }

    // Load cat images depending on the this.state.selectedBreed.id and limit
    loadCatImages = (limit) => {
        // Make the request to get cat images initially at 10
        fetch(
            `${process.env.REACT_APP_CAT_IMAGES_URL}?api_key=${process.env.REACT_APP_CAT_API_KEY}&breed_id=${this.state.selectedBreed.id}&limit=${limit}`
        ).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({ selectedBreedImages: data });
        }).catch((error) => {
            alert(process.env.REACT_APP_API_ERROR_MESSAGE);
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Cat Browser {this.state.test}</h1>
                {!this.state.showDetails &&
                    <div>
                        <select value={this.state.selectedCatIndex} onChange={this.selectBreed} className="form-control" name="cat-breed" id="cat-breed">
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
                                return <CatImagesComponent changeSelectedImage={this.changeSelectedImage} changeShowDetails={this.changeShowDetails} imageUrl={img.url} key={img.id} />
                            })}
                        </div>
                        {typeof this.state.selectedBreed.name !== 'undefined' && this.state.selectedBreed.name.length > 0 &&
                            <center>
                                <button className="btn btn-success" onClick={this.loadMoreImagesButtonClicked}>Load more</button>
                            </center>
                        }
                    </div>
                }
                {this.state.showDetails &&
                    <div>
                        <center>
                            <button className="btn btn-success" onClick={this.backButtonClicked}>Back</button>
                        </center>
                        <CatDetails catDetails={this.state.selectedBreed} selectedImage={this.state.selectedImage} />
                    </div>
                }
            </div >
        );
    }
}

export default CatComponent;