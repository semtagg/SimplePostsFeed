import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, useNavigate} from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      const unixNow = Math.floor(new Date().getTime() / 1000);

      if (user.exp < unixNow)
      {
        logOut();
        navigate("/login");
        window.location.reload();
      }

      setCurrentUser(user);
    }
  }, [navigate]);

  const logOut = () => {
    AuthService.logout();
  };

  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                AllPosts
              </Link>
            </li>

            {currentUser && (
                <>
                  <li className="nav-item">
                    <Link to={"/getPostsById/" + currentUser.user_id.rows[0].id} className="nav-link">
                      MyPosts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/createPost/" + currentUser.user_id.rows[0].id} className="nav-link">
                      CreatePost
                    </Link>
                  </li>
                </>
            )}
          </div>

          {currentUser ? (
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Logout
                  </a>
                </li>
              </div>
          ) : (
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign up
                  </Link>
                </li>
              </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            {/*<Route path="/" element={<Home/>}/>*/}
            {/*<Route path="/" element={<AllPosts/>}/>
            <Route path="/getPostsById/:id" element={<CurrentUserPosts/>}/>
            <Route path="/createPost/:id" element={<CreatePost/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>*/}
          </Routes>
        </div>
      </div>
  );
}
export default App;
