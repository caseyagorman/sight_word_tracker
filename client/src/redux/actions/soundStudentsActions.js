function addSoundStudentsApi() {
  return "http://localhost:5000/api/add-student-to-sound";
}

export function addSoundStudents(soundStudents, user) {
  return dispatch => {
    return fetch(addSoundStudentsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(soundStudents)
    });
  };
}
