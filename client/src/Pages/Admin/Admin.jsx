import { useOutletContext, useNavigate } from "react-router"
import { AdminInstitutes } from "./Sections/AdminInstitutes/AdminInstitutes"
import { AdminTech } from "./Sections/AdminTech/AdminTech"

export function Admin(){
    const appData = useOutletContext()

    const loggedUser = appData?.loggedUser
    const setLoggedUser = appData?.setLoggedUser

    const navigate = useNavigate()

    const logOut = () => {
        fetch("/api/logout", {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                setLoggedUser(null)
            }
        })
        .then(navigate("/login"))
    }

    const spanContainer = (text, value) => {
        return(
            <p>
                <span className="font-bold">
                    {text}
                </span> 
                {value}
            </p>
        )
    }

    return(
        loggedUser
            ?<div>
                <button
                    className="bg-linear-to-r from-red-500 to-red-700 absolute right-3 uppercase"
                    onClick={() => logOut()}
                >
                    Log Out
                </button>

                <div className="p-2 absolute top-20 w-full">
                <AdminInstitutes 
                    appData={appData}
                    spanContainer={spanContainer}
                />

                <AdminTech 
                    appData={appData}
                    spanContainer={spanContainer}
                />
                </div>
            </div>
            :<div>
                <h1>You must log in to access this page</h1>
            </div>
    )
}