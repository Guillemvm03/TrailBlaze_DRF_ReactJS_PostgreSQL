import { useParams } from "react-router-dom";
import { useSlots } from "../../../../hooks/useSlots";
import SlotCard from "./Cards/SlotCard";

function SlotList() {

    const { slug } = useParams();
    const { slots, setSlots } = useSlots(slug);

    return (
        <div className="container w-4/5 sm:w-auto mx-auto my-3 grid auto-rows-auto h-56 grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4 sm:h-64 xl:h-80 2xl:h-96">
            {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} />
            ))}
        </div>
    );
}

export default SlotList