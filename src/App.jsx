
import Header from './layouts/Header';
import {Routes, Route, BrowserRouter, Outlet} from 'react-router-dom';
import Home from './pages/Home';
import Toys from './pages/Toys';
import CreateToy from './components/CreateToy';
import ToyDetails from './pages/ToyDetails';
import Orders from './pages/Orders';
import CreateOrder from './components/CreateOrder';
import Elves from './pages/Elves';
import RegisterElf from './pages/RegisterElf'
import ElfProfile from './pages/ElfProfile';
import ElfTasks from './pages/ElfTasks';
import Task from './pages/Task';
import Navigation from './components/Navigation';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import AuthSection from './components/auth/AuthSection';
import { UserProvider } from './context/userContext';
import toast, { Toaster } from 'react-hot-toast';  
import { ElvesProvider } from './context/elvesContext';
import CreateTask from './components/CreateTask';
import CristmasTimeLeft from './components/CristmasTimeLeft';


function App() {

  return (

    <UserProvider>
        <Header>
            <div className='flex gap-2 items-center'>
                <img src="/logo.png" alt="Santa Hat" className='inline h-8 mr-2'/>
                <h2>Welcome to 
                    <span className="font-['Poppins'] font-semibold tracking-wide text-xl text-green-800 dark:text-[var(--primary)] ml-2">
                        Santa workshop
                    </span>
                </h2>
            </div>
            <Navigation />
            <AuthSection />
            <CristmasTimeLeft targetDate={'2026-01-01T00:00:00Z'} />
        </Header>

        <Routes>
            <Route path='/'>
                <Route index element={<Home/>} />
            </Route>

            <Route path='/auth'>
                <Route path='login' element={<Login/>} />
                <Route path='register' element={<Register/>} />
                <Route path='logout' element={<Logout/>} />
            </Route>

            <Route path='/toys'>
                <Route index element={<Toys/>} />
                <Route path='create-toy' element={<CreateToy/>} />
                <Route path=':id' element={<ToyDetails/>} />
            </Route>

            <Route path='/orders'>
                <Route index element={<Orders/>} />
                <Route path='new' element={<CreateOrder/>} />
            </Route>
            
            <Route path="/elves" element={<ElvesProvider><Outlet /></ElvesProvider>}>
                <Route index element={<Elves/>} />
                <Route path='register' element={<RegisterElf/>} />
                <Route path=':elfId' element={<ElfProfile/>} />
                <Route path=':elfId/tasks'>
                    <Route index element={<ElfTasks/>}/>
                    <Route path='new' element={<CreateTask/>} />
                    <Route path=':taskId' element={<Task/>} /> 
                </Route>
            </Route>

        </Routes>
        <Toaster />

    </UserProvider>
  )
}

export default App;
