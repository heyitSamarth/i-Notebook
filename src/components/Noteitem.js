import React, { useContext } from 'react'
import noteContext from '../context/Notes/noteContext';

const Noteitem = (props) => {
    const { note , updatenote } = props;

    const context = useContext(noteContext);
    const {deletenote}=context;
    return (
        <div className="col-md-3">
            <div className="card my-3" >
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                    <div className="card-body">
                        <h5 className="card-title">{note.tittle}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id); props.showAlert("Deleted Sucessfully","success")}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note);}}></i>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
