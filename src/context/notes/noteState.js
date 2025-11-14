import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([]);

    // Correct environment detection for Vite
    const API_BASE_URL =
        import.meta.env.MODE === "production"
            ? "https://note-box-backend.onrender.com"
            : "http://localhost:5002";

    // ============================
    // Fetch All Notes
    // ============================
    const getnotes = async () => {
        try {
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

            if (!response.ok) {
                console.error("Fetch notes failed:", await response.text());
                return;
            }

            const json = await response.json();
            if (Array.isArray(json)) setNotes(json);
            else console.error("Expected array but got:", json);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // ============================
    // Add Note
    // ============================
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description, tag }),
            });

            if (!response.ok) {
                console.error("Add note failed:", await response.text());
                return;
            }

            const note = await response.json();
            setNotes((prev) => [...prev, note]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // ============================
    // Edit Note
    // ============================
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/notes/updatenote/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ title, description, tag }),
                }
            );

            if (!response.ok) {
                console.error("Edit note failed:", await response.text());
            }

            let newNotes = JSON.parse(JSON.stringify(notes));

            for (let i = 0; i < newNotes.length; i++) {
                if (newNotes[i]._id === id) {
                    newNotes[i].title = title;
                    newNotes[i].description = description;
                    newNotes[i].tag = tag;
                    break;
                }
            }

            setNotes(newNotes);
        } catch (error) {
            console.error("Error editing note:", error);
        }
    };

    // ============================
    // Delete Note
    // ============================
    const deleteNote = async (id) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/notes/deletenote/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                }
            );

            if (!response.ok) {
                console.error("Delete note failed:", await response.text());
                return;
            }

            setNotes((prev) => prev.filter((note) => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
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
