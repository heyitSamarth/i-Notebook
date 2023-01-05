import React,{useContext, useState} from 'react'
import noteContext from '../context/Notes/noteContext';
// import Noteitem from '../components/Noteitem';

function Addnotes(props) {
    const context = useContext(noteContext);
    const {addnote}=context;
    
    const [note, setnote] = useState({tittle:"",description:"",tag:""})
    

    
    const handleclick=(e)=>{
        e.preventDefault();
        addnote(note.tittle,note.description,note.tag);
        setnote({tittle:"",description:"",tag:""});
        props.showAlert("Added Sucessfully ","success")
     }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="tittle" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.tittle} onChange={onChange} id="tittle" name="tittle" aria-describedby="emailHelp"  minLength={5} required  />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.description} onChange={onChange} id="description" name="description"  minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Tag</label>
                    <input type="text" className="form-control" value={note.tag} onChange={onChange} id="tag" name="tag"  minLength={5} required  />
                </div>
               
                <button type="submit" disabled={note.tittle.length<5 ||  note.description.length<5 } className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>

    </div>
  )
}

export default Addnotes