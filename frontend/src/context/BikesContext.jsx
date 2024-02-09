import React, { useState, useEffect } from 'react'
import BikesService from '../services/BikesService';

    

const Context = React.createContext({})
export function BikesContext({ children }) {
    const [bikes, setBikes] = useState([])

    useEffect(function () {
        // console.log("aaa");
        BikesService.GetBikes()
            .then(res => {
                setBikes(res.data)
            })
            .catch(e => console.error(e));
    }, [setBikes]);

    return <Context.Provider value={{ bikes, setBikes }}>
        {children}
    </Context.Provider>
}

export default Context