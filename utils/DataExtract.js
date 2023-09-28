export const getInfoFromCard = (
  text
) => {
  const matches = text.match(
    /([A-Z\s]+)\s(\d{2}[A-Z]{2}\d{4})/
  );
  if (matches) {
    const name = matches[1].trim();
    const rollNumber = matches[2];
    //TODO: Pass them onto a form to verify their profile information Please verify your data.
    // Extract email using regex
    const emailMatches = text.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63})/
    );
    let email = "",
      mobileNumber = "";
    if (emailMatches) {
      email = emailMatches[1];
    }
    // Extract mobile number using regex
    const mobileMatches =
      text.match(/\b\d{10}\b/);

    if (mobileMatches) {
      mobileNumber = mobileMatches[0];
    }
    const studentData = {
      name: name,
      roll_number: rollNumber,
      email: email,
      mobile_number: mobileNumber,
      last_location: "",
      total_library_time: 0,
      total_sac_time: 0,
    };
    return studentData;
  } else {
    alert("Card is not valid");
  }
};
