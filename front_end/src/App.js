import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from "react";
import AuthProvider, { useAuth } from "./security/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
import AddSmartPhone from "./components/AddSmartPhone";
import MainPage from "./components/MainPage";
import YourCart from "./components/YourCart";
import YourOrder from "./components/YourOrder";
import EditCard from "./cards/EditCard";
import InfoOrder from "./cards/InfoOrder";
import SmartphoneManagement from "./admin/SmartphoneManagement";
import PacketCheck from "./admin/PacketCheck";
import PacketManagement from "./delivery/PacketManagement";
import PacketSelect from "./delivery/PacketSelect";
import ModifySmartphone from "./admin/ModifySmartphone";

function AdminRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAdmin) return children;

  return <Navigate to="/" />;
}

function DeliverRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAdmin) return children;

  return <Navigate to="/" />;
}

function UserRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isUser) return children;

  return <Navigate to="/" />;
}

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:id" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/:token" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route
              path="/yourCart"
              element={
                <UserRoute>
                  <YourCart />
                </UserRoute>
              }
            />
            <Route
              path="/yourOrder"
              element={
                <UserRoute>
                  <YourOrder />
                </UserRoute>
              }
            />
            <Route
              path="/editCart/:id"
              element={
                <UserRoute>
                  <EditCard />
                </UserRoute>
              }
            />
            <Route
              path="/infoOrder"
              element={
                <UserRoute>
                  <InfoOrder />
                </UserRoute>
              }
            />
            <Route
              path="/smartphoneManagement"
              element={<SmartphoneManagement />}
            />
            <Route
              path="/smartphoneManagement/:id"
              element={<SmartphoneManagement />}
            />
            <Route
              path="/packetCheck"
              element={
                <AdminRoute>
                  <PacketCheck />
                </AdminRoute>
              }
            />
            <Route
              path="/packetCheck/:id"
              element={
                <AdminRoute>
                  <PacketCheck />
                </AdminRoute>
              }
            />
            <Route
              path="/addSmartPhone"
              element={
                <AdminRoute>
                  <AddSmartPhone />
                </AdminRoute>
              }
            />
            <Route
              path="/modifySmartPhone/:id"
              element={
                <AdminRoute>
                  <ModifySmartphone />
                </AdminRoute>
              }
            />
            <Route
              path="/packetManagement"
              element={
                <DeliverRoute>
                  <PacketManagement />
                </DeliverRoute>
              }
            />
            <Route
              path="/packetSelect"
              element={
                <DeliverRoute>
                  <PacketSelect />
                </DeliverRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
