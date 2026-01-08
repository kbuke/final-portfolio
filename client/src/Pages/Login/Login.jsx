import { useState } from "react"
import { FormGroup } from "../../Components/FormGroup"
import { TextContainers } from "../../Components/TextContainers"
import { useNavigate, useOutletContext } from "react-router"
import { usePost } from "../../Hooks/usePost"
import { LoadingIcon } from "../../Components/LoadingIcon"

export function Login(){
    const [loginError, setLoginError] = useState(false)

    const navigate = useNavigate()

    const appData = useOutletContext()

    const loggedUser = appData?.loggedUser
    const setLoggedUser = appData?.setLoggedUser

    const register = appData?.register 
    const errors = appData?.errors
    const handleSubmit = appData?.handleSubmit
    const isLoading = appData?.isLoading
    const setIsLoading = appData?.setIsLoading

    const handleLogin = (formData) => {
        usePost({
            url: "/api/login",
            body: formData,
            credentials: "include",
            setLoading: setIsLoading,
            onSuccess: (user) => {
                setLoggedUser(user)
                navigate("/admin")
            },
            onError: msg => {
                setLoginError(msg || "Login Failed")
            }
        })
    }

    const loginArray = [
        {
            label: "Please enter email address",
            type: "text",
            name: "userEmail",
            validation: {
                required: "Please enter your email"
            },
            placeholder: "Please enter email"
        },

        {
            label: "Please enter your password",
            type: "password",
            name: "userPassword",
            validation: {
                required: "Please enter your password"
            },
            placeholder: "Please enter password"
        }
    ]

    const loginInputs = (inputArray) => (
        inputArray?.map((input, index) => (
            <div key={index}>
                <input 
                    placeholder={input?.placeholder}
                    type={input?.type}
                    {...register(input?.name, input?.validation)}
                    className="bg-white mb-2 w-full lg:w-100 text-center rounded h-10"
                />

                <FormGroup errorMessage={errors?.[input.name]?.message} />
            </div>
        ))
    )

    return(
        <div className="w-full h-full flex absolute justify-center items-center
        bg-linear-to-br from-purple-100 to-blue-300
        ">
            <form
                className="
                    rounded-xl p-10 bg-black/40 text-center w-[80%] md:w-[40%] lg:w-[30%]
                    flex flex-col justify-center items-center border
                "
                onSubmit={handleSubmit(handleLogin)}
            >
                <h2 className="text-white uppercase mb-3 font-bold text-xl">
                    Login
                </h2>

                {loggedUser
                    ? <h2>You are already logged in</h2>
                    : <>
                        {loginError
                            ? <div className="
                                bg-linear-to-r from-red-500 to-red-700 w-full
                                mb-2 h-10 justify-center items-center flex rounded-2xl
                                text-white
                            ">
                                {loginError}
                            </div>
                            : null
                        }

                        {isLoading
                            ? <LoadingIcon />
                            : null
                        }

                        {loginInputs(loginArray)}

                        <button className="
                            bg-linear-to-r from-green-600 to-green-800
                            uppercase tracking-wider text-white
                        ">
                            Login
                        </button>
                    </>
                }
            </form>
        </div>
    )
}