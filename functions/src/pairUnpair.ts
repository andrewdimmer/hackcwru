import * as functions from "firebase-functions";
import firebaseApp from "./firebaseConfig";
import { UserData } from "./databaseTypes";

export const pairDuck = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const requestBody = JSON.parse(request.body) as {
    duckId: string;
    userId: string;
  };
  const duckId = requestBody.duckId;
  const userId = requestBody.userId;
  const ducksDoc = firebaseApp
    .firestore()
    .collection("ducks")
    .doc("DUCKS");
  ducksDoc
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        const ducks = data.ducks as { [key: string]: string };
        if (!ducks[duckId]) {
          ducks[duckId] = userId;
          ducksDoc
            .set({ ducks })
            .then(() => {
              const userDoc = firebaseApp
                .firestore()
                .collection("users")
                .doc(userId);
              const userPromise = userDoc.get().then(duckValue => {
                const userData = duckValue.data() as UserData | undefined;
                if (userData) {
                  userData.ducks.push(duckId);
                  userDoc
                    .set(userData)
                    .then(() => {
                      console.log(userPromise);
                      response.status(200).send("Duck and User paired");
                    })
                    .catch(err => {
                      console.log(err);
                      response.status(500).send("Unable to pair duck and user");
                    });
                } else {
                  response.status(500).send("Unable to pair duck and user");
                }
              });
            })
            .catch(err => {
              console.log(err);
              response.status(500).send("Unable to pair duck and user");
            });
        } else {
          // Don't pair an already paired duck.
          response.status(500).send("Unable to pair duck and user");
        }
      } else {
        response.status(500).send("Unable to pair duck and user");
      }
    })
    .catch(err => {
      console.log(err);
      response.status(500).send("Unable to pair duck and user");
    });
});

export const unpairDuck = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const duckId = request.body;
  const ducksDoc = firebaseApp
    .firestore()
    .collection("ducks")
    .doc("DUCKS");
  ducksDoc
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        const ducks = data.ducks as { [key: string]: string };
        if (ducks[duckId]) {
          const userId = ducks[duckId];
          ducks[duckId] = "";
          ducksDoc
            .set({ ducks })
            .then(() => {
              const userDoc = firebaseApp
                .firestore()
                .collection("users")
                .doc(userId);
              const userPromise = userDoc.get().then(userValue => {
                const userData = userValue.data() as UserData | undefined;
                if (userData) {
                  const duckToRemove = userData.ducks.indexOf(duckId);
                  userData.ducks.splice(duckToRemove, 1);
                  userDoc
                    .set(userData)
                    .then(() => {
                      console.log(userPromise);
                      response.status(200).send("Duck and User unpaired");
                    })
                    .catch(err => {
                      console.log(err);
                      response
                        .status(500)
                        .send("Unable to unpair duck and user");
                    });
                } else {
                  response.status(500).send("Unable to unpair duck and user");
                }
              });
            })
            .catch(err => {
              console.log(err);
              response.status(500).send("Unable to unpair duck and user");
            });
        } else {
          // Don't unpair an unpaired duck.
          response.status(500).send("Unable to unpair duck and user");
        }
      } else {
        response.status(500).send("Unable to unpair duck and user");
      }
    })
    .catch(err => {
      console.log(err);
      response.status(500).send("Unable to unpair duck and user");
    });
});

export const unpairAllDucks = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
});
