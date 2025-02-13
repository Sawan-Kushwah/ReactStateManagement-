import { getUserData, logoutUser } from "../../redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";



const LogoutButton = () => {
    const disptach = useDispatch();
    const loginStatus = useSelector(getUserData);
    const navigate = useNavigate();

    const handleLogout = async () => {
        disptach(logoutUser());
        if (!loginStatus.isLoggedIn) {
            navigate('/')
        }
    }

    return (
        <div className='inline-bock px-6 py-2 duration-200 cursor-pointer hover:bg-blue-100/5 rounded-full' onClick={handleLogout} >Logout</div>
    )
}

export default LogoutButton