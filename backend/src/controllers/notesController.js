import Note from "../models/Note.js"

export async function getAllNotes(req,res) {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)

    } catch (error) {
        console.error("Error retrieving notes, ", error)
        res.status(500).json({message:"500 Internal Server Error"})
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({messsage: "no note"})
        res.json(note)
    } catch (error) {
        console.error("Error getting note, ", error)
        res.status(500).json({message:"500 Internal Server Error"})
    }
}

export async function createNote(req,res) {
    try {
        const {title, content} = req.body
        const note = new Note({title, content})
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error creating note, ", error)
        res.status(500).json({message:"500 Internal Server Error"})
    }
}

export async function updateNote(req,res) {
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true},) // matches id parameter stated in the route (:id)
        if(!updatedNote) return res.status(404).json({messsage: "no note"})
        res.status(200).json(updatedNote)
        
    } catch (error) {
        console.error("Error updating note, ", error)
        res.status(500).json({message:"500 Internal Server Error"})
    }
}

export async function deleteNote(req,res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id) // matches id parameter stated in the route (:id)
        if(!deletedNote) return res.status(404).json({messsage: "no note"})
        res.status(200).json({message:"note gone"})
        
    } catch (error) {
        console.error("Error deleting note, ", error)
        res.status(500).json({message:"500 Internal Server Error"})
    }
}