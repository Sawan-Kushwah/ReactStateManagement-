import { logout } from "../../redux/authSlice"
import authservice from "../../appwrite/auth"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";



const LogoutButton = () => {
    const disptach = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await authservice.logout().then(() => disptach(logout()));
        if (response) {
            navigate('/')
        }
    }

    return (
        <div className='inline-bock px-6 py-2 duration-200 cursor-pointer hover:bg-blue-100/5 rounded-full' onClick={handleLogout} >Logout</div>
    )
}

export default LogoutButton