import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // fetch all notes
    const getnotes = async () => {
        const API_BASE_URL =
            process.env.NODE_ENV === "production"
                ? "https://note-box-backend.onrender.com"
                : "http://localhost:5002";
        const response = await fetch(
            `${API_BASE_URL}/api/notes/fetchallnotes`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            }
        );
        const json = await response.json();
        setNotes(json);
    };

    // add note
    const addNote = async (title, description, tag) => {
        console.log(localStorage.getItem("token"));
        
        const API_BASE_URL =
            process.env.NODE_ENV === "production"
                ? "https://note-box-backend.onrender.com"
                : "http://localhost:5002";
        const response = await fetch(`${API_BASE_URL}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(prev => [...prev, note]);
    };

    // edit note
    const editNote = async (id, title, description, tag) => {
        const API_BASE_URL =
            process.env.NODE_ENV === "production"
                ? "https://note-box-backend.onrender.com"
                : "http://localhost:5002";
        await fetch(`${API_BASE_URL}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // update UI without refetch
        let newnotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newnotes.length; index++) {
            if (newnotes[index]._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setNotes(newnotes);
    };

    // delete note
    const deleteNote = async (id) => {
        const API_BASE_URL =
            process.env.NODE_ENV === "production"
                ? "https://note-box-backend.onrender.com"
                : "http://localhost:5002";
        await fetch(`${API_BASE_URL}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });

        const newNote = notes.filter((note) => note._id !== id);
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
