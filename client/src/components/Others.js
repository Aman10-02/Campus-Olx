import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Gridcontainer from './Gridcontainer'
import { useSelector } from 'react-redux'
import { selectUserAdmin } from '../features/user/userSlice';

function Others() {
    const api = process.env.REACT_APP_API;
    const seller = useLocation().state;
    const [sellerAds, setSellerAds] = useState(null);
    const [soldAds, setSoldAds] = useState(null);
    const navigate = useNavigate();
    const isAdmin = useSelector(selectUserAdmin);
    //console.log("others page", seller)
    useEffect(() => {
        const getsellerAds = async () => {
            const response = await fetch(api + "adds/seller", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    // "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": true,
                },
                body: JSON.stringify(seller),
            })
            const data = await response.json();
            //console.log("from getsellerAdds", data);
            setSellerAds(data.sellerAdds);
            setSoldAds(data.soldadds);
        }
        getsellerAds();
    }, [seller]);


    const deleteAdd = async() => {
        alert("user deleted")
        const response = await fetch(api + "user/delete", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                Accept: "application/json",
                // "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": true,
            },
            body: seller.googleId,
        })
        const data = await response.json();
        //console.log("from fav func",data.message)
        // dispatch(setUserLogin({
        //     googleId: data.updatedUser.googleId,
        //     name: data.updatedUser.username,
        //     photo: data.updatedUser.image,
        //     favourite: data.updatedUser.favourite,
        // }))
        navigate("/");
    }
    return (
        <div className="bodyContainer">
            <Profile>
                <ImgContainer>
                    <ProfileImg>
                        <img src={seller.image} alt="" />
                    </ProfileImg>
                </ImgContainer>
                <h3>{seller.username}</h3>
                {isAdmin && 
                <i className="fa-solid fa-trash" onClick={deleteAdd}></i>}
            </Profile>
            <span className="bodySpan">Published Ads</span>
            {sellerAds && 
             <Gridcontainer adsToPublish = {sellerAds} /> }
            <span className="bodySpan">Sold Ads</span>
            {soldAds && 
             <Gridcontainer adsToPublish = {soldAds} /> }
        </div>
    )
}

export default Others

const Profile = styled.div`
    width: 100%;
    display: flex;
    padding: 1rem;
    background-color: #9f9d9d;
    align-items: center;
    margin-bottom: 32px;
    position: relative;
    h3 {
        font-size: min(5vw, 40px);
        font-weight: 500;
        text-transform: capitalize;
        /* font-size: max(4vw,25px); */
    }
    i {
        position: absolute;
        bottom: 0.6em;
        right: 0.6em;
        z-index: 10;
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
const ImgContainer = styled.div`
    width: 20%;
    max-width: 150px;
    padding-top: min(20%, 150px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* background-color: green; */
    margin-right: 5vw;
`
const ProfileImg = styled.div`
    width: 100%;
    height: 100%;
    /* border: solid; */
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 0.5rem; */
    position: absolute;
    top: 0;
    left: 0;
    /* background-color: yellow; */
    img {
        width: inherit;
        height: inherit;
        contain: content;
        border-radius: inherit;
    }
`
