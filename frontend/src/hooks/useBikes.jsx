import { useCallback, useContext, useState } from "react"
import BikesContext from "../context/BikesContext";
import BikesService from "../services/BikesService";
import { useToastr } from "./useToastr";

export function useBikes() {
    const { bikes, setBikes } = useContext(BikesContext);
    const { useCreateToastr } = useToastr();

    const useCreateBike = useCallback(data => {
        BikesService.CreateBikes(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    setBikes([...bikes, data]);
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [bikes]);

    const useDeleteBike= useCallback(data => {
        BikesService.DeleteBike(data)
            .then(({ status }) => {
                if (status === 200) {
                    setBikes(bikes.filter((item) => item.slug !== data));
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [bikes])

    const useUpdateBike = useCallback(data => {
        BikesService.UpdateBike(data.slug, data)
            .then(({ data, status }) => {
                if (status === 200) {
                    setBikes(bikes.map((item) => {
                        if (item.slug === data.slug) {
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
    }, [bikes])

    return {
        bikes,
        setBikes,
        useCreateBike,
        useDeleteBike,
        useUpdateBike
    }
}