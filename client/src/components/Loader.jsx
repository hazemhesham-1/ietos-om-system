import { motion } from "motion/react";

const Loader = () => {
    const letters = ["I", "E", "T", "O", "S"];

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex space-x-1 text-6xl font-bold">
                {letters.map((letter, i) => (
                    <motion.span
                        key={`letter-${i+1}`}
                        initial={{ y: 0 }}
                        animate={{ y: [-5, 5, -5] }}
                        transition={{
                            duration: 0.6,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                        className={letter === 'O' ? "text-red-600" : "text-primary-600"}
                    >
                        {letter}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export default Loader;