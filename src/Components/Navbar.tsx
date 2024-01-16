import React from 'react'
import { MdOutlineSearch } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import "./index.css"


const Navbar = () => {
    return (
        <div className='navbarSection'>
            <div className="left">
                <div className="News">News</div>
                <div className="Protal">portal</div>
            </div>
            <div className="right">
                <MdOutlineSearch />
                <IoIosLogOut />
            </div>
        </div>
    )
}

export default Navbar