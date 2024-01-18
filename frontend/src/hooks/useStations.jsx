import { useCallback, useContext } from "react"
import StationContext from "../context/StationsContext";
import StationService from "../services/StationService";

export function useStations() {
    const { stations, setStations } = useContext(StationContext);

    const useCreateStation = useCallback(data => {
        StationService.CreateStations(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    setStations([...stations, data]);
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
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [stations])

    return { stations, setStations, useCreateStation, useDeleteStation, useUpdateStation };
}