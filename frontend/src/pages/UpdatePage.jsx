import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../lib/axios"
import toast from "react-hot-toast"
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react"

export default function UpdatePage() {
    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        async function fetchNote() {
            try {
                const res = await api.get(`/notes/${id}`)
                setNote(res.data)
            } catch (error) {
                console.log("error fetching note", error)
                toast.error("hopital")
            } finally {
                setLoading(false)
            }
        }

        fetchNote()
    }, [id])

    async function handleDelete() {
        if(!window.confirm("slime it?")) return
        try {
            await api.delete(`notes/${id}`)
            toast.success("note slimed")
            navigate("/")
        } catch (error) {
            console.log("error deleting note", error)
            toast.error("note got hands")
        }
    }
    async function handleSave() {
        if(!note.title.trim() || !note.content.trim()) {
            toast.error("write smth bruh")
            return
        }

        setSaving(true)
        try {
            await api.put(`/notes/${id}`, note)
            toast.success("note edited ezpz")
            navigate("/")
        } catch(error) {
            console.log("Error updating note", error)
            toast.error("didn't work")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to={"/"} className="btn btn-ghost mb-6">
                            <ArrowLeftIcon className="size-5" />
                                Go Back
                        </Link>
                        <button className="btn btn-error btn-outline" onClick={handleDelete}>
                            <Trash2Icon className="size-4" />
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered"
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="textarea textarea-bordered h-32"
                                    value={note.content}
                                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
