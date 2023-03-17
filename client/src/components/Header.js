import React from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserName, selectUserPhoto } from '../features/user/userSlice';
import { useState } from 'react';
import Popup from 'reactjs-popup';






function Header() {
    const userimage = useSelector(selectUserPhoto);
    const username = useSelector(selectUserName);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: `(min-width: 530px)` });
    const isMenu = useMediaQuery({ query: `(min-width: 769px)` });
    const [input, setInput] = useState("")
    const logout = () => {
        window.open("https://campus-olx.onrender.com/auth/logout", "_self");
    };
    function sellbtn() {
        userimage ? (navigate("/sell")) : (alert("Login Required"))
    }
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        input ? navigate("/search", { state: input }) : alert("no input")
        setInput("")
    }
    const google = () => {
        window.open("https://campus-olx.onrender.com/auth/google", "_self");
    };
    return (
        <Container>
            <Link to='/'>
                <Logo src="/images/logo.png" />
            </Link>
            {
                isMenu &&
            <Forms onSubmit={handleSubmit}>
                <input type="text" placeholder='Search your needs' value={input || ""} onChange={handleChange} />
                <button type='submit'>
                    <i className="fa-solid fa-magnifying-glass fa-xl" style={{ color: 'white' }} />
                </button>
            </Forms>
            }
            <Button>
                {(!username) ? (
                    isMobile &&
                    <Login onClick={google} >
                        Login
                        <div></div>
                    </Login>
                ) : (
                    isMobile &&
                    <LoggedIn>
                        <Link to="/message">
                            <div>
                                Msg
                                {/* <i className="fa-regular fa-comment fa-xl"></i> */}
                            </div>
                        </Link>
                        <Link to="/my-ads">
                            <div>
                                Ads
                                {/* <i className="fa-regular fa-bell fa-xl"></i> */}
                            </div>
                        </Link>
                        <div onClick={logout}>
                            <img src={userimage} alt="" />
                        </div>
                    </LoggedIn>
                )
                }
                <Sell onClick={() => { sellbtn() }}>
                    <span style={{ fontSize: '25px', marginRight: '5px' }}>+</span> SELL
                </Sell>
                {
                    !isMenu &&
                    <Menu
                        trigger={open => (
                            (username) ? (
                                <Profile>
                                    <img src={userimage} alt="" />
                                </Profile>
                            ) : (
                            <i className="fa-solid fa-bars"></i>)
                            // <button className="button">Trigger - {open ? 'Opened' : 'Closed'}</button>
                        )}
                        position="bottom right"
                        closeOnDocumentClick
                    >
                        {
                            close => (
                                <MenuBox>
                                    {/* Edit Price
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                            Edit Title
                            <textarea type="text" placeholder='Write your text here' value={title} onChange={(e) => setTitle(e.target.value)} />
                            <button type='submit'>Update</button> */}

                                    <SearchMenu onSubmit={(event) => {
                                        event.preventDefault();
                                        input ? navigate("/search", { state: input }) : alert("no input")
                                        setInput("")
                                        close()
                                    }
                                    }>
                                        <input type="text" placeholder='Search your needs' value={input || ""} onChange={handleChange} />
                                        <button type='submit'>
                                            <i className="fa-solid fa-magnifying-glass fa-xl" style={{ color: 'white' }} />
                                        </button>
                                    </SearchMenu>
                                    <LoggedInMenu>
                                        {(!username) ? (
                                            !isMobile &&
                                            <div onClick={google} >
                                                Login
                                            </div>
                                        ) : (
                                            !isMobile &&
                                            <>
                                                <Link to="/message">
                                                    <div onClick={close}>
                                                        Msg
                                                        {/* <i className="fa-regular fa-comment fa-xl"></i> */}
                                                    </div>
                                                </Link>
                                                <Link to="/my-ads">
                                                    <div onClick={close}>
                                                        Ads
                                                        {/* <i className="fa-regular fa-bell fa-xl"></i> */}
                                                    </div>
                                                </Link>
                                                <div onClick={logout}>
                                                    Logout
                                                </div>
                                            </>
                                        )}
                                    </LoggedInMenu>

                                </MenuBox>
                            )
                        }
                    </Menu>
                }
            </Button>
        </Container>
    )
}

export default Header

