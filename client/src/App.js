import React from 'react';
import './App.css';
import Allpages from './pagePlan/Allpages';
import Sellpages from './pagePlan/Sellpages';
import Details from './components/Details';
import Search from './components/Search';
import Recommend from './components/Recommend';
import Others from './components/Others'
import Myads from './components/Myads';
import Unauthorised from './components/Unauthorised';
import Pg404 from './components/Pg404';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Sell from './components/Sell';
import Post from './components/Post';
import { useDispatch } from 'react-redux';
import { setSignOut, setUserLogin } from './features/user/userSlice';
import Message from './components/Message';
import { ActiveChatProvider } from './activeChatContext';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("effect used")
    const getUser = () => {
      console.log("inside get user func")
      fetch("https://campus-olx.onrender.com/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          console.log("got first response",response)
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        }).catch((err) => {
          console.log(err);
          dispatch(setSignOut());
        })
        .then((resObject) => {
          console.log("login response",resObject)
          setUser(resObject.user);
          dispatch(setUserLogin({
            googleId: resObject.user.googleId,
            name: resObject.user.username,
            photo: resObject.user.image,
            isAdmin: resObject.user.isAdmin,
            favourite: resObject.user.favourite,
          }))
        })
        .catch((err) => {
          console.log(err);
          dispatch(setSignOut());
        });
    };
    getUser();
  }, []
  );

  console.log("after effect", user);


  return (
    // <ActiveChatProvider>

      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Allpages />}>
              <Route path='/' element={<Recommend />} />
              <Route path='/details' element={<Details />} />
              <Route path='/search' element={<Search />} />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/sell' element={<Sell />} /> */}
              <Route path='/my-ads' element={user ? <Myads /> : <Unauthorised />} />
              <Route path='/others' element={user ? <Others /> : <Unauthorised />} />
              {(!user) &&
                <Route path='/sell' element={<Unauthorised />} />
              }
              <Route path='/message' element={user ? <Message /> : <Unauthorised />}/>
              <Route path='*' element={<Pg404 />} />
            </Route>
            {user &&
              <Route path='/sell' element={<Sellpages user={user} />}>
                <Route path='/sell' element={<Sell />} />
                <Route path='/sell/add' element={<Post />} />
              </Route>
            }

          </Routes>
        </Router>
      </div>
    // </ActiveChatProvider>
  );
}

export default App;
