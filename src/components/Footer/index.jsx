import { useEffect, useState } from 'react'
import request from '@/utils/request'
import styles from './style.module.css';

function Footer() {
  const [ data, setData ] = useState({});
  
  useEffect(() => {
    try {
      request('/backend/footer/data.json', 'GET', v => setData(v));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className={styles.footer}>
      <div className={styles.leftImgWrapper}>
        <img className={styles.img} src={'/images/footer_left.png'} alt="" />
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.linkWrapper}>
            <div className={styles.title}>友情链接</div>
            {data?.friendLink?.map(ele => (
              <div key={ele.url} className={styles.link}><a href={ele?.url} target='blank'>{ele?.name}</a></div>
            ))}
          </div>
          <div className={styles.text}>
            <div className={styles.tip}>
              <img className={styles.img} src={"/images/footer_tip.png"} />
            </div>
            <div className={styles.warn} dangerouslySetInnerHTML={{ __html: data?.text?.warn }} />
            <div className={styles.info} dangerouslySetInnerHTML={{ __html: data?.text?.info }} />
          </div>
          <div className={styles.importWrapper}>
            <div className={styles.license}>
              <img className={styles.licenseImg} src={'/images/license.png'} alt="license" />
              {data?.license}  
            </div>
            <div className={styles.copyright}>
              {data?.copyright}         
            </div>
          </div>
        </div>
        <div className={styles.qrcodeWrapper}>
          <div className={styles.awardWrapper}>
            <img className={styles.img} src={"/images/footer_award.png"} alt={"求打赏"} />
          </div>
          <div className={styles.imgWrapper}>
            <div className={styles.qrcode}>
              <img className={styles.img} src={data?.alipayQrcode} />
            </div>
            <div className={styles.qrcode}>
              <img className={styles.img} src={data?.wechatQrcode} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightImgWrapper}>
        <img className={styles.img} src={'/images/footer_right.png'} alt="" />
      </div>
    </div>
  );
}

export default Footer;
