function addWordStudentsApi() {
  return "http://localhost:5000/api/add-student-to-word";
}

export function addWordStudents(wordStudents, user) {
  return dispatch => {
    return fetch(addWordStudentsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(wordStudents)
    });
  };
}