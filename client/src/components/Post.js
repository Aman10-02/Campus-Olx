import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'

function Post() {
    const api = process.env.REACT_APP_API;
    const navigate = useNavigate()
    const selected = useLocation().state;

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                    const item = { ...inputs, image: downloadURL }; 
                    alert(JSON.stringify(item))
                    //console.log("inputs are ", item)
                    const response = await fetch(api + "adds/post", {
                      method: "POST",
                      mode:"cors",
                      credentials: "include",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                      },
                      body:JSON.stringify(item),
                    });
                    const data = await response.json();
                    //console.log(data)
                    navigate("/");
                }  
        );
    };
    //console.log(file);
    useEffect(() => {
        setInputs({ category: selected })
    }, [selected]);

    return (
        <div className='bodyContainer' style={
            {
                display: 'flex',
                justifyContent: 'center',
            }
        }>
            <Container>
                <h1>Post your Adds</h1>
                <AddDetail onSubmit={handleSubmit}>
                    <Selected>
                        <h2>Selected Category</h2>
                        <div>
                            <input type="hidden" name='category' value={selected} onChange={handleChange} />
                            <p>{selected}</p>
                            <Link to="/sell">Change</Link>
                        </div>
                    </Selected>
                    <IncludeDetail>
                        <h2>Include some details</h2>
                        <Title>
                            <label>
                                Ad Title
                                <textarea type="text"
                                    name='title'
                                    value={inputs.title || ""}
                                    onChange={handleChange}
                                    placeholder='Mention brand name and catchy info about your product'
                                    required
                                />
                            </label>
                        </Title>
                        <Description>
                            <label>
                                Description
                                <textarea type="text"
                                    name='description'
                                    value={inputs.description || ""}
                                    onChange={handleChange}
                                    placeholder='Give your product description'
                                    required
                                />
                            </label>
                        </Description>
                    </IncludeDetail>
                    <SetPrice>
                        <h2>Set a Price</h2>
                        <label>
                            Price
                            <Inputbox>
                                <span>₹</span>
                                <input type="number"
                                    name='price'
                                    value={inputs.price || ""}
                                    onChange={handleChange}
                                    placeholder='value in numbers'
                                    required
                                />
                            </Inputbox>
                        </label>
                    </SetPrice>
                    <Photos>
                        <h2>Add Photo</h2>
                        <div>
                            <label>
                                <input type="file" id='file' onChange={(e) => setFile(e.target.files[0])} required />
                            </label>
                            {/* <label>
                                <input type="file" />
                            </label>
                            <label>
                                <input type="file" />
                            </label>
                            <label>
                                <input type="file" />
                            </label> */}
                        </div>
                    </Photos>
                    <Submit>
                        <input type="submit" value='Post Now' />
                    </Submit>
                </AddDetail>
            </Container>
        </div>
    )
}

export default Post
const Container = styled.div`
    margin-bottom: 1rem;
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        font-size: 2rem;
        color: darkblue;
    } 
`
const AddDetail = styled.form`
    margin: 1rem 0 0 0;
    border: solid #a7a3a3ab;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const Selected = styled.div`
    padding: 1rem;
    box-shadow: 0px 2px 0px 0px #cccccc;
    div {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        p {
            /* font-weight: bold; */
            font-size: 0.9rem;
            margin-right: 1rem;
        }
        a {
            color: black;
            text-decoration: underline;
            font-size: 0.95rem;
            font-weight: bold;
            :hover {
                color: blue;
            }
        }
    }
`
const IncludeDetail = styled.div`
    padding: 1rem;
    box-shadow: 0px 2px 0px 0px #cccccc;
`
const Title = styled.div`
    margin-top: 0.5rem;
    label {
        display: flex;
        flex-direction: column;
        textarea {
            margin-top: 0.3rem;
            padding: 2px 5px;
            max-width: 400px;
            max-height: 40px;
            resize: none;
        }
    }
`
const Description = styled(Title)`

    label {

        textarea {
            min-height: 60px;
        }
    }
`
const SetPrice = styled.div`
    padding: 1rem;
    box-shadow: 0px 2px 0px 0px #cccccc;
    label {
        display: flex;
        flex-direction: column;
        margin-top: 0.5rem;
        
    }
`
const Inputbox = styled.div`
    display: flex;
    align-items: center;
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px;
        border-radius: 2px;
        margin-top: 0.3rem;
        margin-right: 0.1rem;
        padding: 2px 5px;
        width: 24px;
        height: 24px;
        font-size: 1.3rem;
    }
    input {
            margin-top: 0.3rem;
            padding: 2px 5px;
            width: 100%;
            max-width: 400px;
            resize: none;
        }
`
const Photos = styled.div`
    padding: 1rem;
    box-shadow: 0px 2px 0px 0px #cccccc;
    div {
        width: 100%;
        margin-top: 1rem;
        border: #cccccc;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        input {
            margin: 0.2rem;
            border: solid;
        }
    }
`
const Submit = styled.div`
    padding: 1rem 1.2rem;
    box-shadow: 0px 2px 0px 0px #cccccc;
    input {
        padding: 0.3rem;
        font-weight: bold;
        font-size: 1rem;
        background-color: transparent;
        :hover {
            cursor: pointer;
        }
    }
`