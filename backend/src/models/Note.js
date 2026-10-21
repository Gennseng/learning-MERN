import mongoose from "mongoose"

//1. create schema (i.e. the structure of the table, including db rules)
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

},
{ timestamps: true } // for createdAt, updatedAt, etc. functions
                     // highly recommended to place in all schemas
)

//2. create model based off schema
const Note = mongoose.model("Note", noteSchema)

export default Note