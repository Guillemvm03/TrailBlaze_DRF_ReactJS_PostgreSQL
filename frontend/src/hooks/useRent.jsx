import { useContext, useCallback, useState } from 'react';
import RentService from '../services/RentService';
import { useToastr } from './useToastr';
import { useNavigate } from 'react-router-dom';
import SlotsContext from "../context/SlotsContext"
import { useAuth } from './useAuth';

export function useRent() {
    const { slots, setSlots } = useContext(SlotsContext);
    const { user, setUser } = useAuth();
    const [userRents, setUserRents] = useState([]);
    const { useCreateToastr } = useToastr();
    const navigate = useNavigate();

    const useStartRent = useCallback( (rent) => {
    // console.log(rent);
        RentService.start_rental(rent)
            .then(({ status, data }) => {
                if (status === 201) {
                    // console.log(rent);
                    // console.log(data);
                    navigate('/profile')
                    useCreateToastr({ staus: true })
                    setSlots(slots.map((item) => {
                        console.log(item.id);
                        if (item.id === data.collection_slot) {
                            return { ...item, status: "free" };
                        }
                        
                        return item;
                    }));
                    setUser({ ...user, rent: data });
                    // console.log(user.rent.id);
                }
            })
            .catch(e => {
                if (e.response.status === 500) {
                    useCreateToastr({ status: true, error: 'wrong', message:"Ha occurido un error con el servidor"})
                }else{
                    useCreateToastr({ status: true, error: 'wrong', message: e.response.data.error})
                }
                console.error(e);
            });
    },[slots]);

    const useEndRent = useCallback( (data) => {
        console.log(data);
        RentService.end_rental(data,user.rent.id)
            .then(({ status }) => {
                if (status === 200) {
                    useCreateToastr({ status: true })
                    navigate('/profile')
                    setSlots(slots.map((item) => {
                        console.log(item.id);
                        if (item.id === data.return_slot) {
                            return { ...item, status: "Active" };
                        }
                        return item;
                    }));
                    
                    setUser({ ...user, rent: null });
                }
            })
            .catch(e => {
                console.error(e);
            });
    },[slots])


    const useGetRents = useCallback((item) => {
        RentService.get_user_rentals(item)
            .then(({ data, status }) => {
                if (status === 200) {
                    console.log(data);
                    setUserRents(data); 
                    
                    // useCreateToastr({ status: true });
                    // navigate('/profile') // 
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [userRents]); 



    return { useStartRent, useEndRent, useGetRents, userRents, setUserRents };
}