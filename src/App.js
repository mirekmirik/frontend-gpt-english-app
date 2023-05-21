import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import AppRoutes from './components/Routes/Routes';
import Footer from './components/Footer/Footer';
import './App.css';
import Games from './components/Games/Games';
import Settings from './components/Settings/Settings';
import HomeIcon from './components/Home/HomeIcon';

function App() {

  const { currentUser } = useSelector(({ user }) => user)

  return (
    <div className="App">
      <Header />
      <div id="overlays"></div>

      <AppRoutes />
      {currentUser?.englishLvl && <Footer>
        <Games />
        <HomeIcon />
        <Settings />
      </Footer>}
    </div>
  );
}

export default App;
