import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'

const RequireAuth = (props) => {

    const navigate = useNavigate()

    const {currentUser} = useSelector(({user}) => user)

    useEffect(() => {
        if(!currentUser) {
            navigate('/auth/login')
        }
    }, [navigate])

    return currentUser ? props.children : null
}

export default RequireAuth