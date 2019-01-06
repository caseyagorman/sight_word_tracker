function addLetterStudentsApi() {
  return "http://localhost:5000/api/add-student-to-letter";
}

export function addLetterStudents(letterStudents, user) {
  return dispatch => {
    return fetch(addLetterStudentsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(letterStudents)
    });
  };
}
