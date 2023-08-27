import React from 'react'
import styled from 'styled-components'
import Ads from './Ads'
import InfoCard from './InfoCard'
import InfoCardBuyer from './InfoCardBuyer'

function BuyerGrid({add}) {
    const buyers = add.interestedBuyer;  
    //console.log("buyergrid",buyers)

  return (
    <GridContainer>
        <Items >
            {add.sold ? (
                <InfoCardBuyer buyer={{userGoogleId: add.soldTo, priceOffered: add.soldAt}} add={add} />
            ) : 
                buyers.length ? 
                buyers.map((buyer, index)=>(
                    <InfoCardBuyer key={index} buyer={buyer} add={add} />
                ))  :
                <Nobuyer>No Buyers Available</Nobuyer>}
        </Items>
    </GridContainer>
  )
}

export default BuyerGrid

const GridContainer = styled.div`
    display: flex;
    justify-content: center;
    /* background-color: red; */
    align-items: center;
    margin-bottom: 1remy;
`
const Items = styled.div`
    /* background-color: blue; */
    display: grid;
    width: 100%;
    /* padding: 1rem 1rem; */
    justify-content: space-between;
    grid-row-gap: 1rem ;
    grid-template-columns: repeat(3,32%);
@media (max-width: 850px) {
        grid-template-columns: repeat(2,45%);
    }
@media (max-width: 600px) {
        grid-template-columns: repeat(1,100%);
    }
`
const Nobuyer = styled.span`
    margin: 1rem auto;
    font-size: 1.1rem;
    color: gray;
`