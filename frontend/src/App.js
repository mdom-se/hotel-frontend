import {Component} from 'react';
import './App.css';
import HotelList from './components/pages/hotel-list/hotel-list.component';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HotelEdit from './components/pages/hotel-edit/hotel-edit.component';
import './index.css';
import Footer from './components/pages/footer/footer.component';
import Header from './components/pages/header/header.component';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<HotelList/>}/>
                    <Route path='/hotels/:id' element={<HotelEdit/>}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}

export default App;