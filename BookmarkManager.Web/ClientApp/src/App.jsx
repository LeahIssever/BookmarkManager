import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Bookmarks from './Pages/Bookmarks';
import AddBookmark from './Pages/AddBookmark';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/bookmarks' element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
                    <Route path='/addbookmark' element={<PrivateRoute><AddBookmark /></PrivateRoute>} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;