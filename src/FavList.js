import React from "react";
import firebase from "firebase";
import Button from "@material-ui/core/Button";

class FavList extends React.Component {
  db = firebase.firestore();
  state = {
    faves: []
  };

  deleteFavourite(id) {
    this.db
      .collection("faves")
      .doc(firebase.auth().currentUser.uid)
      .update({
        faveMoviesList: firebase.firestore.FieldValue.arrayRemove(id)
      })
      .then(() => this.fetchFavs());
  }

  fetchFavs() {
    return (
      this.db
        .collection("faves")
        // Replace with the logged in user Id
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(data => {
          const faves = data.get("faveMoviesList");
          this.setState({ faves });
        })
    );
  }

  componentDidMount() {
    this.fetchFavs();
  }
  render() {
    return (
      <div>
        <h1>Favorite Movies List </h1>
        {this.state.faves.map(faveMovieId => (
          <li key={faveMovieId}>
            {faveMovieId}
            <Button onClick={this.deleteFavourite.bind(this, faveMovieId)}>
              Delete
            </Button>
          </li>
        ))}
      </div>
    );
  }
}

export default FavList;
