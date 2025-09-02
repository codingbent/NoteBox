import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        if (localStorage.getItem("token") != null) {
            e.preventDefault();
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
            props.showAlert("Added Successfully", "success");
        } else {
            alert("Sign in to create a note");
        }
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <div className="container my-3">
            <div className="card shadow-sm p-4 mb-4">
                <h3 className="mb-3">📝 Add a Note</h3>
                <form className="container my-3" onSubmit={handleClick}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            required
                            value={note.title}
                            placeholder="Enter your Title here"
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            onChange={onChange}
                            minLength="3"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            required
                            value={note.description}
                            placeholder="Enter your Description here"
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={onChange}
                            minLength="5"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                            Tag
                        </label>
                        <input
                            value={note.tag}
                            placeholder="Optional"
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            onChange={onChange}
                        />
                    </div>
                    {localStorage.getItem("token") != null ? (
                        <button type="submit" className="btn btn-primary">
                            Add Note
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary">
                            Add Note
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddNote;
