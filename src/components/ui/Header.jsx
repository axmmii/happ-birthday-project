import { memo } from "react";
import { motion } from "framer-motion";

const Header = memo(({ content: { title, subtitle } }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-[#44a7f2]"
    >
        <h1 className="text-8xl font-medium w-[350px] text-wrap font-['Kanit']">
            {title}
        </h1>
        <h1 className="text-6xl font-bold w-[350px] text-wrap font-['Kanit'] text-center">
            {subtitle}
        </h1>
    </motion.div>
));

export default Header;
