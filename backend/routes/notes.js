const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Note");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error");
    }
});

router.post(
    "/addnote",
    fetchuser,
    [
        body("title").isLength({ min: 3 }),
        body("description").isLength({ min: 8 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });

            const savednote = await note.save();
            res.json(savednote);
            console.log(savednote);
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Error");
        }
    }
);

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
         const {title,description,tag}=req.body;
    const newnote={};
    if(title)newnote.title=title;
    if(description)newnote.description=description;
    if(tag)newnote.tag=tag;

    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not Allowed");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json({note});
    } catch (error) {
        console.error(error);
        res.status(500).send('internal error');
    }
   
})

router.get('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not Allowed");
    }
    note=await Note.findByIdAndDelete(req.params.id);
    res.json({note});
    } catch (error) {
        console.error(error);
        res.status(500).send('internal error');
    }
   
})
module.exports = router;
