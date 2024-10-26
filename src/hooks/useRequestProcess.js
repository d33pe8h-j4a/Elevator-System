import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { processNextRequest } from "../store/elevatorStatusSlice";
import { useEffect } from "react";

const useRequestProcessor = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests.requestQueue);
    const isElevatorMoving = useSelector(
        (state) => state.elevatorStatus.isMoving
    );

    useEffect(() => {
        const processRequest = debounce(() => {
            if (requests.length > 0 && !isElevatorMoving) {
                console.log("Dispatching the next request");
                dispatch(processNextRequest());
            }
        }, 200); // 200ms debounce delay

        processRequest();

        return () => processRequest.cancel(); // Cleanup debounce function
    }, [dispatch, requests, isElevatorMoving]);
};

export default useRequestProcessor;
