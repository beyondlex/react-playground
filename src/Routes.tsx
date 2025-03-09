import { useMemo } from 'react'
import {
  Route,
  Routes,
} from 'react-router-dom'
import MyDialog from './MyDialog';
import Spinner from './Spinner';
import ListPage from './Loading';
import ListPage2 from './Loading2';
import ListPage3 from './Loading3';
import ListPage4 from './Loading4';

export default () => {
  const memeizedRoutes = useMemo(() => (
    <Routes>
        <Route path='/' element={<MyDialog/>}></Route>
        <Route path='/spinner' element={<Spinner/>}></Route>
        <Route path='/loading' element={<ListPage/>}></Route>
        <Route path='/loading2' element={<ListPage2/>}></Route>
        <Route path='/loading3' element={<ListPage3/>}></Route>
        <Route path='/loading4' element={<ListPage4/>}></Route>
    </Routes>
  ), []);

  return <>{memeizedRoutes}</>
}
