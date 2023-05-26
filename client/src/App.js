import './App.css';
import { Login } from './EntryForm/login';
import { Register } from './EntryForm/register';
import { Routes, Route } from 'react-router-dom';
import { Entrypage } from './EntryForm/entrypage';
import { Index } from './';
import { Search } from './search';
import { Home } from './home/home';
import { Camp } from './home/camp';
import { Navbar } from './home/navbar';
import { Account } from './home/account';
import UserContextProvider from './context/context';

function App() {
  return (
    <UserContextProvider>
      
    <div className="App">
      <nav className='navbar'>
            <Navbar/>
        </nav>
      <Routes>
        <Route path='/login' element={<Entrypage />} />
        
        <Route path='/' element={<Home />} />
        <Route path='/camp' element={<Camp/>} />
        <Route path='/account' element={<Account/>} />
      </Routes>

    </div>
    
    </UserContextProvider>
  );
}

export default App;
