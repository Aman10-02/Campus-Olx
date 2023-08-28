import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { selectUserGoogleId } from '../features/user/userSlice'
import BuyerGrid from './BuyerGrid'
import InfoCard from './InfoCard'
import PriceCard from './PriceCard'
import Popup from 'reactjs-popup';
import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'

function Details() {
  const api = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const googleId = useSelector(selectUserGoogleId);
  const adDetail = useLocation().state;
  //console.log("google id:", googleId);
  //console.log("adDetail:", adDetail)
  //console.log("details page", adDetail)
  const [des, setDes] = useState(adDetail.description);
  const [file, setFile] = useState(null);
  const [prog, setProg] = useState(null)

  const handleChange = (event) => {
    // alert(event.target.value)
    setDes(event.target.value)
  }

  const submitImg = (event) => {
    event.preventDefault();

    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProg("uploading...");
          //console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              //console.log('Upload is paused');
              break;
            case 'running':
              //console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: http://firebasestorage.googleapis.com/...
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          //console.log('File available at', downloadURL);
          // const item = { ...inputs, image: downloadURL }; 
          // alert(JSON.stringify(item))
          // //console.log("inputs are ", item)
          const response = await fetch( api + "update/image", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ id: adDetail._id, image: downloadURL }),
          });
          const data = await response.json();
          //console.log(data)
          navigate("/my-ads");
        }
      );
    }
    else{
      alert("Image cannot be empty")
    }
  }
  const submitDes = async (event) => {
    event.preventDefault();
    //console.log("des", des)
    if(des){

      const response = await fetch(api + "update/des", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": true,
      },
      body: JSON.stringify({ des: des, id: adDetail._id }),
      });
      const data = await response.json();
      //console.log(data)
      navigate("/my-ads");
    }
    else{
      alert("Description can't be empty")
    }
  }
  return (
    <div className="bodyContainer">
      <Container>
        <ImgContainer>
          <Img src={adDetail.image} onClick={() => window.open(adDetail.image)} />
          {(adDetail.createdbygoogleId === googleId) &&
            <ImgEdit
              trigger={open => (
                // <button className="button">Trigger - {open ? 'Opened' : 'Closed'}</button>
                <i className="fa-solid fa-pen"></i>
              )}
              // modal
              // nested
              position="bottom right"
              closeOnDocumentClick
            >
              <ImgEditBox onSubmit={submitImg}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                {prog && <span> {prog}</span>}
                <button type='submit'>Update</button>
              </ImgEditBox>
            </ImgEdit>}
          {/* <i class="fa-solid fa-pen"></i> */}
        </ImgContainer>
        <Description>
          <span>Description</span>
          <Text>
            {adDetail.description}
          </Text>
          {/* const Tooltip = () => ( */}
          {(adDetail.createdbygoogleId === googleId) &&
            <DescriptionEdit
              trigger={open => (
                <i className="fa-solid fa-pen"></i>
                // <button className="button">Trigger - {open ? 'Opened' : 'Closed'}</button>
              )}
              position="bottom right"
              closeOnDocumentClick
            >
              <DescriptionEditBox onSubmit={submitDes}>
                Description
                <textarea type="text" placeholder='Write your text here' value={des} onChange={handleChange} />
                <button type='submit'>Update</button>
              </DescriptionEditBox>
            </DescriptionEdit>
          }
          {/* ) */}
        </Description>
      </Container>

      <CardContainer>
        {(adDetail.createdbygoogleId !== googleId) &&
          <InfoCardContainer>
            <InfoCard add={adDetail} />
          </InfoCardContainer>
        }
        <PriceCardContainer>
          <PriceCard adDetail={adDetail} />
        </PriceCardContainer>
      </CardContainer>

      {googleId && (adDetail.createdbygoogleId === googleId) &&
        <>{adDetail.sold ?
          <span className='bodySpan'>Sold To</span> :
          <span className='bodySpan'>Buyers Interested</span>
        }
          <BuyerGrid add={adDetail} />
        </>}
    </div>
  )
}

export default Details
const Container = styled.div`
  width: 100%;
  /* background-color: green; */
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* box-shadow: 4px 25px #cccccc; */
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: none;
  }

`
const ImgContainer = styled.div`
  width: 70%;
  max-height: 300px;
  /* background-color: black; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid #cccccc;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
    max-height: 200px;
  }
  i {
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
  /* overflow: hidden; */

`
const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 768px) {
    max-height: 200px;
  }
`
const ImgEdit = styled(Popup)`
  /* background-color: #cccccc; */
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
const ImgEditBox = styled.form`
  /* width: 100px;
  height: 100px; */
  /* background-color: white; */
  display: flex;
  flex-direction: column;
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

const Description = styled.div`
  width: 28%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  /* background-color: blue; */
  @media (max-width: 768px) {
    width: 100%;
    max-height: 200px;
  }

  border: solid #cccccc;
  span {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 0.2rem;
  }
  i {
    position: absolute;
    right: 0.5rem;
    bottom: 0.2rem;
    padding: 0.3rem;
    cursor: pointer;
    :hover {
      background-color: #cccccc;
      border-radius: 50%;
    }
  }
`
const DescriptionEditBox = styled.form`
  /* width: 100px;
  height: 100px; */
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  textarea {
      margin-top: 0.3rem;
      padding: 2px 5px;
      min-height: 60px;
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
const Text = styled.div`
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`
const DescriptionEdit = styled(Popup)`
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
const CardContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: yellow; */
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 610px) {
    flex-direction: column;
  }
`
const InfoCardContainer = styled.div`
  width: 48%;
  @media (max-width: 610px) {
    width: 100%;
  }

`
const PriceCardContainer = styled.div`
  width: 48%;
  @media (max-width: 610px) {
    width: 100%;
  }
`