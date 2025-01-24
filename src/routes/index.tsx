import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRouter";
import NewSalePage from "../pages/NewSalePage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutPage from "../pages/About";
import HelpPage from "../pages/Help";

const AllRoutes = () => {
    return (
        <Routes>
            {/* Protected Routes */}
            <Route path='/:type/:id' element={
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            } />
            <Route path='/newsale' element={
                <ProtectedRoute>
                    <NewSalePage />
                </ProtectedRoute>
            } />
            <Route path='/about' element={
                <ProtectedRoute>
                    <AboutPage />
                </ProtectedRoute>
            } />
            <Route path='/help' element={
                <ProtectedRoute>
                    <HelpPage />
                </ProtectedRoute>
            } />
            <Route path='/settings' element={
                <ProtectedRoute>
                    <NewSalePage />
                </ProtectedRoute>
            } />
            {/* Non Protected Routes */}
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    );
}

export default AllRoutes;
