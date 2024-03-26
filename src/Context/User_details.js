import { createContext, useState } from "react";

export const UDContext = createContext( null )
export default function UserDetailsContext( { children } ) {

    const [ local_storage_data , setUserDetails ] = useState( null )

    return (

        <UDContext.Provider value={ { local_storage_data , setUserDetails } }>

            { children }

        </UDContext.Provider>

    )

}