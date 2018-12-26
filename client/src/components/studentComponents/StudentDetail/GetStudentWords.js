turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let wordList = [];
    for (let key in obj) {
      let wordObj = obj[key];
      wordList.push(wordObj.word);
    }
    return wordList;
  }
  getWords(words) {
    if (!words) {
      return <p> Loading... </p>;
    }
    let wordList = this.turnIntoArray(words);
    return wordList;
  }