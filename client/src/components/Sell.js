import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
function Sell() {
  return (
    <div className='bodyContainer'>
        <SellPrompt>
            <h1>Choose Category</h1>
            <SellCategories>
                <Link to = "/sell/add"
                    state = "Mattress"
                >
                    <Category>
                        Mattress
                    </Category>
                </Link>
                <Link to = "/sell/add"
                    state = "Bicycle"
                >
                    <Category>
                        Bicycle
                    </Category>
                </Link>
                <Link to = "/sell/add"
                    state = "Stationary"
                >
                    <Category>
                        Stationary
                    </Category>
                </Link>
                <Link to = "/sell/add"
                    state = "Pillow"
                >
                    <Category>
                        Pillow
                    </Category>
                </Link>
                <Link to = "/sell/add"
                    state = "Curtains"
                >
                    <Category>
                        Curtains
                    </Category>
                </Link>
                <Link to = "/sell/add"
                    state = "LabEquipments"
                >
                    <Category>
                        LabEquipments
                    </Category>
                </Link>
                
            </SellCategories>
        </SellPrompt>
    </div>
  )
}

export default Sell
const SellPrompt = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid #a7a3a3ab;
    h1 {
        font-size: 2rem;
        color: darkblue;
    }    
`
const SellCategories = styled.div`
    padding: 1rem;
    width: 70%;
`
const Category = styled.div`
    border: solid #a7a3a3ab;
    margin: 0.2rem 0 0 0;
    padding: 0.2rem 0.5rem; 
    color: black;
    :hover {
        cursor: pointer;
    }   
`