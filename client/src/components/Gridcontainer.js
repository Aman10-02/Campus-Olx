import React from 'react'
import styled from 'styled-components'
import Ads from './Ads'

function Gridcontainer(props) {
    //console.log( "gridcontainer :", props.adsToPublish)
  return (
    <GridContainer>
        <Items >
            {
                props.adsToPublish.map((ads)=>(
                    <Ads key={ads._id}  adDetail = {ads} />
                ))
            }
        </Items>
    </GridContainer>
  )
}

export default Gridcontainer

const GridContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Items = styled.div`
    display: grid;
    width: 100%;
    padding: 1rem 1rem;
    justify-items: center;
    justify-content: space-around;
    grid-row-gap: 1rem ;
    /*align-items: center; */
    /* background-color: green; */
    grid-template-columns: repeat(4,20%);
@media (max-width: 850px) {

        grid-template-columns: repeat(2,45%);
    }
@media (max-width: 425px) {

        grid-template-columns: repeat(1,100%);
    }
`