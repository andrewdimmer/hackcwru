import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import AudioPlayer from "react-h5-audio-player";
import { firebaseApp } from "../firebase/config";
declare interface QuackPageProps {}

const QuackPage: React.FunctionComponent<QuackPageProps> = () => {
  const duckIdURLTag = "?duckId=";
  const duckIdTagIndex = window.location.href.indexOf(duckIdURLTag);
  const duckId =
    duckIdTagIndex > 0
      ? window.location.href.substr(duckIdTagIndex + duckIdURLTag.length)
      : "";
  const [playing, setPlaying] = React.useState(false);
  const [foundDuck, setFoundDuck] = React.useState(false);
  const quacker = React.createRef<AudioPlayer>();

  firebaseApp
    .firestore()
    .collection("ducks")
    .doc(`${duckId}_quack`)
    .onSnapshot({
      next: snapshot => {
        const data = snapshot.data();
        if (data) {
          setFoundDuck(true);
          if (data.quacking) {
            setPlaying(true);
            quacker.current?.audio.play();
          } else {
            setPlaying(false);
          }
        } else {
          setFoundDuck(false);
        }
      },
      error: err => {
        console.log(err);
        setFoundDuck(false);
      }
    });

  function stopQuacking() {
    firebaseApp
      .firestore()
      .collection("ducks")
      .doc(`${duckId}_quack`)
      .update({ quacking: false });
  }

  return (
    <Fragment>
      <Typography variant="h1">Quack!</Typography>
      <Typography variant="body1">
        This page is just used to simulate a speaker playing a quacking noise.
      </Typography>
      {playing && (
        <Fragment>
          <Typography variant="h2">Now Quacking...</Typography>
          <AudioPlayer
            src="/assets/audio/quack.mp3"
            onEnded={() => stopQuacking()}
            ref={quacker}
          ></AudioPlayer>
        </Fragment>
      )}
      {!playing && <Typography variant="h2">Awaiting Quack...</Typography>}
      {!foundDuck && (
        <Fragment>
          <Typography variant="h2">
            Help! I haven't found my duck yet!
          </Typography>
          <Typography variant="body1">
            This may mean I'm still connecting to my duck, or the duck I am
            looking for doesn't exist. If I'm stuck here for a long time, please
            check to see if my duck is still alive!
          </Typography>
        </Fragment>
      )}
    </Fragment>
  );
};

export default QuackPage;
