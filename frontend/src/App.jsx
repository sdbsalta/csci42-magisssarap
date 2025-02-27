import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

function App() {
  return (
     <Router>
     <div className="font-poppins">
       <Routes>
         <Route path="/login" element={<Login />} />
       </Routes>
     </div>
   </Router>
  );
}

export default App