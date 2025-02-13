import { forwardRef } from "react";
import { motion } from "framer-motion";
import { GiftSection } from "../features";

const MemoryZone = forwardRef(({ isInView, data }, ref) => (
    <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-6"
    >
        <div className="text-4xl pt-10 pl-4 font-extrabold text-[#f78da4]">
            
            Memories Zone 📸
        </div>

        <GiftSection data={data} />
    </motion.div>
));

export default MemoryZone;
