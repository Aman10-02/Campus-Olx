import React from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { selectSocket, selectUserFavourite, selectUserGoogleId, selectUserName, setUserLogin} from '../features/user/userSlice';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

function PriceCard(props) {
    const api = process.env.REACT_APP_API;
    const favourite = useSelector(selectUserFavourite);
    const dispatch = useDispatch();
    const username = useSelector(selectUserName);
    const googleId = useSelector(selectUserGoogleId);
    const socket = useSelector(selectSocket);
    const navigate = useNavigate();
    const isposition = useMediaQuery({ query: `(max-width: 611px)` });
    const [price, setPrice] = useState(props.adDetail.price)
    const [title, setTitle] = useState(props.adDetail.title)
    const handlesubmit = async (e) => {
      e.preventDefault();
      if(title && price){
        const response = await fetch(api + "update/price", {
          method: "POST",
          mode:"cors",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": true,
          },
          body: JSON.stringify({title: title,price: price, id: props.adDetail._id }),
        });
      const data = await response.json();
      //console.log(data)
      navigate("/my-ads");
    }
    else{
      alert("Price and Title can't be empty")
    }
  }
    // //console.log("ads page",username)
    // //console.log("ads page fav", favourite)
    const setfav = async () => {
        const response = await fetch(api + "adds/favourite", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                Accept: "application/json",
                // "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,
            },
            body: props.adDetail._id,
        })
        const data = await response.json();
        //console.log("from fav func",data.updatedUser)
        dispatch(setUserLogin({
            socket: socket,
            googleId: data.updatedUser.googleId,
            name: data.updatedUser.username,
            photo: data.updatedUser.image,
            favourite: data.updatedUser.favourite,
        })) 

        // // //console.log("favourite after dispatch",favourite)
        // //console.log("Adspage:", JSON.stringify(props.adDetail));
        // ? (setFav("solid")) : (setFav("regular")) 
        // )
        // window.location.reload();
    };


  return (
    <Infos>
      <Head>
        <span>₹ {props.adDetail.price}</span>
        { username ? (
          favourite && (favourite.includes(props.adDetail._id)) ?
            <i className={`fa-solid fa-heart fa-xl`} onClick={setfav}></i> :

            <i className={`fa-regular fa-heart fa-xl`} onClick={setfav}></i>
          ) : (
            <i className={`fa-regular fa-heart fa-xl`} onClick={() => {alert("login to continue")}}></i>
          )
        }
      </Head>
      <Title>
        <h5>{props.adDetail.title}</h5>
      </Title>
      {googleId && (props?.adDetail.createdbygoogleId === googleId) &&
            <Edit
              trigger={open => (
                <i className="fa-solid fa-pen"></i>
                // <button className="button">Trigger - {open ? 'Opened' : 'Closed'}</button>
              )}
              position= {isposition ? "bottom right" : "bottom center"}
              closeOnDocumentClick
            >
              <EditBox onSubmit={handlesubmit}>
                Edit Price
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                Edit Title
                <textarea type="text" placeholder='Write your text here' value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type='submit'>Update</button>
              </EditBox>
            </Edit>
           }
    </Infos>
  )
}

export default PriceCard

const Infos = styled.div`
  margin: 1rem 0 0 0;
  padding: 1rem 0.8rem;
  border: solid;
  width: 35;
  position: relative;
  & > i {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    :hover {
      background-color: #cccccc;
      border-radius: 50%;
    }
  }
  /* background-color: yellowgreen; */
`
const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
   margin-bottom: 0.5rem;
   font-size: 1.2rem;
   font-weight: bold;
   span {
      font-size: min(175%, 30px);
      /* font-weight: 500; */
      /* font-size: max(4vw,25px); */
      color: black;
      max-lines: 1;
  }
  i:last-child {
    cursor: pointer;
  }
`
const Title = styled.div`
  width: 100%;
  display: flex;
  /* background-color: #9f9d9d; */
  align-items: center;
  margin-bottom: 0.5rem;
  h5 {
      font-size: min(150%, 25px);
      font-weight: 500;
      /* font-size: max(4vw,25px); */
      color: black;
  }
`
const EditBox = styled.form`
  /* width: 100px;
  height: 100px; */
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  input {
    margin-top: 0.3rem;
      padding: 2px 5px;
      /* min-height: 60px; */
      width: 50vw;
      min-width: 200px;
      max-width: 400px;
  }
  textarea {
      margin-top: 0.3rem;
      padding: 2px 5px;
      min-height: 50px;
      width: 50vw;
      min-width: 200px;
      max-width: 400px;
      /* max-height: 40px; */
      resize: none;
  }
  button {
    width: 50px;
    margin-top: 0.3rem;
  }
  /* margin: 1rem; */

  /* position: fixed;
  left: 50%; */
  /* left: calc(50%); */
  /* transform: translateX(-100%); */
  /* transform: translateY(-100%); */
`
const Edit = styled(Popup)`
/* position: bottom right; */
  &-overlay {
    background-color: #cccccc;
    opacity: 0.3;
  }
  &-content {
    background-color: #cccccc;
    opacity: 0.9;
    padding: 1rem;
  }
  &-arrow {
    color: #cccccc;

  }
`