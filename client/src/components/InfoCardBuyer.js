import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserGoogleId } from '../features/user/userSlice';


function InfoCardBuyer({buyer, add}) {
  const api = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const userId = useSelector(selectUserGoogleId); 
  const [buyerDetail, setBuyerDetail] = useState(null);
  //console.log("info card buyer",add)
  useEffect(() => {
    const getBuyer = async () => {
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
        body: buyer?.userGoogleId,
      })
      const data = await response.json();
      //console.log("from useeffect getdetail", data)
      setBuyerDetail(data.user);
    };
    getBuyer();
  }, []);

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
      body: JSON.stringify({senderId: userId, receiverId: buyerDetail.googleId, addId: add._id}),
    })
    const data = await response.json();
    //console.log("from useeffect create", data);
    navigate("/message", {state: data});

    // setSeller(data.seller);
  }

  const Sold = async () => {
    const response = await fetch(api + "adds/sold", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": true,
      },
      body: JSON.stringify({soldTo: buyer.userGoogleId, soldAt: buyer.priceOffered, addId: add._id}),
    })
    const data = await response.json();
    //console.log("from sold", data);
    navigate("/my-ads");

    // setSeller(data.seller);
  }

  return (
    <Infos>
      <Head>
        <span>Buyer</span> Description
      </Head>
      <Link to = "/others"
        state={buyerDetail}
      >
      <Profile>
        <ImgContainer>
          <ProfileImg>
            <img src={buyerDetail?.image} alt="" />
          </ProfileImg>
        </ImgContainer>
        <h5>{buyerDetail?.username}</h5>
      </Profile>
      </Link>
      <Price>
        Offered: <span>₹ {buyer.priceOffered}</span>
      </Price>
      {!add.sold &&
      <Btns>
        <ChatBtn onClick={CreateConversation}>
          Chat with buyer
        </ChatBtn>
        <ChatBtn2 onClick={Sold}>
          Accept offer
        </ChatBtn2>
      </Btns> }
    </Infos>
  )
}

export default InfoCardBuyer

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
  h5 {
      font-size: min(150%, 25px);
      /* font-weight: 500; */
      /* font-size: max(4vw,25px); */
      color: black;
      max-lines: 1;
      text-transform: capitalize;
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
  /* border: solid #000; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0.5rem; */
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: yellow; */
  img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
  }
`
const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const ChatBtn = styled.div`
  border: solid;
  width: 49%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 80%;
  /* padding: 0.5rem; */
  font-weight: bold;
  cursor: pointer;
`
const ChatBtn2 = styled(ChatBtn)`
  
`
const Price = styled(Head)`

`