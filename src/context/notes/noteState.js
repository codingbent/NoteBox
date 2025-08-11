import { useEffect,useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial=[
  {
    "_id": "688fbdb39f907c9a20f9b115",
    "user": "688e59dd3b271600cebdb6ba",
    "title": "My title",
    "description": "My first note",
    "tag": "personal",
    "date": "2025-08-03T19:51:15.007Z",
    "__v": 0
  },
  {
    "_id": "688fbdb39f907c9a20f9b115",
    "user": "688e59dd3b271600cebdb6ba",
    "title": "My title2",
    "description": "My first note2",
    "tag": "personal",
    "date": "2025-08-03T19:51:15.007Z",
    "__v": 0
  },
  {
    "_id": "688fbdb39f907c9a20f9b115",
    "user": "688e59dd3b271600cebdb6ba",
    "title": "My title3",
    "description": "My first note3",
    "tag": "personal",
    "date": "2025-08-03T19:51:15.007Z",
    "__v": 0
  },
  {
    "_id": "688fbdb39f907c9a20f9b115",
    "user": "688e59dd3b271600cebdb6ba",
    "title": "My title4",
    "description": "My first note4",
    "tag": "personal",
    "date": "2025-08-03T19:51:15.007Z",
    "__v": 0
  }
]
const [notes,setNotes]=useState(notesInitial)
    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
