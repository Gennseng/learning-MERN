import { useState, useEffect } from "react"
import Navbar from "../components/Navbar.jsx"
import RateLimited from "../components/RateLimited.jsx"
import NoteCard from "../components/NoteCard.jsx"
import toast from "react-hot-toast"
import api from "../lib/axios.js"
import NotesNotFound from "../components/NotesNotFound.jsx"

export default function Homepage() {
    const [isRateLimited, setRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
 
    useEffect(()=>{
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")
                setNotes(res.data)
                setRateLimited(false)
            } catch (error) {
                console.log("Error fetching notes", error)
                if(error.response?.status == 429){
                    setRateLimited(true)
                } else {
                    toast.error("Failed loading notes")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchNotes()
    },[])
    return (
        <div className="min-h-screen">
            <Navbar />
            {isRateLimited && <RateLimited />}
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading...</div>}
                {notes.length === 0 && !isRateLimited && <NotesNotFound />}
                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div className="gap-5">
                                <NoteCard key={note._id} note={note} setNotes={setNotes} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
