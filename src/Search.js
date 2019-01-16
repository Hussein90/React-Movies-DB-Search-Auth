import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import MovieRow from "./MovieRow.js";
import axios from "axios";
import green_app_icon from "./green_app_icon.svg";
import { Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faves: []
    };
    // console.log("This is my initializer")

    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    //    title: "Avengers: Infinity War", overview: "As the Avengers and their allies have continued to protect the world from threats too large"},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
    //    title: "  The Avengers", overview: "This is my second overview"},
    // ]

    // var movieRows = []
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie} />
    //   movieRows.push(movieRow)
    // })

    // this.state = {rows: movieRows}
    this.saveFaveToFirebase = this.saveFaveToFirebase.bind(this);

    this.performSearch("ant man");
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb");
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" +
      searchTerm;
    axios
      .get(urlString)
      .then(res => {
        const results = res.data.results;
        console.log(results);
        var movieRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          // console.log(movie.poster_path)
          const movieRow = (
            <MovieRow
              key={movie.id}
              movie={movie}
              saveToFb={this.saveFaveToFirebase}
            />
          );
          movieRows.push(movieRow);
        });

        this.setState({ rows: movieRows });
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }

  //   savefirebase() {
  // THIS FUNC SAVES TO FIREBASE. USE IS AS A BASIC TEMPLATE
  //     let someJson = { test : 1, some : "data" };

  //     var bookRef = firebase.database().ref('test');

  //     bookRef.set(someJson)

  //   }

  getFaveFromFirebase(movieId) {
    let faveJson = {
      userId: firebase.auth().currentUser.uid,
      movieId: movieId
    };
    console.log(faveJson);

    const db = firebase.firestore();

    const faveMovies = this.state.faves.concat(movieId);
    // Add a new document in collection "faves"
    db.collection("faves")
      .doc(firebase.auth().currentUser.uid)
      .set({
        faveMoviesList: faveMovies
      });
    this.setState({ faves: faveMovies });
  }

  saveFaveToFirebase(movieId) {
    const db = firebase.firestore();
    db.collection("faves")
      .doc(firebase.auth().currentUser.uid)
      .update({
        faveMoviesList: firebase.firestore.FieldValue.arrayUnion(movieId)
      });
  }

  render() {
    const styles = makeStyles(theme => ({
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
      }
    }));
    //  const classes = useStyles();
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="green_app_icon" width="50" src={green_app_icon} />
              </td>
              <td width="8" />
              <td>
                <h1>MoviesDB Search</h1>
              </td>
              <td>
                <Button>MoviesDB Search</Button>
              </td>
              <td>
                <Button component={Link} to="/favlist">
                  FavList
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Enter search term"
        />
        <div style={{ height: 300, overflowY: "scroll", marginTop: "1em" }}>
          {this.state.rows}
        </div>
      </div>
    );
  }
}

export default Search;
