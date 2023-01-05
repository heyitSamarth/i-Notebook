const express = require('express');
const router = express.Router();
const Note = require('../Models/Note')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

//Route 1: Get all the notes using get 
router.get('/featchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

//Route 2: add a new node
router.post('/addnote', fetchuser,
    [
        body('tittle').isLength({ min: 5 }),
        body('description').isLength({ min: 5 })
    ]
    , async (req, res) => {
        try {
            const { tittle, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const note = new Note({
    
                tittle, description, tag, user: req.user.id
            })
            const saveNote = await note.save()
    
            res.json(saveNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }


       
    })

    //Route 3: update an existing note

    router.put('/updatenote/:id', fetchuser,
    [
        body('tittle').isLength({ min: 5 }),
        body('description').isLength({ min: 5 })
    ]
    , async (req, res) => {
        try {
            
            const { tittle, description, tag } = req.body;
            const newNote={}
            if(tittle){newNote.tittle=tittle}
            if(description){newNote.description=description}
            if(tag){newNote.tag=tag}

            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }
    
            let note = await Note.findById(req.params.id)
            if(!note){res.status(404).send("NOT FOUND")}
            if(note.user.toString()!==req.user.id)
            {
                return res.status(401).send("NOT ALLOWED");
            }
            note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
            res.json({note});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }


       
    })

      //Route 4: delete an existing note

      router.delete('/deletenote/:id', fetchuser,
       async (req, res) => {
          try {
              const { tittle, description, tag } = req.body;
              
  
              // const errors = validationResult(req);
              // if (!errors.isEmpty()) {
              //     return res.status(400).json({ errors: errors.array() });
              // }
      
              let note = await Note.findById(req.params.id)
              if(!note){res.status(404).send("NOT FOUND")}
              //allow deletion if user own this note
              if(note.user.toString()!==req.user.id)
              {
                  return res.status(401).send("NOT ALLOWED");
              }
              note=await Note.findByIdAndDelete(req.params.id)
              res.json({"Sucesss":" Note has been deleted"});
  
          } catch (error) {
              console.error(error.message);
              res.status(500).send("Some error occured");
          }
  
  
         
      })



module.exports = router