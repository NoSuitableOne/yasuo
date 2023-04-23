import { Routes, Route } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/pages/Home';
import Update from '@/pages/Update';
import Highlight from '@/pages/Highlight';
import Help from '@/pages/Help';

function RootRoute () {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route exact path="" element={<Home />}></Route>
        <Route exact path="update" element={<Update />}></Route>
        <Route exact path="help" element={<Help />}></Route>
        <Route exact path="highlight" element={<Highlight />}></Route>
      </Route>
    </Routes>
  );
}

export default RootRoute
