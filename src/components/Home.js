import React from 'react'
// import noteContext from '../context/Notes/noteContext';
import Notes from '../components/Notes.js';
// import Addnotes from './Addnotes.js';

function Home(props) {
    const {showAlert}=props;
    return (
        <div>
            
            
            <div className="container my-3">
                <Notes showAlert={showAlert} />
           
            </div>
        </div>
    )
}

export default Home