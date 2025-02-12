import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { Container, Logo } from '../index'
import LogoutButton from "./LogoutButton";

const Header = () => {
    const loginDetails = useSelector(state => state.auth);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !loginDetails.isLoggedIn,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !loginDetails.isLoggedIn,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: loginDetails.isLoggedIn,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: loginDetails.isLoggedIn,
        },
    ]
    return (
        <>

            <header className='py-3 shadow bg-gray-800'>
                <Container>
                    <nav className='flex'>
                        <div className='mt-2'>
                            <Link to='/'>
                                <Logo />
                            </Link>
                        </div>
                        <ul className='flex ml-auto'>
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className='inline-bock px-6 py-2 duration-200 cursor-pointer hover:bg-blue-100/5 rounded-full'
                                        >{item.name}</button>
                                    </li>
                                ) : null
                            )}
                            {loginDetails.isLoggedIn && (
                                <li className="">
                                    <LogoutButton />
                                </li>
                            )}
                        </ul>
                    </nav>
                </Container>
            </header>
        </>
    )
}

export default Header