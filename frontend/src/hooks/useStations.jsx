import { useCallback, useContext, useState } from "react"
import StationContext from "../context/StationsContext";
import StationService from "../services/StationService";
import { useToastr } from "./useToastr";

export function useStations() {
    const { stations, setStations } = useContext(StationContext);
    const { useCreateToastr } = useToastr();
    const [oneStation, setOneStation] = useState({});
    const useCreateStation = useCallback(data => {
        StationService.CreateStations(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    setStations([...stations, data]);
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [stations]);

    const useDeleteStation = useCallback(data => {
        StationService.DeleteStation(data)
            .then(({ status }) => {
                if (status === 200) {
                    setStations(stations.filter((item) => item.slug !== data));
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [stations])

    const useUpdateStation = useCallback(data => {
        StationService.UpdateStation(data.slug, data)
            .then(({ data, status }) => {
                if (status === 200) {
                    setStations(stations.map((item) => {
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
    }, [stations])

    const useGetOneStation = useCallback(item => {
        StationService.GetStation(item)
            .then(({ data, status }) => {
                if (status === 200) {
                    setOneStation(data)
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [oneStation])

    return { stations, setStations, useCreateStation, useDeleteStation, useUpdateStation, useGetOneStation, oneStation };
}