"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import "./App.css"

function App() {
  const [theme, setTheme] = useState(0)

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme + 1) % 3)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === "q") {
        toggleTheme()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Router>
      <div className={`app theme-${theme}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
