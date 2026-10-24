import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils"
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function NoteCard({note, setNotes}) {
    async function handleDelete(e, id) {
        e.preventDefault();

        if(!window.confirm("slime it?")) return

        try {
            await api.delete(`/notes/${id}`)
            // immediately "refreshes" the page, showing all notes not using the deleted notes's id
            setNotes((prev) => prev.filter(note=>note._id !== id))
            toast.success("note slimed")
        } catch (error) {
            console.log("Error deleting note", error)
            toast.error("note got hands")
        }
    }
    return (
        <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 
        border-t-4 border-solid border-base-content/30"> 
            <div className="card-body bg-[#f7ecd5]">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="line-clamp-3 text-base-content/70">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}