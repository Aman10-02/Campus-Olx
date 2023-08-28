import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { selectUserGoogleId, selectUserName } from '../features/user/userSlice'
import { useSelector } from 'react-redux'




function InfoCard({ add }) {
  const api = process.env.REACT_APP_API;
  const [seller, setSeller] = useState("")
  const username = useSelector(selectUserName);
  const userId = useSelector(selectUserGoogleId);
  const navigate = useNavigate();
  //console.log("add", add)

  const profileClick = ()=>{
    username ? 
    navigate("/others",{state: seller}) : alert("Login to continue")
  }
  useEffect(() => {
    const getSeller = async () => {
      const response = await fetch(api + "user/getdetail", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
        body: add.createdbygoogleId,
      })
      const data = await response.json();
      //console.log("from useeffect getdetail", data)
      setSeller(data.user);
    };
    getSeller();
  }, [add]);

  const CreateConversation = async () => {
      const response = await fetch(api + "conversation", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
        body: JSON.stringify({senderId: userId, receiverId: seller.googleId, addId: add._id}),
      })
      const data = await response.json();
      //console.log("from useeffect create", data);
      navigate("/message", {state:data});

      // setSeller(data.seller);
  }

  return (
    <Infos>
    {seller ?<>
          <Head>
            <span>Seller</span> Description
          </Head>
          <Profile onClick={profileClick}>
            <ImgContainer>
              <ProfileImg>
                <img src={seller.image} alt="" />
              </ProfileImg>
            </ImgContainer>
            <h5>{seller.username}</h5>
          </Profile>
          {!(add.sold) &&
          <Btns>
              <ChatBtn onClick={username ? CreateConversation : () => {alert("Login to continue")}}>
                Chat with seller
              </ChatBtn>
            <ChatBtn2 onClick={username ? CreateConversation : () => {alert("Login to continue")}}>
              Make offer
            </ChatBtn2>
          </Btns>}
        <BuyerContainer>

        </BuyerContainer>
        </>
       : 
        <span>Loading..</span>
       }
      </Infos>
    
  )
}

export default InfoCard

const Infos = styled.div`
  margin: 1rem 0 0 0;
  padding: 1rem 0.8rem;
  border: solid;
  width: 35;
  /* background-color: yellowgreen; */
`
const Head = styled.div`
   margin-bottom: 0.5rem;
   font-size: 1.1rem;
   font-weight: bold;
`
const Profile = styled.div`
  width: 100%;
  display: flex;
  /* background-color: #9f9d9d; */
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
  h5 {
      width:78%;
      text-transform: capitalize;
      font-size: min(150%, 25px);
      /* font-weight: 500; */
      /* font-size: max(4vw,25px); */
      color: black;
      max-lines: 1;
  }
`
const ImgContainer = styled.div`
  width: 18%;
  max-width: 80px;
  padding-top: min(18%, 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: green; */
  margin-right: 0.5rem;
`
const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
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
  }
`
const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const ChatBtn = styled.div`
  width: 49% !important ;
  border: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 80%;
  /* padding: 0.5rem; */
  font-weight: bold;
  color: black;
  cursor: pointer;
`
const ChatBtn2 = styled(ChatBtn)`
  
`
const BuyerContainer = styled.div`

  `