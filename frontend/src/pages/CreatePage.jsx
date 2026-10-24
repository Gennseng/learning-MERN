import { ArrowLeftIcon } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import toast from "react-hot-toast"
import api from "../lib/axios"

export default function CreatePage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if(!title.trim() || !content.trim()){
            toast.error("Write smth")
            return
        }
        setLoading(true)
        try {
            await api.post("/notes", {
                title,
                content
            })
            toast.success("note done ezpz")
            navigate("/")
        } catch(error) {
            console.log(error)
            if(error.response.status === 429) {
                toast.error("bruh chill", {
                    duration: 4000,
                    icon:"👺"
                })
            } else {
                toast.error("no bueno :(")
            }
            
            
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl-mx-auto">
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5" />
                            Go Back
                    </Link>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-tityle text-2xl mb-4">Create New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label">Title</span>
                                    </label>
                                    <input type="text" 
                                    placeholder="Note Title" 
                                    className="input input-bordered" 
                                    value={title}
                                    onChange={(e)=> setTitle(e.target.value)} 
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label">Content</span>
                                    </label>
                                    <textarea
                                    placeholder="Today I should..." 
                                    className="textarea textarea-bordered h-32" 
                                    value={content}
                                    onChange={(e)=> setContent(e.target.value)} 
                                    />
                                </div>

                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {/* when loading is true, disable button and use "Creating..." text instead */}
                                        {loading ? "Creating..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
