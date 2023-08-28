import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { selectSocket, selectUserGoogleId } from '../features/user/userSlice';
import Conversations from './Conversations'
import MsgChats from './MsgChats';

function Message() {
    const api = process.env.REACT_APP_API;
    const location = useLocation().state;
    const userId = useSelector(selectUserGoogleId);
    const socket = useSelector(selectSocket);
    const [conversations, setConversations] = useState(null);
    const [currentChat, setCurrentChat] = useState(null); 
    const [currentAdd, setCurrentAdd] = useState(null); 
    const [currentUser, setCurrentUser] = useState(null); 
    const [msg, setMsg] = useState(null);
    const [que, setQue] = useState(null);
    const [inputType, setInputType] = useState("o")
    const scrollRef = useRef();
    
    const [messages , setMessages] = useState(null);
    
    useEffect(() => {
        setCurrentChat(location);
    }, [location])
    
    const friendUser = userId ? ((currentChat?.members[0] === userId) ? currentChat?.members[1] : currentChat?.members[0]) : null ;
    // const add = useLocation().state.Add;
    // //console.log(add);
    // const seller = useLocation().state.Seller;
    // //console.log(seller);
    // //console.log("successful")
    useEffect(() => {
      const getConversation = async () => {
        const response = await fetch(api + "conversation/get", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
      })
      const data = await response.json();
      //console.log("from useeffect getconver", data);
      setConversations(data);
      };
      getConversation();
    }, [currentChat])

    const getMessages = async () => {
        const response = await fetch(api + "message/get", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
        body: JSON.stringify({conversationId: currentChat?._id})
      })
      const data = await response.json();
      //console.log("from useeffect getMessages", data);
      setMessages(data);
      };
    socket.on( 'gotMessage', async () => {
       await getMessages();
    })
    useEffect(() => {
      
      getMessages();
    }, [currentChat])

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch(api + "adds/conv/detail", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    // "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": true,
                },
                body: JSON.stringify({ addId: currentChat?.addId, user_id: friendUser}),
                
            })
            const data = await response.json();
            //console.log("from useeffect message getdetail", data);
            setCurrentAdd(data.Add);
            setCurrentUser(data.User);
        };
        getDetails();
    }, [currentChat])
    
    const handleChange = (e) => {
        setMsg(e.target.value)
    }
    const sendOfferMsg = async (msg) => {
        // alert(JSON.stringify(msg))
        //console.log("questions are ", que)
        if(msg){
            const response = await fetch(api + "message/post", {
                method: "POST",
                mode:"cors",
                credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body:JSON.stringify( {conversationId: currentChat._id, sender: userId, text: msg}),
            });
            const data = await response.json();
            //console.log( "response from post message",data);
            socket.emit('newMessage',{
                receiver: friendUser
            });
            setMessages([...messages, data]);
            setQue(null);
        }
        // navigate("/");
    }
    const sendmsg = async (event) => {
        event.preventDefault();
        if(msg)
        {const response = await fetch(api + "adds/post/offer", {
          method: "POST",
          mode:"cors",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body:JSON.stringify( {addId: currentAdd._id, userId: userId, interestedBuyer: {userGoogleId: userId, priceOffered: msg}, interestedAdd: {addId: currentAdd._id, priceOffered: msg }}),
        });
        const data = await response.json();
        //console.log(data);
        sendOfferMsg(`Made offer for ₹ ${msg}`)
        alert("Your offer of ₹ "+ msg + " is made sucessfully")
        setMsg(null);
        }
        else{
            alert("Price cannot be empty")
        }

        // navigate("/");
    }


    const handleChangeQ = (e) => {
        setQue(e.target.value)
    }
    const sendQ = async (event) => {
        event?.preventDefault();
        // alert(JSON.stringify(msg))
        //console.log("questions are ", que)
        if(que){
            const response = await fetch(api + "message/post", {
                method: "POST",
                mode:"cors",
                credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body:JSON.stringify( {conversationId: currentChat._id, sender: userId, text: que}),
            });
            const data = await response.json();
            //console.log( "response from post message",data);
            socket.emit('newMessage',{
                receiver: friendUser
            });
            setMessages([...messages, data]);
            setQue(null);
        }
        // navigate("/");
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages, currentUser]);

    useEffect(() => {
        currentAdd?.createdbygoogleId === userId && setInputType("q")
      }, [currentAdd]);

    return (
        <div className='bodyContainer' >
            <Container>

                <Inbox>
                    <Heading>
                        INBOX
                    </Heading>
                    {
                        conversations &&
                        conversations.map((c)=>(
                            <div key={c._id} style={{backgroundColor: (c._id === currentChat?._id) ? '#ededed' : 'transparent'}} onClick={()=>{setCurrentChat(c)}}>
                                <Conversations conv={c} />
                            </div>
                        ))
                    }
                    
                </Inbox>
                {(currentUser && currentAdd) &&
                <ChatBox>
                    <Head>
                        <IconDiv>
                            <ProductImg>
                                <img src={currentAdd.image} alt="" />
                            </ProductImg>
                            <ProfileIcon>
                                <ProfileImg>
                                    <img src={currentUser.image} alt="" />
                                </ProfileImg>
                            </ProfileIcon>
                        </IconDiv>
                        <Div>
                        <span>{currentUser.username}</span>
                        <span>{currentAdd.category}</span>
                        </Div>
                        <i className="fa-solid fa-xmark" onClick={()=>{setCurrentChat(null)}}></i>
                    </Head>
                    <Chats>
                        {
                            messages?.map((m) => (
                                <div ref={scrollRef} key={m._id}>
                                    <MsgChats msg = {m.text} own = {m.sender === userId} />
                                </div>
                            ))
                        }
                    </Chats>
                    <TypeMsg>
                        <SelectInput>
                            <div style={{ backgroundColor: inputType === "q" ? "#cccccc" : "transparent"}} onClick={()=>{setInputType("q")}}>Questions</div>
                            {  !(currentAdd.createdbygoogleId === userId) &&
                                <div style={{ backgroundColor: inputType === "o" ? "#cccccc" : "transparent"}} onClick={()=>{setInputType("o")}}>MakeOffer</div>
                            }
                        </SelectInput>
                        {
                            currentAdd.sold ?
                            <>
                            <Advice>
                                Item is Sold
                            </Advice> 
                            <div></div>
                            </>
                                : 
                                (
                            inputType === "o" ? 

                            <>
                            <Advice>
                                Expected price is ₹ {currentAdd.price}
                            </Advice>
                            <GetInput onSubmit={sendmsg}>
                                <input type="number" value={msg || ""} onChange={handleChange} />
                                <button type='submit'>send</button>
                            </GetInput>
                            </> :
                            <>
                            <Advice>
                                Write your Querry
                            </Advice>
                            <AskInput onSubmit={sendQ}>
                                <input type="text" value={que || ""} onChange={handleChangeQ} />
                                <button type='submit'>send</button>
                            </AskInput>
                            </>
                                )
                        }
                    </TypeMsg>
                </ChatBox>}
            </Container>

        </div>
    )
}

