import * as functions from "firebase-functions";
import firebaseApp from "./firebaseConfig";
import { UserData, defaultUser } from "./databaseTypes";

export const getCreateUser = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const userId = request.body;
  const userDoc = firebaseApp
    .firestore()
    .collection("users")
    .doc(userId);
  userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData | undefined;
      if (data) {
        response.status(200).send(JSON.stringify(data));
      } else {
        const userSettings = defaultUser(userId);
        userDoc
          .set(userSettings)
          .then(() => {
            response.status(200).send(JSON.stringify(userSettings));
          })
          .catch(err => {
            console.log(err);
            response.status(200).send("Unable to get or create user");
          });
      }
    })
    .catch(err => {
      console.log(err);
      return null;
    });
});

export const makePayment = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const requestBody = JSON.parse(request.body) as {
    userId: string;
    amount: number;
  };
  const userId = requestBody.userId;
  const amount = requestBody.amount;
  const userDoc = firebaseApp
    .firestore()
    .collection("users")
    .doc(userId);
  userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData;
      if (data) {
        data.amountSpent += amount;
        userDoc
          .set(data)
          .then(() => {
            response.status(200).send("User Updated Sucessfully");
          })
          .catch(err => {
            console.log(err);
            response.status(500).send("Unable to Update User");
          });
      } else {
        response.status(500).send("Unable to Update User");
      }
    })
    .catch(err => {
      console.log(err);
      response.status(500).send("Unable to Update User");
    });
});

export const nextWeek = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const userId = request.body;
  const userDoc = firebaseApp
    .firestore()
    .collection("users")
    .doc(userId);
  userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData;
      if (data) {
        data.amountSpent = 0;
        data.weekNumber = (data.weekNumber + 1) % 4;
        userDoc
          .set(data)
          .then(() => {
            response.status(200).send("User Updated Successfully");
          })
          .catch(err => {
            console.log(err);
            response.status(500).send("Unable to Update User");
          });
      } else {
        response.status(500).send("Unable to Update User");
      }
    })
    .catch(err => {
      console.log(err);
      response.status(500).send("Unable to Update User");
    });
});

export const resetUser = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const userId = request.body;
  const userDoc = firebaseApp
    .firestore()
    .collection("users")
    .doc("userId");
  userDoc
    .get()
    .then(userValue => {
      const userData = userValue.data() as UserData | null;
      if (userData) {
        const ducks = userData.ducks;
        userDoc
          .set(defaultUser(userId))
          .then(() => {
            const duckDoc = firebaseApp
              .firestore()
              .collection("ducks")
              .doc("DUCKS");
            const duckPromise = duckDoc
              .get()
              .then(duckValue => {
                const duckData = duckValue.data();
                if (duckData) {
                  for (const duck of ducks) {
                    duckData.ducks[duck] = "";
                  }
                  duckDoc
                    .set(duckData)
                    .then(() => {
                      console.log(duckPromise);
                      response.status(200).send("User Successfully Reset");
                    })
                    .catch(err => {
                      console.log(err);
                      response.status(500).send("Unable to Reset User");
                    });
                } else {
                  response.status(500).send("Unable to Reset User");
                }
              })
              .catch(err => {
                console.log(err);
                response.status(500).send("Unable to Reset User");
              });
          })
          .catch(err => {
            console.log(err);
            response.status(500).send("Unable to Reset User");
          });
      } else {
        response.status(500).send("Unable to Reset User");
      }
    })
    .catch(err => {
      console.log(err);
      response.status(500).send("Unable to Reset User");
    });
});
