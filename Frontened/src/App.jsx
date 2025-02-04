import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import NotFound from './Pages/NotFound'



function App() {
  return (
   <>
    <Routes>
       <Route path="/" element={<HomePage/>}></Route>
       <Route path="*" element={<NotFound/>}></Route>
    </Routes>
   </>
  )
}

export default App