export default Message

const Container = styled.div`
    display: flex;
    width: 100%;
    @media (max-width: 700px) {
        display: block;
    }
`

const Inbox = styled.div`
    width: 40%;
    max-width: 350px;
    height: 80vh;
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
    border: solid #cccccc;
    @media (max-width: 700px) {
        width: 100%;
        margin: auto;
    }
`
const Heading = styled.div`
    width: 100%;
    height: 50px;
    padding: 0.2rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px #cccccc;
`
const ChatBox = styled.div`
    width: 60%;
    height: 80vh;
    border: solid #cccccc;
    @media (max-width: 700px) {
        width: 100%;
        max-width: 350px;
        margin: auto;
    }
`
const Head = styled.div`
    width: 100%;
    height: 50px;
    padding: 0.2rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px #cccccc;
    position: relative;
    i {
        cursor: pointer;
    }
`
const Div = styled.div`
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        text-transform: capitalize;
`
const IconDiv = styled.div`
    /* width: 30%; */
    height: 100%;
    display: flex;
    padding: 0.3rem 0.5rem 0.3rem 0;
    position: relative;
`
const ProductImg = styled.div`
    /* width: 100%; */
    height: 100%;
    /* border: solid; */
    img {
        display: block;
        /* width: 100%; */
        height: 100%;
        contain: content;
    }
`
const ProfileIcon = styled.div`
  width: 40%;
  height: 40%;
  /* max-height: calc(2/5 * 70px); */
  padding-top: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  /* position: relative; */
  /* background-color: green; */
  /* margin-right: 0.5rem; */
`
const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: yellow; */
  img {
    width: 100%;
    height: 100%;
    contain: content;
    border-radius: inherit;
    /* border: solid 1px; */
  }
`



const Chats = styled.div`
    width: 100%;
    height: 50%;
    padding: 0.2rem 0rem;
    /* display: flex; */
    /* justify-content: space-between;
    align-items: center; */
    box-shadow: 0 2px #cccccc;
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
    /* background-color: #cccccc; */
`
const SelectInput = styled.div`
    /* height: 10px; */
    width: 100%;
    /* background-color: red; */
    display: flex;
    justify-content: center;
    /* border: solid #cccccc; */
    box-shadow: 0 1px #cccccc;
    div:nth-child(2) {
        box-shadow: -1px 0 ;
    }
    div {
        padding: 0.2rem 0.2rem;
        cursor: pointer;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        /* background-color: yellow; */
    }
`
const TypeMsg = styled.div`
    /* background-color: yellow; */
    width: 100%;
    height: calc(50% - 50px);
    padding: 0.2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px #cccccc;
`
const Advice = styled.span`
    text-align: center;
`

const GetInput = styled.form`
    width: 100%;
    background-color: blue;
    input {
        width: 85%;
        height: 30px;
        margin: 0;
    }
    button {
        width: 15%;
        height: 30px;
        font-size: 1rem;
        cursor: pointer;
    }
`
const AskInput = styled(GetInput)`
    
`