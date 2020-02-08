import { UserData, firebaseApp } from "./config";
import { unpairDuck } from "./user";
const database = firebaseApp.firestore();

export function makePayment(amount: number, userId: string): Promise<boolean> {
  const userDoc = database.collection("users").doc(userId);
  return userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData;
      if (data) {
        data.amountSpent += amount;
        return userDoc
          .set(data)
          .then(() => true)
          .catch(err => {
            console.log(err);
            return false;
          });
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}

export function nextWeek(userId: string): Promise<boolean> {
  const userDoc = database.collection("users").doc(userId);
  return userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData;
      if (data) {
        data.amountSpent = 0;
        data.weekNumber = (data.weekNumber + 1) % 4;
        return userDoc
          .set(data)
          .then(() => true)
          .catch(err => {
            console.log(err);
            return false;
          });
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}

export function resetUser(userId: string): Promise<boolean> {
  const userSettings: UserData = {
    userId,
    ducks: [],
    concentration: { work: 25, break: 5 },
    finance: { total: 0, week1: 0, week2: 0, week3: 0, week4: 0, weekly: 0 },
    amountSpent: 0,
    weekNumber: 1
  };
  const userDoc = database.collection("users").doc("userId");
  return userDoc
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        const ducks = data.ducks;
        return userDoc
          .set(userSettings)
          .then(() => {
            const duckDoc = database.collection("ducks").doc("DUCKS");
            return duckDoc
              .get()
              .then(value => {
                const data = value.data();
                if (data) {
                  for (const duck in ducks) {
                    data.ducks[duck] = "";
                  }
                  return duckDoc
                    .set(data)
                    .then(() => true)
                    .catch(err => {
                      console.log(err);
                      return false;
                    });
                } else {
                  return false;
                }
              })
              .catch(err => {
                console.log(err);
                return false;
              });
          })
          .catch(err => {
            console.log(err);
            return false;
          });
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}

export function unpairAllDucks(): Promise<boolean> {
  const duckDoc = database.collection("ducks").doc("DUCKS");
  return duckDoc
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        const ducks = data.ducks;
        const promises = [];
        for (const duck in ducks) {
          promises.push(unpairDuck(duck));
        }
        const finalPromise = Promise.all(promises);
        return finalPromise
          .then(values => {
            for (const bool in values) {
              if (!bool) {
                return false;
              }
            }
            return true;
          })
          .catch(() => false);
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}

function quack(duckId: string): Promise<boolean> {
  return database
    .collection("ducks")
    .doc("DUCKS")
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        if (data.ducks[duckId] !== undefined) {
          return database
            .collection("ducks")
            .doc(`${duckId}_quack`)
            .set({ quacking: true })
            .then(() => true)
            .catch(err => {
              console.log(err);
              return false;
            });
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}
