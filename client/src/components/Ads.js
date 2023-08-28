import React from 'react'
// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { selectUserFavourite, selectUserName, selectUserAdmin, setUserLogin, selectSocket } from '../features/user/userSlice';

function Ads(props) {
    const api = process.env.REACT_APP_API;
    const favourite = useSelector(selectUserFavourite);
    const dispatch = useDispatch();
    const username = useSelector(selectUserName);
    const socket = useSelector(selectSocket);
    const isAdmin = useSelector(selectUserAdmin);
    //console.log("ads page cookie", process.env.REACT_APP_ADMIN_ID)
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
        //console.log("from fav func", data.updatedUser)
        dispatch(setUserLogin({
            socket: socket,
            googleId: data.updatedUser.googleId,
            name: data.updatedUser.username,
            photo: data.updatedUser.image,
            isAdmin: data.updatedUser.isAdmin,
            favourite: data.updatedUser.favourite,
        }))

        // // //console.log("favourite after dispatch",favourite)
        // //console.log("Adspage:", JSON.stringify(props.adDetail));
        // ? (setFav("solid")) : (setFav("regular")) 
        // )
        // window.location.reload();
    };

    const deleteAdd = async () => {
        alert("add deleted")
        const response = await fetch(api + "adds/delete", {
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
        //console.log("from fav func", data.message)
        // dispatch(setUserLogin({
        //     googleId: data.updatedUser.googleId,
        //     name: data.updatedUser.username,
        //     photo: data.updatedUser.image,
        //     favourite: data.updatedUser.favourite,
        // }))
        window.location.reload();
    }
    // else{
    //     //console.log("nofav")
    // }
    return (
        <Item>
            <Favourite>

                {username ?
                    (favourite && (favourite.includes(props.adDetail._id)) ?
                        <i className={`fa-solid fa-heart fa-xl`} onClick={setfav}></i> :

                        <i className={`fa-regular fa-heart fa-xl`} onClick={setfav}></i>

                    ) :
                    <i className={`fa-regular fa-heart fa-xl`} onClick={() => { alert("Login to continue ") }}></i>


                }


            </Favourite>

            <Link to="/details"
                state={props.adDetail}
            >
                <ImageContainer>
                    <Image src={props.adDetail.image} />
                </ImageContainer>
                <Detail>
                    <div></div>
                    <Text>
                        <span>₹ {props.adDetail.price}</span>
                        <p>{props.adDetail.title}</p>
                    </Text>
                </Detail>
            </Link>
            {
                isAdmin &&
                <OwnAds>

                    <i className="fa-solid fa-trash" onClick={deleteAdd}></i>
                </OwnAds>
            }
        </Item>
    )
}

export default Ads

const Item = styled.div`
    border: solid #a7a3a3ab;
    width: 100%;
    min-width: 160px;
    max-width: 210px;
    height: 266px;
    padding: 5px;
    position: relative;
    &:hover{
        cursor: pointer;
    }

`
const Favourite = styled.div`
    position: absolute;
    top: 0.6em;
    right: 0.6em;
    z-index: 10;
    i:hover{
        cursor: pointer;
    }
`
const ImageContainer = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Detail = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30%;
    position: relative;
    div:first-child{
        position: absolute;
        top: 0;
        left: -5px;
        bottom: -5px;
        width: 3%;
        background-color: yellow;
    } 
`
const Text = styled.div`
    margin-left: 6%;
    display: flex;
    flex-direction: column;
    p{
        color: black;
        font-size: 0.9em;
        letter-spacing: 1.1px;
        overflow: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    span{
        color: black;
        font-weight: 800;
        font-size: 1.4rem;
        margin-bottom: 0.2em;
        margin-top: 0.2em;
    }
`
const Image = styled.img`
    height: 95%;
    max-width: 80%;
    contain: content;
`
const OwnAds = styled.div`
    position: absolute;
    bottom: 0.6em;
    right: 0.6em;
    z-index: 10;
    i {
        cursor: pointer;
        margin-left: 0.5rem;
        padding: 0.3rem;
    }
    i:hover {
        background-color: #cccccc;
        /* border: solid; */
        border-radius: 50%;
    }
`