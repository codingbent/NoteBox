import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5001";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    const getnotes = async () => {
            const url = `${host}/api/notes/fetchallnotes`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg4ZTU5ZGQzYjI3MTYwMGNlYmRiNmJhIn0sImlhdCI6MTc1NDE2MTcyMH0.1aKGE-xKtW21eqFWPvv1DdhFVddPH6StGyZpoOVye-U",
                },
            });
            const json=await response.json()
            console.log(json);
            setNotes(json);
    }
        const addNote = async (title, description, tag) => {
                const url = `${host}/api/notes/addnote`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token":
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg4ZTU5ZGQzYjI3MTYwMGNlYmRiNmJhIn0sImlhdCI6MTc1NDE2MTcyMH0.1aKGE-xKtW21eqFWPvv1DdhFVddPH6StGyZpoOVye-U",
                    },
                    body: JSON.stringify({ title, description, tag })
                });
                const json=await response.json();
                console.log(json);
                
                const note = 
                {
                    "_id":  "689a44ccda9669a5f1a29bd"+Math.floor(Math.random(0,10)*10+10),
                    "user": "688e59dd3b271600cebdb6ba",
                    "title": title,
                    "description": description,
                    "tag": tag,
                    "date": "2025-08-11T19:04:08.797Z",
                    "__v": 0
                };
                console.log(note);
            setNotes(notes.concat(note));
        };

        const editNote = async (id, title, description, tag) => {
            const url = `${host}/api/notes/updatenote/${id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg4ZTU5ZGQzYjI3MTYwMGNlYmRiNmJhIn0sImlhdCI6MTc1NDE2MTcyMH0.1aKGE-xKtW21eqFWPvv1DdhFVddPH6StGyZpoOVye-U",
                },
                body: JSON.stringify({title,description,tag})
            });
            const json=await response.json();
            console.log(json); 

            let newnotes=JSON.parse(JSON.stringify(notes))
            for(let index=0;index<newnotes.length;index++){
                const element=newnotes[index];
                if(element._id===id){
                    newnotes[index].title=title;
                    newnotes[index].description=description;
                    newnotes[index].tag=tag;
                    break;
                }
            }
            setNotes(newnotes);
        };
        const deleteNote = async (id) => {
            console.log("Deleting the note", id);
                const url = `${host}/api/notes/deletenote/${id}`;
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token":
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg4ZTU5ZGQzYjI3MTYwMGNlYmRiNmJhIn0sImlhdCI6MTc1NDE2MTcyMH0.1aKGE-xKtW21eqFWPvv1DdhFVddPH6StGyZpoOVye-U",
                    }
                });
                const json=response.json();
                console.log(json); 
                
            
            const newNote = notes.filter((note) => {
                return note._id !== id;
            });
            setNotes(newNote);
        };
        return (
            <noteContext.Provider
                value={{ notes, addNote, editNote, deleteNote,getnotes}}
            >
                {props.children}
            </noteContext.Provider>
        );
    };
export default NoteState;
