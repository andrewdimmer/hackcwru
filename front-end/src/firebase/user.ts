import {
  FinanceSettings,
  ConcentrationSettings,
  UserData,
  firebaseApp
} from "./config";
const database = firebaseApp.firestore();

export function listUnpairedDucks(): Promise<string[]> {
  return database
    .collection("ducks")
    .doc("DUCKS")
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        const ducks = data.ducks as { [key: string]: string };
        const availableDucks = [];
        for (const duck in ducks) {
          if (!ducks[duck]) {
            availableDucks.push(duck);
          }
        }
        return availableDucks;
      } else {
        return [];
      }
    })
    .catch(err => {
      console.log(err);
      return [];
    });
}

export function pairDuck(duckId: string, userId: string): Promise<boolean> {
  const ducksDoc = database.collection("ducks").doc("DUCKS");
  return ducksDoc
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        const ducks = data.ducks as { [key: string]: string };
        if (!ducks[duckId]) {
          ducks[duckId] = userId;
          return ducksDoc
            .update(ducks)
            .then(() => {
              const userDoc = database.collection("users").doc(userId);
              return userDoc.get().then(value => {
                const data = value.data() as UserData | undefined;
                if (data) {
                  data.ducks.push(duckId);
                  return userDoc
                    .update(data)
                    .then(() => true)
                    .catch(err => {
                      console.log(err);
                      return false;
                    });
                } else {
                  return false;
                }
              });
            })
            .catch(err => {
              console.log(err);
              return false;
            });
        } else {
          // Don't pair an already paired duck.
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

export function unpairDuck(duckId: string): Promise<boolean> {
  const ducksDoc = database.collection("ducks").doc("DUCKS");
  return ducksDoc
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        const ducks = data.ducks as { [key: string]: string };
        if (ducks[duckId]) {
          const userId = ducks[duckId];
          ducks[duckId] = "";
          return ducksDoc
            .update(ducks)
            .then(() => {
              const userDoc = database.collection("users").doc(userId);
              return userDoc.get().then(value => {
                const data = value.data() as UserData | undefined;
                if (data) {
                  const duckToRemove = data.ducks.indexOf(duckId);
                  data.ducks.splice(duckToRemove, 1);
                  return userDoc
                    .update(data)
                    .then(() => true)
                    .catch(err => {
                      console.log(err);
                      return false;
                    });
                } else {
                  return false;
                }
              });
            })
            .catch(err => {
              console.log(err);
              return false;
            });
        } else {
          // Don't unpair an unpaired duck.
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

export function updateConcentrationMode(
  settings: ConcentrationSettings,
  userId: string
): Promise<boolean> {
  const userDoc = database.collection("users").doc(userId);
  return userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData | undefined;
      if (data) {
        data.concentration = settings;
        return userDoc
          .update(data)
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

export function updateFinanceMode(
  settings: FinanceSettings,
  userId: string
): Promise<boolean> {
  const userDoc = database.collection("users").doc(userId);
  return userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData | undefined;
      if (data) {
        data.finance = settings;
        return userDoc
          .update(data)
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

export function getCreateUser(userId: string): Promise<UserData | null> {
  const userDoc = database.collection("users").doc(userId);
  return userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData | undefined;
      if (data) {
        return data;
      } else {
        const userSettings: UserData = {
          userId,
          ducks: [],
          concentration: { work: 25, break: 5 },
          finance: {
            total: 0,
            week1: 0,
            week2: 0,
            week3: 0,
            week4: 0,
            weekly: 0
          },
          amountSpent: 0,
          weekNumber: 1
        };
        return userDoc
          .update(userSettings)
          .then(() => userSettings)
          .catch(err => {
            console.log(err);
            return null;
          });
      }
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
