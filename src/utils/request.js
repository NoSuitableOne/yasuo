const request = (api, method, cb) => fetch(api, {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json().then(v => cb(v))).catch(e=>console.error(e));

export default request;
