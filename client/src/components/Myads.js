import React, { useState } from 'react'
import Gridcontainer from './Gridcontainer'
import styled from 'styled-components'
import { useEffect } from 'react';
function Myads() {
    const [choice, setChoice] = useState("ads");
    const [adsDetails, setAdsDetails] = useState(null);
    const [soldAdds, setSoldAdds] = useState([]);
    const [bought, setBought] = useState([]);

    useEffect(() => {
      const getmyadds = async () => {

          const response = 
          
          (choice === "ads") ? 
          
            (                
                await fetch('https://campus-olx.onrender.com/adds/myads',{
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

            ) : ( 

                await fetch('https://campus-olx.onrender.com/adds/myads/favourite',{
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
            )
    
            const data = await response.json();
            //console.log("myads:", data.adsneeded)
            setAdsDetails(data.adsneeded);
            setSoldAdds(data.soldAdds);
            setBought(data.bought);
        } 
        getmyadds();
    }, [choice]);
    
  return (
    <div className='bodyContainer'>
        <span className='bodySpan'>
            <AddLink style={{ textDecoration: choice === 'ads' ? 'underline':'none'}}  onClick= {() => {setChoice('ads');}}>
                Ads
            </AddLink>
            <Favourite style={{ textDecoration: choice === 'fav' ? 'underline' : 'none'}} onClick= {() => {setChoice('fav');}}>
                Favourites
            </Favourite>
        </span>
        {adsDetails && 
        <Gridcontainer adsToPublish = {adsDetails} />}
        {soldAdds.length !== 0 && <>
        <span className="bodySpan">Sold Ads</span>
        <Gridcontainer adsToPublish = {soldAdds} />
        </>}
        {bought.length !== 0 && 
        <>
        <span className="bodySpan">Bought Items</span>
        <Gridcontainer adsToPublish = {bought} />
        </>}

    </div>
  )
}

export default Myads
const AddLink = styled.a`
    margin-right: 1rem;
    :hover {
        cursor: pointer;
        color: blue;
    }
    `
const Favourite = styled.a`
    :hover {
        cursor: pointer;
        color: blue;
    }
`