import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// General Components
import About from './Components/About';
import Contact from './Components/Contact';
import Feature from './Components/Feature';
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import Offer from './Components/Offer';
import NetworkBackground from './NetworkBackground';
import LoginForm from './LoginForm';

// User Pages
import Dashboard from './User/Dashboard';
import Sidebar from './User/Sidebar';
import Profile from './User/Profile';
import NutritionTracking from './User/NutritionTracking';
import Workouts from './User/Workouts';
import MealPlanner from './User/MealPlanner';
import Settings from './User/Settings';
import FoodRecipy from './User/FoodRecipe';
import FoodGoal from './User/FoodGoal';
import ViewFoodGoal from './User/ViewFoodGoal';

// Admin Pages
import RegistrationQuiz from './RegistrationQuiz/RegistrationQuiz';
import Login from './AdminPages/AdminLogin';
import { AdminDashboard } from './Admin/AdminDashboard';
import { AdminSidebar } from './Admin/Sidebar';
import { AdminHeader } from './Admin/Header';
import Clients from './Admin/Clients';
import ViewDietPlans from './Admin/ViewDietPlans';
import AddNutritionist1 from './Admin/AddNutritionist';
import NutritionistLogin from './NutritionistLogin';
import { routes } from './routes';
import AdminLayout from './AdminComponents/AdminLayout';
import UsersPage from './AdminPages/Userspage';
import NutritionistsPage from './AdminPages/NutritionistsPage';
import Dashboard1 from './AdminPages/Dashboard1';
import AddDietPlan from './NutritionistPages/AddDietPlan';
import ResourceLibrary from './User/ResourceLibrary';



function AppRoutes() {
  return useRoutes(routes);
}



const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main Route */}
          <Route
            path="/"
            element={
              <div id="main">
                <NavBar />
                <Header />
                <Feature />
                <Offer />
                <About />
                <Contact />
              </div>
            }
          />
          
          {/* Public Routes */}
          <Route path="/form" element={<RegistrationQuiz />} />
          <Route path="/nutritionist-login" element={<NutritionistLogin />} />
          <Route path="/admin-login" element={<Login />} />

          {/* Nutritionist Route */}
          <Route path="/nutritionist/*" element={<AppRoutes />} >
          <Route path="diet-plans" element={<AddDietPlan />} />
          <Route path="users" element={<Clients />} />
          </Route>

          {/* Admin Dashboard Route */}
          <Route path="/admin" element={<AdminLayout />} >
          <Route path="admindashboard" element={<Dashboard1 />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="nutritionists" element={<NutritionistsPage />} />
          <Route path="add-nutritionist" element={<AddNutritionist1 />} />
          <Route path="viewdietplans" element={<ViewDietPlans />} />
          {/* <Route path="/clients" element={<Client/>}/> */}
          </Route>


          {/* User Dashboard Route */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

// Admin Dashboard Component
const AdminDashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <AdminHeader onMenuClick={toggleSidebar} />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
};

// Login Page Component
const LoginPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-900 flex items-center justify-center p-4">
    <NetworkBackground />
    <LoginForm />
  </div>
);

// User Dashboard Component
const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="flex">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 ml-64">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'foodrecipy' && <FoodRecipy />}
        {currentPage === 'profile' && <Profile />}
        {currentPage === 'nutrition' && <NutritionTracking />}
        {currentPage === 'workouts' && <Workouts />}
        {currentPage === 'planner' && <MealPlanner />}
        {currentPage === 'FoodGoal' && <FoodGoal />}
        {currentPage === 'viewdietplans' && <ViewDietPlans />}
        {currentPage === 'resourcelibrary' && <ResourceLibrary />}
        {currentPage === 'viewfoodgoal' && <ViewFoodGoal />}
        {currentPage === 'settings' && <Settings />}
      </div>
    </div>
  );
};

export default App;
