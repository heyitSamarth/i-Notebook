import React, { useState } from "react";
import noteContext from "./noteContext";



const NoteState=(props)=>{
  const host="http://localhost:5000/"

    const notesi=
        [
            
    ]

    
    const [notes, setnotes] = useState(notesi)
    //get notes
    const getnote=async()=>{
      //API call
      const response = await fetch(`${host}api/notes/featchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        
      });
      const json = await response.json(); 
      // console.log(json);
      setnotes(json);

    }



    //add a note
    const addnote=async(tittle,description,tag)=>{
      //API call
      const response = await fetch(`${host}api/notes/addnote`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({tittle,description,tag}) 
      });
      const json = await response.json(); 

        setnotes(notes.concat(json))

    }

    //delete a note 

    const deletenote=async(id)=>{
        //api call
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
         
        });
        const json = await response.json(); 
        console.log(json);
      

        const newnote=notes.filter((note)=>{return note._id!==id})
        setnotes(newnote)
        
    }

    //edit a note

    const editnote=async(id,tittle,description,tag)=>{
      //API call
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({tittle,description,tag}) 
        });
        const json = await response.json(); 
        console.log(json);
      


        let newnotes=JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newnotes.length; index++) {
        const element = newnotes[index];
        if(element._id === id)
        {
          newnotes[index].tittle=tittle
          newnotes[index].tag=tag
          newnotes[index].description=description
          break;
        }
        
      }
      setnotes(newnotes);
        
    }

    return(
    <noteContext.Provider value={{notes,addnote,deletenote,editnote,getnote}}>
        {props.children}
    </noteContext.Provider>
    )

}


export default NoteState;