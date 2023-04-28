import {useEffect, useState} from 'react'
import request from '@/utils/request'
import './style.css'

function Help (props) {
  useEffect(() => {
    try {
      request('/backend/help/data.json', 'GET', v => setQuestions(v));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const [questions, setQuestions] = useState([]);

  return (
    <div className="help_doc">
      <div className='bgImg'></div>
      <div className="content help_content">
        <p className="title">
          <span>帮助</span>
          <span>Help</span>
        </p>
        <div className="help">
          <ul className='helpTitle'>
            {questions.map((ele, index) => (
              <li key={ele.key}>
                <a target="_parent" href={`#${ele.key}`}>{index + 1}.{ele.title}</a>
              </li>
            ))}
          </ul>
          {questions.map((ele, index) => (
            <dl key={ele.key} id={ele.key}>
              <dt>{index + 1}.{ele.title}</dt>
              {ele.answer.map((item, j) => {
                if (item.type === 'text') {
                  return (
                    <dd key={j} dangerouslySetInnerHTML={{ __html: item.content }} />
                  )
                }
                if (item.type === 'img') {
                  return (
                    <dd key={j}>
                      <p className="himg">
                        <img src={item.url} />
                      </p>
                    </dd>
                  );
                }
              })}
            </dl>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help;
