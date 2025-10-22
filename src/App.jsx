import { Briefcase, Rocket, Users, Bell, Sparkles, Clock } from 'lucide-react';
import Home from './components/jobSeeker/LandingPage/Home';
import { Routes, Route} from 'react-router-dom';

function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<Home/>} />
     
    </Routes>
   
   </>
  );
}

export default App;