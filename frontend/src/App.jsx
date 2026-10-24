import {Route, Routes} from "react-router"

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import UpdatePage from "./pages/UpdatePage"

export default function App() {
    return (
        <div data-theme="retro">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/note/:id" element={<UpdatePage />} />
            </Routes>
        </div>
    )
}