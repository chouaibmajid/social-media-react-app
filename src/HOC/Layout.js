import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
function Layout(props) {
    return (
        <>
            <NavBar />
            {props.children}
        </>
    )
}

export default Layout
