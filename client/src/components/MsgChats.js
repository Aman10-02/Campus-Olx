import React from 'react'
import styled from 'styled-components'

function MsgChats({ msg , own = false }) {
  return (
    
        own
            ? 
        <OwnChats>
           <p>
             {msg}
            </p>
        </OwnChats>
            :
        <Chats>
            <p>
             {msg}
            </p>
        </Chats>
  )
}

export default MsgChats

const OwnChats = styled.div`
    /* background-color: red; */
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    p {
        background-color: #009b00;
        color: #f3f2f2;
        padding: 0.2rem;
        margin: 0.2rem 0.1rem 0.2rem 0;
        max-width: 65%;
        border-radius: 10px 0 10px 10px;
    }
    `
const Chats = styled.div`
    /* background-color: green; */
    /* max-width: 80%; */
    display: flex;
    p {
        margin: 0.2rem 0 0.2rem 0.1rem;
        color: #ededed;
        padding: 0.2rem;
        background-color: #b5b5b5;
        max-width: 65%;
        border-radius: 0px 10px 10px 10px;
    }
`