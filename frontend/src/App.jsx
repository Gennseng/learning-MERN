import {Route, Routes} from "react-router"

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetails from "./pages/NoteDetails"

const App = () => {
    return <div data-theme="retro">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/note/:id" element={<NoteDetails />} />
        </Routes>


    </div>
}
export default App