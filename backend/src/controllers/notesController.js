export function getAllNotes(req,res) {
    res.status(200).send("im notes it")
}

export function createNote(req,res) {
    res.status(201).json({ message:"im noting it" })
}

export function updateNote(req,res) {
    res.status(200).json({ message:"im renoting it" })
}

export function deleteNote(req,res) {
    res.status(200).json({ message:"im unnoting it" })
}