import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUserAdmin } from '../features/user/userSlice';
import Gridcontainer from './Gridcontainer.js'


function Recommend() {
    const admin = useSelector(selectUserAdmin);
    const [ads, setAds] = useState(null)
    //console.log("isadmin",admin)

    useEffect(() => {
        //console.log("effect used")
        const api = process.env.REACT_APP_API;
        const getAds = () => {
            //console.log("inside get ads func")
            fetch(api + "adds/get/recommend", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    //console.log("got ads response")
                    if (response.status === 200) return response.json();
                    throw new Error("authentication has been failed!");
                }).catch((err) => {
                    //console.log(err);
                })
                .then((resObject) => {
                    //console.log(resObject.ads)
                    setAds(resObject.ads);
                })
                .catch((err) => {
                    //console.log(err);
                });
        };
        getAds();
    }, []
    );

    return (
        <div className='bodyContainer'>
            <span className='bodySpan'>Recommend</span>
            {/* {console.log("inside return",ads)} */}
            {
                ads &&
                <Gridcontainer adsToPublish={ads} />
            }
        </div>
    )
}

export default Recommend
