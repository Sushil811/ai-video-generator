import React, { useEffect } from 'react'
import axios from 'axios'
import { UserDetailsContext } from '@/context/UserDetailContext';

function Provider({children}:{children:React.ReactNode}){
    const [userDetails, setUserDetails] = React.useState(null);

    useEffect(()=>{
        CreateNewUser();
    }, [])

    const CreateNewUser = async()=>{
        const result = await axios.post('/api/user',{})
        console.log(result.data);
        setUserDetails(result?.data);
    }
    return (
        <div>
            <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
            {children}
            </UserDetailsContext.Provider>
            </div>
    )
}
export default Provider;
