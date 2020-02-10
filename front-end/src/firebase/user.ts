import ky from "ky";
import { ConcentrationSettings, FinanceSettings, UserData } from "./config";

export function pairDuck(duckId: string, userId: string): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/pair_duck",
      { body: JSON.stringify({ duckId, userId }) }
    )
    .then(() => true)
    .catch(() => false);
}

export function unpairDuck(duckId: string): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/unpair_duck",
      { body: duckId }
    )
    .then(() => true)
    .catch(() => false);
}

export function updateConcentrationMode(
  settings: ConcentrationSettings,
  userId: string
): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/update_concentration_mode",
      { body: JSON.stringify({ settings, userId }) }
    )
    .then(() => true)
    .catch(() => false);
}

export function updateFinanceMode(
  settings: FinanceSettings,
  userId: string
): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/update_finance_mode",
      { body: JSON.stringify({ settings, userId }) }
    )
    .then(() => true)
    .catch(() => false);
}

export function getCreateUser(userId: string): Promise<UserData | null> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/get_create_user",
      { body: userId }
    )
    .then(value => {
      return value
        .text()
        .then(string => JSON.parse(string))
        .catch(err => {
          console.log(err);
          return null;
        });
    })
    .catch(() => null);
}
