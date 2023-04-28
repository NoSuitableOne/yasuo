import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import request from '@/utils/request'
import styles from './style.module.css';

export default function Header (props) {
  const pLocation = useLocation();
  const [ currentPage, setCurrentPage ] = useState('');
  const [ data, setData ] = useState([]);
  
  useEffect(() => {
    try {
      request('/backend/header/data.json', 'GET', v => setData(v));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(pLocation.pathname);
  }, [pLocation]);

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <img src="/images/logo.png" alt="小小TV" className={styles["navbar-logo"]} />
        <div className={styles["navbar-links"]}>
          {data.map(ele => {
            if (ele.type === 'inner') {
              return (
                <NavLink to={ele.path} key={ele.path}>
                  <span className={currentPage === ele.path? styles.cur : ''}>{ele.name}</span>
                </NavLink>
              );   
            } 
            if (ele.type === 'outer') {
              return (
                <a key={ele.path} href={ele.path} target="blank">
                  <span>{ele.name}</span>
                </a>
              )
            }
          })}
        </div>
      </div>
    </div>
  );
}
