import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { FaPowerOff, FaSearch, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase.config';
import './Navbar.css'

const Navbar = ({ isScrolled }) => {
    const links = [
        { name: 'Home', link: '/' },
        { name: 'Series', link: '/tv' },
        { name: 'Movies', link: '/movies' },
        { name: 'My List', link: '/mylist' },
    ];
    const [showSearch, setshowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <Container>
            <nav className={`flex ${isScrolled ? 'scrolled' : ''}`}>
                <div className="left flex a-center">
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt='logo' />
                    </div>
                    <ul className="links flex">
                        {
                            links.map(({ name, link }) => {
                                return (
                                    <li key={name}>
                                        <Link to={link}>{name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? "show-search" : ''}`}>
                        <button onFocus={() => setshowSearch(true)} onBlur={() => {
                            if (!inputHover) setshowSearch(false);
                        }}>
                            <FaSearch />
                        </button>
                        <input type='text' placeholder='Search'
                            onMouseEnter={() => setInputHover(true)} onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setInputHover(false);
                                setshowSearch(false)
                            }}></input>
                    </div>
                    <button onClick={() => signOut(firebaseAuth)}>
                        <FaPowerOff />
                    </button>
                    <button className='listPx' onClick={toggleDropdown}>
                        <FaList />
                    </button>
                    {showDropdown && (
                        <ul className="dropdown-content">
                            {links.map(({ name, link }) => (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>
        </Container>
    );
}

export default Navbar;

const Container = styled.div`
.scrolled{
    background-color: black;
}
nav{
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 2rem;
    align-items: center;
    transition: 0.3s ease-in-out;

    .left{
        gap: 2rem;
        .brand{
            img{
                height:4rem;
            }
        }
        .links{
            list-style-type: none;
            gap: 2rem;
            li{
                a{
                    color: white;
                    text-decoration: none;
                }
            }
        }
    }
    .right{
        gap: 1rem;
        button{
            background-color: transparent;
            border:none;
            cursor: pointer;
            &:focus{
                outline: none;
            }
            svg{
                color: #f34242;
                font-size: 1.2rem;
            }
        }
      .listPx{
        svg{
            font-size: 1.2rem;
            color: white;
        }
      }
        .search{
            display: flex;
            gap: 0.4rem;
            align-items: center;
            justify-content: center;
            padding: 0.2rem;
            button{
                background-color: transparent;
                svg{
                    color: white;
                }
            }
            input{
                width: 0;
                opacity: 0;
                visibility: hidden;
                transition: 0.3s ease-in-out ;
                background-color: transparent;
                border: none;
                color: white;
                &:focus{
                    outline: none;
                }
            }

        }
        .show-search{
            border: 1px solid white;
            background-color: rgba(0,0,0,0.6);
            input{
                width: 100%;
                opacity: 1;
                visibility: visible;
                padding: 0.3rem;
            }
        }
    }
}

`
    ;