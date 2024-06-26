import React,{useContext}from "react";
import noteContext from "../context/notes/noteContext";

export const Noteitem = (props) => {
    const { showAlert,note ,updateNote} = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleClick = ()=>{
        deleteNote(note._id)
        showAlert("Deleted Successfully",'success')
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">
                        {note.description}
                    </p>
                    <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fas fa-trash-alt mx-2" onClick={handleClick}></i>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
