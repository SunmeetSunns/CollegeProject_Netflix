import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getAllMoviesData } from '../store'

export default function SelectGenre({genres,type}) {
    const dispatch=useDispatch()
  return (
  
    <Select className='flex' onChange={e=>{
        console.log(e.target.value)
        dispatch(getAllMoviesData({genres:e.target.value}))
    }}>{genres.map((genre)=>{
        return <option value={genre.genre} key={genre.genre}>{genre.genre}</option>
    })}</Select>
  )
}
const Select=styled.select`
margin-left: 5rem;
cursor: pointer;
background-color: rgba(0,0,0,0.4);
color: white;
font-size:1.4rem;
`;