import React, { useState, useEffect } from 'react'
// import RentService from '../services/RentService';


const Context = React.createContext({})
export function RentContext({ children }) {
    const [rents, setRents] = useState([])

    useEffect(function () {
        RentService.GetRents()
            .then(res => {
                setStations(res.data)
            })
            .catch(e => console.error(e));
    }, [setStations]);

    return <Context.Provider value={{ stations, setStations }}>
        {children}
    </Context.Provider>
}

export default Context