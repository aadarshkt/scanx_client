import * as SecureStore from "expo-secure-store";

export async function getValueFor(
  key,
  setValue
) {
  let result =
    await SecureStore.getItemAsync(key);
  if (result) {
    setValue(result);
  } else {
    setValue("");
  }
}

export async function save(key, value) {
  await SecureStore.setItemAsync(
    key,
    value
  );
}
