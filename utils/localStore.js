import * as SecureStore from "expo-secure-store";

export const getItem = async (key) => {
  try {
    return await SecureStore.getItemAsync(
      key
    );
  } catch (error) {
    console.error(
      "Error in getting item " + error
    );
  }
};

export const deleteItem = async (
  key
) => {
  try {
    await SecureStore.deleteItemAsync(
      key
    );
  } catch (error) {
    console.log(
      "Error in deleting item" + error
    );
  }
};

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
  try {
    await SecureStore.setItemAsync(
      key,
      value
    );
  } catch (error) {
    console.log(
      "Error in saving data to localstore" +
        error
    );
  }
}

export const getProfile = async () => {
  try {
    const name = await getItem("name");
    const rollNumber = await getItem(
      "roll_number"
    );
    const email = await getItem(
      "email"
    );
    const mobileNumber = await getItem(
      "mobile_number"
    );
    const roomNo = await getItem(
      "room_no"
    );
    const hostel = await getItem(
      "hostel"
    );
    const profile = {
      name: name,
      roll_no: rollNumber,
      email: email,
      mobile_number: mobileNumber,
      room_no: roomNo,
      hostel: hostel,
    };
    return profile;
  } catch (error) {}
};
