import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function Header2() {
    const navigate = useNavigate();
    const previous = () => {
        navigate(-1);
    }
  return (
    <Container>
        <div>
            <i className="fa-solid fa-arrow-left fa-2x" onClick={previous}></i>
            <Logo src="/images/logo.png" />
        </div>
    </Container>
  )
}

export default Header2

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
    z-index: 1000;
    div {
        display: flex;
        align-items: center;
        i {
            margin-right: 1rem;
            :hover{
                cursor: pointer;
            }
        }
    }
`
const Logo = styled.img`
    height: min(20vw, 68px);
    display: block;
`