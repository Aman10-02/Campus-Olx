import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Ads from './Ads'



function Search() {
  const api = process.env.REACT_APP_API;
  const [isSearch, setIsSearch] = useState(true)
  const [searchedAds, setSearchedAds] = useState([]);
  const input = useLocation().state;
  //console.log(input + "whvje")
  const search = (input) ;
  // && (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase());

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Infinity);
  const [minmax, setminmax] = useState({});
  const [bar, setbar] = useState(false)

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setminmax(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = (e) => {
    //console.log("inside submit", e)
    e.preventDefault();
    //console.log(minmax);
    minmax.min ? setMin(minmax.min) : setMin(0)
    minmax.max ? setMax(minmax.max) : setMax(Infinity)
    setbar(true)
    setminmax({});
  }
  useEffect(() => {
    const getsearchedAds = async () => {
      const response = await fetch(api + "adds/search", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        },
        body: search,
      })
      const data = await response.json();
      //console.log("from getsearchedAdds", data);
      setIsSearch(data.success)
      setSearchedAds(data.searchedAdds);
    }
    getsearchedAds();
  }, [search])

  const clearFilter = () => {
    setMin(0);
    setMax(Infinity);
    setbar(false);
  }
  //console.log(searchedAds)

  return (
    <div className="bodyContainer">
      <span className="bodySpan">{search}</span>

      {isSearch &&
        (<Box>
          <Filter>
            <FilterType>
              <p>Budget</p>
              <a onClick={clearFilter}>Clear all</a>
            </FilterType>
            <Text>choose a range below</Text>
            <Form onSubmit={handleSubmit}>
              <div>
                <input type="number" name='min' placeholder='min' value={minmax.min || ''} onChange={handleChange} />
                <p>to</p>
                <input type="number" name='max' placeholder='max' value={minmax.max || ''} onChange={handleChange} />
              </div>
              <button type="submit" >Apply</button>
            </Form>
          </Filter>
          <Div>
            {bar && (<Filterbar>
              <Budget>
                <p> Budget: <span>{min} - {max}</span> </p>
                <i className="fa-solid fa-xmark" onClick={clearFilter}/>
              </Budget>
            </Filterbar>)}
            <AdContainer>
              {
                searchedAds &&
                searchedAds.map((ads) => (
                  ads.price >= min && ads.price <= max &&
                  <Ads key={ads._id} adDetail={ads} />
                ))
              }
            </AdContainer>
          </Div>
        </Box>)}

      {
        !isSearch &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>No Proudct Found</div>
      }


    </div>
  )
}
export default Search
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  /* background-color: yellow; */
  width: 100%;
  @media (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const Filter = styled.div`
  box-shadow: 0px -2px 2px 0px #cccccc;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  width: 20%;
  height: fit-content;
  padding: 1rem 0.5rem;
  /* background-color: green; */
  margin-right: 1rem;
  @media (max-width: 450px) {
    margin: 0 0 1rem 0;
    width: 100%;
    box-shadow: none;
    border: solid #a7a3a3ab;
  }
  `
const FilterType = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 0 0 0.5rem 0;
    /* background-color: red; */
    
    p {
      font-size: 1.5rem;
    }
    a {
      text-decoration: underline;
      font-size: 0.9rem;
      :hover{
        text-decoration: none;
        cursor: pointer;
      }
    }
    `
const Text = styled.div`
  color: #6c6969;
  padding: 0 0 0.5rem 0;
  `
const Form = styled.form`
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      width: 65%;
      input {
        width: 50%;
        margin-right: 0.5rem;
      }
      p {
        margin-right: 0.5rem;

      }
    }
    button {
      width: 30%;
    }
    `
const AdContainer = styled.div`
  padding: 1rem 1rem;
  box-shadow: 0px -2px  #cccccc;
  width: 100%;
  display: grid;
  justify-content: space-between;
  justify-items: center;
  grid-row-gap: 1rem;
  /* background-color: red; */
  grid-template-columns: repeat(3, 30%);
  @media (max-width: 900px) {
      grid-template-columns: repeat(2,45%);
    }
    @media (max-width: 650px) {
      grid-template-columns: repeat(1,100%);
    }
    @media (max-width: 450px) {
      box-shadow: none;
    }
  `
const Div =styled.div`
  box-shadow: 0px -2px  #cccccc;
  width: 75%;
`
const Filterbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Budget = styled.div`
  p {
    margin-right: 1rem;
  }
  i {
    :hover {
      cursor: pointer;
    }
  }
  display: flex;
  align-items: center;
  background-color: #68a5b9;
  border: solid transparent;
  border-radius: 10px;
  padding: 0.05rem 0.3rem;
  margin: 0.2rem 0 0.3rem ;
`
