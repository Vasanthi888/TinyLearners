import Dashboard from "./pages/Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Numbers from "./pages/Numbers"
import Home from "./pages/Home"
import Flashcards from "./pages/Flashcards"
import Animals from "./pages/Animals"
import Fruits from "./pages/Fruits"
import Colors from "./pages/Colors"
import Shapes from "./pages/Shapes"


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/flashcards" element={<Flashcards />} />

        <Route path="/animals" element={<Animals />} />

        <Route path="/fruits" element={<Fruits />} />

        <Route path="/colors" element={<Colors />} />

        <Route path="/numbers" element={<Numbers />} />

        <Route path="/shapes" element={<Shapes />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App