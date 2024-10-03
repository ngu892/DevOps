import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BuildingOwner from './pages/BuildingOwner';
import ManageListings from './pages/ManageListings';
import ManageEnquiries from './pages/ManageEnquiries';
import ResidentCommunication from './pages/ResidentCommunication';
import ResidentFeedback from './pages/ResidentFeedback';
import PropertyFee from './pages/Propertyfee';
import MaintenanceRepair from './pages/MaintenanceRepair';
import BuildingManager from './pages/BuildingManager';
import PaymentMethods from './pages/PaymentMethods';
import PaymentHistory from './pages/PaymentHistory';
import MaintenanceRequest from './pages/MaintenanceRequest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaymentProvider } from './context/PaymentContext';
import { MaintenanceProvider } from './context/MaintenanceContext';

function App() {
  return (
    <div className="App">
      <MaintenanceProvider>
       <PaymentProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/register" Component={Register}></Route>
            <Route path="/Bulding-manager" Component={BuildingManager}></Route>
            <Route path="/building-owner" Component={BuildingOwner}></Route>
            <Route path="/manage-listings" Component={ManageListings}></Route>
            <Route path="/manage-enquiries" Component={ManageEnquiries}></Route>

            <Route path="/communication" element={<ResidentCommunication />} />
            <Route path="/feedback" element={<ResidentFeedback />} />

            <Route path="/propertyfee" element={<PropertyFee />} />
            <Route path="/MaintenanceRepair" element={<MaintenanceRepair />} />
            <Route path="/MaintenanceRequest" element={<MaintenanceRequest />} />

            <Route path="/paymentmethods" element={<PaymentMethods />} />
            <Route path="/paymenthistory" element={<PaymentHistory />} />
          </Routes>
          <Footer />
        </Router>
       </PaymentProvider>
      </MaintenanceProvider>
    </div>
  );
}

export default App;
