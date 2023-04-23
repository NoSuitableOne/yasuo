import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './style.module.css';

export default function Header (props) {

  useEffect(() => {

  }, []);

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linkWrapper}>
          <span className={styles.title}>友情链接</span>
          <a className={styles.link} href="//weishi.360.cn" target="_blank">安全卫士</a>
          <a className={styles.link} href="//browser.360.cn/" target="_blank">安全浏览器</a>
          <a className={styles.link} href="//sd.360.cn/" target="_blank">360杀毒</a>
          <a className={styles.link} href="//weishi.360.cn/qudongdashi/index.html" target="_blank">驱动大师</a>
          <a className={styles.link} href="http://chrome.360.cn/" target="_blank">极速浏览器</a>
          <a className={styles.link} href="//weishi.360.cn/jijiuxiang/index.html" target="_blank">系统急救箱</a>
          <a className={styles.link} href="//www.360.cn/desktop/" target="_blank">桌面助手</a>
          <a className={styles.link} href="//safe.online.360.cn/?src=360yasuo" target="_blank">360团队版</a>
        </div>
        <div className={styles.license}>
          <div className={styles.policy}>
            Copyright © 2xx5-20x3 UUU All Rights Reserved
            sdd中心隐私权政策 后ICP证q101pd号
          </div>
          <div className={styles.icp}>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000dd002asa006" target="_blank">
              x公网安备 1100000200ssddq6号
            </a>
          </div>
        </div>
      </div>

      <div className={styles.qrcodeWrapper}>
        <img className={styles.qrcode} src="/wechat.png" alt="微信二维码" />
        <img className={styles.qrcode} src="/alipay.png" alt="支付宝二维码" />
        <img className={styles.qrcode} src="/blibli.png" alt="B站二维码" />
      </div>
    </div>
  );
}
