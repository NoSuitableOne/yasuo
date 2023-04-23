import { Outlet } from "react-router-dom";
import Header from '@/components/Header';
import './style.css'

function Layout (props) {
  return (
    <div className="layout">
      <Header /> 
      <Outlet />
    </div>
  );
}

export default Layout;
