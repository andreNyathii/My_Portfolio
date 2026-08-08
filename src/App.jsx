// BrowserRouter: enables URL-based navigation in the browser
// Routes: the container that holds all our route definitions
// Route: maps a specific URL path to a component
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Our components & pages
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  return (
    // BrowserRouter wraps everything — it's what gives our app
    // awareness of the browser's URL bar
    <BrowserRouter>

      {/* Navbar is OUTSIDE <Routes> — this means it renders on EVERY page */}
      <Navbar />

      {/* pt-28 → increases top padding to match the taller navbar so content isn't hidden behind it */}
      <main className="pt-28">

        {/* Routes looks at the current URL and renders the first <Route> that matches */}
        <Routes>
          {/* exact path "/" -> show Home */}
          <Route path="/" element={<Home />} />

          {/* path "/about" -> show About */}
          <Route path="/about" element={<About />} />

          {/* path "/projects" -> show Projects */}
          <Route path="/projects" element={<Projects />} />

          {/* path "/contact" -> show Contact */}
          <Route path="/contact" element={<Contact />} />
        </Routes>

      </main>

    </BrowserRouter>
  )
}

export default App
