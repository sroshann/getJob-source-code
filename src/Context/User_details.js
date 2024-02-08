import { createContext, useState } from "react";

export const UDContext = createContext( null )
export default function UserDetailsContext( { children } ) {

    const [ user_details , setUserDetails ] = useState( null )

    return (

        <UDContext.Provider value={ { user_details , setUserDetails } }>

            { children }

        </UDContext.Provider>

    )

}