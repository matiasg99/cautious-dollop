import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Unicorns from './unicorns';
import Products from './products';
import { UnicornProvider } from './context/UnicornContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/unicornios/*"
          element={
            <UnicornProvider>
              <Unicorns />
            </UnicornProvider>
          }
        />
        <Route path="/productos/*" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;