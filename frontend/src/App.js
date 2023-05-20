import {Component} from 'react';
import './App.css';
import HomePage from './components/pages/home/homepage.component';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HotelEdit from './components/pages/hotel/hotel-edit.component';
import './index.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/hotels/:id' element={<HotelEdit/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;