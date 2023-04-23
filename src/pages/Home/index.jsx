import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'

import S041 from '@/assets/images/S041.png'
import S042 from '@/assets/images/S042.png'
import S043 from '@/assets/images/S043.png'
import S044 from '@/assets/images/S044.png'

import H001 from '@/assets/images/H001.jpg'
import H002 from '@/assets/images/H002.png'
import H003 from '@/assets/images/H003.png'
import H004 from '@/assets/images/H004.jpg'
import H005 from '@/assets/images/H005.jpg'
import H006 from '@/assets/images/H006.jpg'

import Marquee from "react-fast-marquee"
import Footer from '@/components/Footer';
import styles from './style.module.css'
import './reset.css';

function Home (props) {
  const [index, setIndex] = useState(0);
  const [imagesSrc, setImagesSrc] = useState([{
    url: S041,
  }, {
    url: S042,
  }, {
    url: S043,
  }, {
    url: S044,
  }]);
  const [imagesSrc2, setImagesSrc2] = useState([{
    url: H001,
  }, {
    url: H002,
  }, {
    url: H003,
  }, {
    url: H004,
  }, {
    url: H005,
  }, {
    url: H006,
  }]);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.home}>
      <section>
        <Carousel 
          activeIndex={index} 
          onSelect={handleSelect}
          className={styles.carousel}
        >
          {imagesSrc.map(ele => (
            <Carousel.Item key={ele.url}>
              <img
                className="d-block w-100"
                src={ele.url}
                alt="First slide"
                style={{ height: 'calc(100vh - 144px)' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className={styles.descWrapper}>
          <div className={styles.infoWrapper}>
            <h3>永远的林可儿</h3>
            <p>这里是一些描述，描述 这里是一些描述，描述</p>
          </div>
          <div className={styles.btnWrapper}>
            <div className={styles.btnLeft}>
              一键下载
              <div className={styles.dropdown}>
                <div className={styles.downloadBtn}>
                  <img src="./tianyiyun.jpg" alt="天翼云logo" className={styles.btnLogo} />
                  天翼云网盘
                </div>
                <div className={styles.downloadBtn}>
                  <img src="./baiduyun.jpeg" alt="百度云logo" className={styles.btnLogo} />
                  百度云网盘
                </div>
              </div>
            </div>
            <div className={styles.btnMid}>
              安装教程
            </div>
            <div className={styles.btnRight}>
              MOD下载
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.marqueeWrapper}>
          <Marquee direction='right'>
            {imagesSrc2.map(ele => (
              <div className={styles.marqueeImgWrpper} key={ele.url}>
                <img src={ele.url} className={styles.marqueeImg} />  
              </div>
            ))}
          </Marquee>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Home;