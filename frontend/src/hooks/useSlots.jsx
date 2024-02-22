import { useCallback, useEffect, useState, useContext } from "react"
import SlotService from "../services/SlotService";
import { useToastr } from "./useToastr";
import SlotsContext from "../context/SlotsContext"

export function useSlots(station_slug = false) {

    const { slots, setSlots } = useContext(SlotsContext);
    // const [ slots, setSlots ] = useState([]);
    const { useCreateToastr } = useToastr();

    useEffect(function () {
        if (station_slug) {
            SlotService.GetSlots(station_slug)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setSlots(data)
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useCreateSlot = useCallback((station_slug) => {
        SlotService.CreateSlot(station_slug)
            .then(({ data, status }) => {
                if (status === 200) {
                    setSlots([...slots, data[0]]);
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [slots]);

    const updateSlot = useCallback((slot) => {
        SlotService.UpdateSlot(station_slug, slot)
            .then(({ data, status }) => {
                if (status === 200) {
                    setSlots(slots.map((item) => {
                        if (item.id === data.id) {
                            return data;
                        }
                        return item;
                    }));
                    useCreateToastr({ status: true })
                }
            })  
            .catch(e => {
                console.error(e);
            });
    }, [slots]);

    const useDeleteSlot = useCallback((station_slug, id) => {
        SlotService.DeleteSlot(station_slug, id)
            .then(({ data }) => {
                if (data === 'Deleted') {
                    setSlots(slots.filter(slot => slot.id !== id));
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [slots]);

    return {
        slots,
        setSlots,
        useCreateSlot,
        updateSlot,
        useDeleteSlot
    }
}