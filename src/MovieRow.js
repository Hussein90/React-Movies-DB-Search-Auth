import React from "react";
import firebase from "firebase";

class MovieRow extends React.Component {
  viewMovie() {
    // console.log("Trying to view movie")
    // console.log(this.props.movie.title)
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
    window.location.href = url;
  }

  saveFavourite(event) {
    console.log("saving fav" + event.target.name);

    // const db = firebase.firestore();
    // db.collection("users")
    //   .where("userid", "==", firebase.auth().currentUser.uid)
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       db.collection("users")
    //         .doc(doc.id)
    //         .add({
    //           movieId: event.target.name
    //         });
    //     });
    //   });
    // here send this id to a function which saves the favourite
    // pass this db save function as a prop from Search
    this.props.saveToFb(event.target.name);
  }

  render() {
    return (
      <table key={this.props.movie.id}>
        <tbody>
          <tr>
            <td>
              <img alt="poster" width="120" src={this.props.movie.poster_src} />
            </td>
            <td>
              <h3>{this.props.movie.title}</h3>
              <p>{this.props.movie.overview}</p>
              <input
                type="button"
                onClick={this.viewMovie.bind(this)}
                value="View"
              />
              <input
                type="button"
                onClick={this.saveFavourite.bind(this)}
                name={this.props.movie.title}
                id={this.props.movie.id}
                value="add to favourite"
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MovieRow;
