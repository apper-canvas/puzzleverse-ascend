import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound'
import JigsawPuzzlePage from './pages/JigsawPuzzlePage';
function App() {
  return (
    <>
<Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jigsaw/:puzzleId" element={<JigsawPuzzlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </>
  )
}

export default App