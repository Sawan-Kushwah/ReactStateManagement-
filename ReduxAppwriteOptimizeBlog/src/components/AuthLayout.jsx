import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Protected = ({ children, authentication = true }) => {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate()
    const storeAuthStatus = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (authentication && storeAuthStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && storeAuthStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)

    }, [authentication, storeAuthStatus, navigate])

    return loader ? <h1 >Loading...</h1> : <> {children} </>;
}

export default Protected

Protected.propTypes = {
    children: PropTypes.node,
    authentication: PropTypes.bool
}