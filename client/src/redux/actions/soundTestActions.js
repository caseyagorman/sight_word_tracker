import history from "../../history";
function addSoundTestApi() {
  return "http://localhost:5000/api/create-student-sound-test";
}

export function addWordTest(result, user) {
  return dispatch => {
    return fetch(addSoundTestApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(result)
    }).then(() => history.push("/students"));
  };
}
