import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './style.module.css';

export default function Header (props) {
  const pLocation = useLocation();
  const [ currentPage, setCurrentPage ] = useState('');
  useEffect(() => {
    setCurrentPage(pLocation.pathname);
  }, [pLocation]);

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <img src="/images/logo.png" alt="小小TV" className={styles["navbar-logo"]} />
        <div className={styles["navbar-links"]}>
          <NavLink to={"/"}><span className={currentPage === '/'? styles.cur : ''}>首页</span></NavLink>
          <NavLink to={"/highlight"}><span className={currentPage === '/highlight'? styles.cur : ''}>精彩内容</span></NavLink>
          <NavLink to={"update"}><span className={currentPage === '/update'? styles.cur : ''}>更新日志</span></NavLink>
          <NavLink to={"help"}><span className={currentPage === '/help'? styles.cur : ''}>疑难解答</span></NavLink>
          <a href="/download">
            <span>资源下载</span>
          </a>
        </div>
      </div>
    </div>
  );
}
