import {Component} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HotelEdit from './components/pages/hotel-edit/hotel-edit.component';
import './index.css';
import Footer from './components/pages/footer/footer.component';
import Header from './components/pages/header/header.component';
import HomePage from './components/pages/hom-page.component';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/hotels/:id' element={<HotelEdit/>}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}

export default App;