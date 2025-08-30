import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
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
    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        props.showAlert("✅ Note Updated Successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            {/* Hidden button for modal trigger */}
            <button
                type="button"
                className="btn btn-primary d-none"
                ref={ref}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Launch demo modal
            </button>

            {/* Edit Note Modal */}
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
                                ✏️ Update Note
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
                                        htmlFor="etitle"
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
                                        htmlFor="edescription"
                                        className="form-label"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        required
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        rows="3"
                                        onChange={onChange}
                                        value={note.edescription}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="etag"
                                        className="form-label"
                                    >
                                        Tag
                                    </label>
                                    <input
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
                                disabled={
                                    note.etitle.length < 3 ||
                                    note.edescription.length < 5
                                }
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes Display */}
            <div className="container my-4">
                {localStorage.getItem("token") ? (
                    <>
                        <h2 className="mb-4">📒 Your Notes</h2>
                        {Array.isArray(notes) && notes.length > 0 ? (
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {notes.map((note) => (
                                    <NoteItem
                                        showAlert={props.showAlert}
                                        key={note._id}
                                        updateNote={updateNote}
                                        note={note}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5 text-muted">
                                <h5>📝 No notes yet!</h5>
                                <p>Start by adding your first note 🚀</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-5">
                        <h2 className="mb-3">🔒 Sign in to add notes</h2>
                        <p className="text-muted">
                            You need to log in to create and view your notes.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Notes;