const Container = styled.div`
    background-color: #ffffffdd;
    box-shadow: 0px 2px #cccccc;
    width: 100vw;
    height: min(20vw, 68px);
    margin: 0;
    padding: 0px 5vw;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: hidden;
    /* overflow-y: visible; */
    z-index: 100;
`
const Logo = styled.img`
    height: min(20vw, 68px);
    display: block;
`
const Button = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & > i {
        font-size: 1.3rem;
    /* position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    padding: 0.5rem; */
    margin: 1rem 0 1rem 1rem;
    cursor: pointer;
    :hover {
        color: gray;
    }
  }
  
`
const Login = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #3d3b3bec;
    margin-right: max(1vw, 2px);
    transition: all 0.25s ease-out;
    position: relative;
    div:first-child {
        margin: 2px auto;
        width: 85%;
        height: 3px;
        border-radius: 100px;
        background-color: black;
    }
    &:hover {
        color: #4b44a2;
        cursor: pointer;
        div:first-child {
            background-color: transparent;
        }
    }
`
const Sell = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    padding: 4px 8px;
    margin-left: max(1vw, 2px);
    background-color: whitesmoke;
    border-radius: 40px;
    box-shadow: 0px 2px #cccccc;
    border: solid green 6px;
    transition: all 0.25s ease-out;

    &:hover {
        color: #4b44a2;
        cursor: pointer;
    }
`
const Forms = styled.form`
    height: 35px;
    width: 50%;
    padding: 0px 0px 0px 8px;
    margin-right: 5%;
    border: solid;
    overflow: hidden;
    border-radius: 10px;
    background-color: yellow;
    display: flex;
    justify-content: space-between;
    align-items: center;  
    /* visibility: visible;
    @media (max-width:768px) {
        visibility: hidden;
    } */
    button{
        height: 100%;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        :hover {
            cursor: pointer;
        }
    } 
    input{
        margin-left: 12px;
        background-color: transparent;
        outline: none;
        border: none;
        font-size: 20px;
        width: calc(100% - 66px);
    }
    
`

const LoggedIn = styled.div`
    display: flex;
    align-items: center;
    div{
        margin: 0 0.5vw;
        width: 45px;
        height: 45px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        :hover{
            cursor: pointer;
            background-color: lightblue;
        }
    }
    div:nth-child(3){
        img {
            width: 100%;
            height: 100%;
            border: inherit;
            border-radius: inherit;
            contain: content;
        }
    }
`
const Menu = styled(Popup)`
/* position: bottom right; */
i {
    cursor: pointer;
}
&-overlay {
    background-color: #cccccc;
    opacity: 0.3;
}
&-content {
    z-index: 1000;
    background-color: #cccccc;
    max-width: 300px;
    opacity: 0.9;
    padding: 1rem;
}
&-arrow {
      z-index: 1000;
    color: #cccccc;

  }
`
const Profile = styled.div`
        margin: 1rem 0 1rem 1rem;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: lightblue;
        img {
            width: 100%;
            height: 100%;
            border: inherit;
            border-radius: inherit;
            contain: content;
        }
`
const MenuBox = styled.div`
    
`
const SearchMenu = styled.form`
    height: 35px;
    /* width: 50%; */
    padding: 0px 0px 0px 8px;
    /* margin-right: 5%; */
    border: solid;
    overflow: hidden;
    border-radius: 10px;
    background-color: yellow;
    display: flex;
    justify-content: space-between;
    align-items: center;  
    visibility: visible;
    /* @media (max-width:768px) {
        visibility: hidden;
    } */
    button{
        height: 100%;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        :hover {
            cursor: pointer;
        }
    } 
    input{
        /* margin-left: 12px; */
        background-color: transparent;
        outline: none;
        border: none;
        font-size: 20px;
        width: calc(100% - 66px);
    }
    
`
const LoggedInMenu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    /* background-color: #fff; */
    /* border: solid; */
    & > div{
        margin: 0.5rem 0;
        /* border: solid; */
        /* width: 50%; */
        /* margin: 0 0.2rem; */
        /* height: 40px; */
        /* border-radius: 100%; */
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        cursor: pointer;
        border-bottom: solid 2.5px;
        :hover {
            /* background-color: lightblue; */
            /* text-decoration: none; */
            border: none;
        }
    }
    a {
        /* width: 100%; */
        margin: 0.5rem 0;
        /* border: solid; */
        /* width: 50%; */
        /* margin: 0 0.2rem; */
        /* height: 40px; */
        /* border-radius: 100%; */
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        cursor: pointer;
        /* text-decoration: underline; */
        border-bottom: solid 2.5px;
        :hover {
            /* background-color: lightblue; */
            /* text-decoration: none; */
            border: none;
        }
    }
`