import * as functions from "firebase-functions";
import firebaseApp from "./firebaseConfig";
import {
  UserData,
  FinanceSettings,
  ConcentrationSettings
} from "./databaseTypes";

export const updateConcentrationMode = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const requestBody = JSON.parse(request.body) as {
      settings: ConcentrationSettings;
      userId: string;
    };
    const settings = requestBody.settings;
    const userId = requestBody.userId;
    const userDoc = firebaseApp
      .firestore()
      .collection("users")
      .doc(userId);
    userDoc
      .get()
      .then(value => {
        const data = value.data() as UserData | undefined;
        if (data) {
          data.concentration = settings;
          userDoc
            .set(data)
            .then(() =>
              response.status(200).send("Updated Concentration Mode Settings")
            )
            .catch(err => {
              console.log(err);
              response
                .status(500)
                .send("Unable to update Concentration Mode Settings");
            });
        } else {
          response
            .status(500)
            .send("Unable to update Concentration Mode Settings");
        }
      })
      .catch(err => {
        console.log(err);
        response
          .status(500)
          .send("Unable to update Concentration Mode Settings");
      });
  }
);

export const updateFinanceMode = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const requestBody = JSON.parse(request.body) as {
      settings: FinanceSettings;
      userId: string;
    };
    const settings = requestBody.settings;
    const userId = requestBody.userId;
    const userDoc = firebaseApp
      .firestore()
      .collection("users")
      .doc(userId);
    userDoc
      .get()
      .then(value => {
        const data = value.data() as UserData | undefined;
        if (data) {
          data.finance = settings;
          userDoc
            .set(data)
            .then(() =>
              response.status(200).send("Updated Finance Mode Settings")
            )
            .catch(err => {
              console.log(err);
              response
                .status(500)
                .send("Unable to update Finance Mode Settings");
            });
        } else {
          response.status(500).send("Unable to update Finance Mode Settings");
        }
      })
      .catch(err => {
        console.log(err);
        response.status(500).send("Unable to update Finance Mode Settings");
      });
  }
);

export const duckQuack = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const duckId = request.body;
  firebaseApp
    .firestore()
    .collection("ducks")
    .doc("DUCKS")
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        if (data.ducks[duckId] !== undefined) {
          firebaseApp
            .firestore()
            .collection("ducks")
            .doc(`${duckId}_quack`)
            .set({ quacking: true })
            .then(() => {
              response.status(200).send("Quacking!");
            })
            .catch(err => {
              console.log(err);
              response.status(500).send("Unable to get duck to quack");
            });
        } else {
          response.status(500).send("Unable to get duck to quack");
        }
      } else {
        response.status(500).send("Unable to get duck to quack");
      }
    })
    .catch(err => {
      console.log(err);
      response.status(500).send("Unable to get duck to quack");
    });
});
