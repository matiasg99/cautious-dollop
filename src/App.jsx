import './App.css'
import UnicornsContainer from './unicorns/UnicornsContainer'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/unicornios" element={<UnicornsContainer />} />
        <Route path="/" element={<Navigate to="/unicornios" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
