import React, { Component } from "react";
import axios from "axios";

const AddStudentWord = (props) => {


  addStudentWord(event) {
    event.preventDefault();
    let newStudentWord = {
      fname: props.data[0].fname},
      lname: props.data[0].fname},
      word: this.wordInput.value
    };

    newStudentWord = JSON.stringify(newStudentWord);
    console.log(newStudentWord);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "http://localhost:5000/api/add-word-to-student",
        newStudentWord,
        config
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  
  return
  ( <div>
        <form>
        <label>
            Word:
            <input ref={wordInput => (this.wordInput = wordInput)} />
          </label>
          <input type="submit" />
        </form>
        </div> 
  )
  


export default AddStudentWord;
