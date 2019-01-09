import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import "../../static/WordStyle.css";
import DeleteWord from "../WordComponents/Forms/DeleteWord";
// Display table head of words words are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

const WordsTableComponent = (words, onSort, token) => (
  <div className="word-table">
    <Table bordered hover>
      <thead>
        <tr>
          <th onClick={e => onSort(e, "word")}>word</th>
          <th onClick={e => onSort(e, "count")}>Learned</th>
          <th onClick={e => onSort(e, "unlearned_count")}>Unlearned</th>
        </tr>
      </thead>
      <tbody>
        {words.map(function(word) {
          return (
            <tr>
              <td>
                <Link to={`/word-detail/${word.word_id}`} className="link">
                  <h2 id="word-name-table-header">{word.word}</h2>
                </Link>
                <DeleteWord token={token} wordAlt={word} />
              </td>
              <td>
                <ul style={noBulletList}>{word.students.map(listElements)}</ul>
              </td>
              <td>
                <ul style={noBulletList}>
                  {word.unlearned_students.map(listElements)}
                </ul>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colspan="8">
            <a href="/add-word" className="link">
              + Click to add new word
            </a>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default WordsTableComponent;
