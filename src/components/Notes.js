import React, { useContext,useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getnotes, editNote } = context;
    useEffect(() => {
        // eslint-disable-next-line
        getnotes();
    }, []);
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    });

    const ref = useRef(null);
    const refclose = useRef(null);
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({
            id: currentnote._id,
            etitle: currentnote.title,
            edescription: currentnote.description,
            etag: currentnote.tag,
        });
    };
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        console.log(note);
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
            <AddNote />
            <div className="container my-3">
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    ref={ref}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Launch demo modal
                </button>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Update Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form className="container my-3">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="title"
                                            className="form-label"
                                        >
                                            Title
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            id="etitle"
                                            name="etitle"
                                            onChange={onChange}
                                            value={note.etitle}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="description"
                                            className="form-label"
                                        >
                                            Description
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            id="edescription"
                                            name="edescription"
                                            onChange={onChange}
                                            value={note.edescription}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="tag"
                                            className="form-label"
                                        >
                                            Tag
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            id="etag"
                                            name="etag"
                                            onChange={onChange}
                                            value={note.etag}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    ref={refclose}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={handleClick}
                                >
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <h2>Your notes</h2>
                <div className="row">
                    {notes.map((note) => {
                        return (
                            <NoteItem
                                key={note.id}
                                updateNote={updateNote}
                                note={note}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default Notes;
