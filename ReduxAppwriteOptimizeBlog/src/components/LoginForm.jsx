import authservice from '../appwrite/auth'
import { login as storeLogin } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Logo, Input, Button } from './index'
import { useState } from 'react'


const LoginForm = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        // console.log("Login form data : ", data);
        setError("")
        try {
            const session = await authservice.login(data);
            if (session) {
                const userData = await authservice.getCurrentUser();
                if (userData) dispatch(storeLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error)
        }
    }

    return (<>

        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="mx-auto w-full max-w-lg bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-700">
                <div className="flex flex-col items-center">
                    <span className="inline-block w-24 mb-4">
                        <Logo width="100%" />
                    </span>
                    <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
                    <p className="mt-2 text-base text-gray-400">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-gray-700 border-gray-600 focus:border-primary"
                        {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        className="bg-gray-700 border-gray-600 focus:border-primary"
                        {...register("password")}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-primary  py-2 rounded-lg hover:bg-opacity-90"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>


    </>
    )
}

export default LoginForm