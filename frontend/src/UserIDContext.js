import React, {createContext, useState} from "react"; 
const UserIDContext = createContext(""); 

function UserIDProvider({children}) {
    const [curUserID, setCurUserID] = useState("");
    const obj = {
        curUserID: curUserID, 
        setCurUserID: setCurUserID
    } 
    return (
        <UserIDContext.Provider value={obj}>
            {children}
        </UserIDContext.Provider>
    );
}

export default UserIDProvider; 
export {UserIDContext};