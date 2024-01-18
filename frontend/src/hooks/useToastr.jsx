import { useCallback, useContext } from "react"
import ToastrContext from "../context/ToastrContext";

export function useToastr() {
    const { toastr, setToastr } = useContext(ToastrContext);

    const useCreateToastr = useCallback(data => {
        setToastr(data)
        setTimeout(() => {
            setToastr({ status: false })
        }, 1500);
    }, [toastr]);

    return {
        toastr,
        setToastr,
        useCreateToastr
    }
}