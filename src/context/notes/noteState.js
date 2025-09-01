import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
const host = "http://notebox-env.eba-2zkqs3ih.ap-south-1.elasticbeanstalk.com";

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    const getnotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        //console.log(json);
        setNotes(json);
    };
    const addNote = async (title, description, tag) => {
        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    const editNote = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();

        let newnotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setNotes(newnotes);
    };
    const deleteNote = async (id) => {
        //console.log("Deleting the note", id);
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();

        const newNote = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNote);
    };
    return (
        <noteContext.Provider
            value={{ notes, addNote, editNote, deleteNote, getnotes }}
        >
            {props.children}
        </noteContext.Provider>
    );
};
export default NoteState;
