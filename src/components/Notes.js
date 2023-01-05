import React, { useContext,useState, useEffect,useRef } from 'react'
import noteContext from '../context/Notes/noteContext';
import Noteitem from '../components/Noteitem';
import Addnotes from './Addnotes';
import {useNavigate} from 'react-router-dom'


export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getnote, editnote} = context;
  let navi= useNavigate();
  useEffect(() => {
    
    if(localStorage.getItem('token'))
    {
      getnote()
    }
    else
    {
      navi("/login")
    }
    
    // eslint-disable-next-line
  }, [])
  const ref=useRef('null')
  const refclose=useRef('null')
  const updatenote = (cnote) => {
    ref.current.click()
    setnote({id:cnote._id,etittle: cnote.tittle,etag:cnote.tag,edescription:cnote.description})
   

  }
  const [note, setnote] = useState({id:"",etittle:"",edescription:"",etag:""})
  const handleclick=(e)=>{
    // e.preventDefault();
    editnote(note.id,note.etittle,note.edescription,note.etag)
    refclose.current.click()
    setnote({id:"",etittle:"",edescription:"",etag:""})
    props.showAlert("Notes updated Sucessfully ","success")
   
 }
const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
}
  
  return (
    <>
      <div className="container my-3">
        <Addnotes showAlert={props.showAlert} />

        <button type="button"  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form>
                <div className="mb-3">
                    <label htmlFor="tittle" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.etittle} onChange={onChange} id="etittle" name="etittle"  minLength={5} required  aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.edescription} onChange={onChange}  minLength={5} required  id="edescription" name="edescription"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control"  value={note.etag} onChange={onChange} id="etag"   minLength={5} required  name="etag"/>
                </div>
            </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refclose}  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleclick} disabled={note.etittle.length<5 ||  note.edescription.length<5 }   className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className=" row" >
        <h2>Your Notes</h2>
        {notes.length=== 0 && <div className=' my-3 mx-1'>NO NOTES TO DISPLAY</div> }
        {
          
          notes.map((note) => {

            return <Noteitem showAlert={props.showAlert}key={note._id} updatenote={updatenote} note={note} />;

          })
        }

      </div>
    </>
  )
}

