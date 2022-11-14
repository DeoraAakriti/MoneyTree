import {Routes, Route} from "react-router-dom";
import './App.css';
import Login from './Components/Login'


function App() {
      return(
          <div>             
          <Routes>
          <Route path="/" element={<Login/>}></Route>
          {/* <Route path="explorepage" element={<ExplorePage/>}></Route> 
          <Route path="Propspage" element={<Propspage/>}></Route>  
          <Route path="Displayname" element={<Displayname/>}></Route>
          <Route path="Wishlist" element={<Wishlist/>}></Route>    */}
          </Routes>
            
          </div>
         
      );
    }
    
export default App;
