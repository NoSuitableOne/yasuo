import { Outlet } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './style.css'

function Layout (props) {
  return (
    <div className="layout">
      <Header /> 
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
