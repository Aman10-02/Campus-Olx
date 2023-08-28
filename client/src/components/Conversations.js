import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectAdd, selectFriendUser, setCurrentChat } from '../features/currentChat/activeSlice';
import { selectUserGoogleId } from '../features/user/userSlice'

function Conversations({ conv }) {
    const userId = useSelector(selectUserGoogleId);
    const api = process.env.REACT_APP_API;
    //    (conv.members[0] === userId) ? conv.members[1] : conv.members[0];
    const [addConv, setAddConv] = useState(null);
    const [userConv, setUserConv] = useState(null);
    const otherUser = userId ? conv.members.find((member) => member != userId ) : null;
    // //console.log("otherUser", otherUser)
    // const dispatch = useDispatch();
    // const activeAdd = useSelector(selectAdd);
    // const activeFriend = useSelector(selectFriendUser);
    // //console.log(activeAdd)
    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch( api + "adds/conv", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    // "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": true,
                },
                body: JSON.stringify({ addId: conv.addId, user_id: otherUser}),

            })
            const data = await response.json();
            //console.log("from useeffect conver getdetail", data);
            setAddConv(data.Add);
            setUserConv(data.User);
        };
        getDetails();
    }, [])

    return (
        (addConv && userConv) ?
            <Box>
                <IconDiv>
                    <ProductImg>
                        <img src={addConv.image} alt="" />
                    </ProductImg>
                    <ProfileIcon>
                        <ProfileImg>
                            <img src={userConv.image} alt="" />
                        </ProfileImg>
                    </ProfileIcon>
                </IconDiv>
                <Detail>
                    <span>{userConv.username}</span>
                    <p>{addConv.category}</p>
                </Detail>
            </Box> :
            <span>
                loading....
            </span>
    )
}

export default Conversations

const Box = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    box-shadow: 0 1px 0 #cccccc;
    margin-top: 0.2rem;
    cursor: pointer;
    :hover {
        background-color: #ededed;
    }
`
const IconDiv = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    padding: 0.3rem 0.5rem 0.3rem 0;
    position: relative;
`
const ProductImg = styled.div`
    width: 100%;
    height: 100%;
    img {
        display: block;
        width: 100%;
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
const Detail = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    span {
        text-transform: capitalize;
    }
    p {
        font-size: 0.8rem;
        padding-left: 1rem;
        color: #999999;
    }
`