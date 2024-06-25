import React, { useState,useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { AddNote } from "./AddNote";
import {useNavigate} from "react-router-dom";

export const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  let navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes(); 
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Updated successfully",'success')
    refClose.current.click()
  };
  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            onChange={onChange}
            value={note.etitle}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            onChange={onChange}
            value={note.edescription}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            onChange={onChange}
            value={note.etag}
            required
          />
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 } type="button" onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className = 'container'>
        {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};
