import { useParams } from "react-router-dom";
import { useSlots } from "../../../../hooks/useSlots";
import SlotCard from "./Cards/SlotCard";

function SlotList() {

    const { slug } = useParams();
    const { slots, setSlots } = useSlots(slug);

    return (
        <div className="container mx-auto my-3 grid h-56 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 sm:h-64 xl:h-80 2xl:h-96">
            {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} />
            ))}
        </div>
    );
}

export default SlotList