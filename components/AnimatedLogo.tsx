"use client";

import { motion } from "framer-motion";

const AnimatedLogo = () => {
  const blocks = [
    { color: "bg-niu01", className: "col-span-1 row-span-1" },
    { color: "bg-niu02", className: "col-span-3 row-span-1" },
    { color: "bg-niu04", className: "col-span-2 row-span-2" },
    { color: "bg-niu03", className: "col-span-4 row-span-1" },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-fit">
        <div className="flex">
          <div className="grid grid-cols-6 grid-rows-2 gap-0.5  w-12 h-6 sm:w-16 sm:h-8">
            {blocks.map((block, index) => (
              <div
                key={index}
                className={`relative logo-block ${block.className} bg-black overflow-hidden`}
              >
                <div
                  className={`absolute bottom-0 left-0 w-full h-full ${block.color} fill-up`}
                />
              </div>
            ))}
          </div>
          <motion.div
            className="flex flex-col items-center justify-center w-fit"
            initial={{ color: "#000000" }}
            animate={{ color: "#ffffff" }}
            transition={{
              delay: 2.3,
              duration: 1.5,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <h1 className="font-myriad text-3xl sm:text-4xl leading-none tracking-tight pl-2">
              Niumedia
            </h1>
          </motion.div>
        </div>
        <motion.div
          className="font-myriad overflow-hidden w-42 sm:w-52"
          initial={{ color: "#000000" }}
          animate={{ color: "#ffffff" }}
          transition={{
            delay: 2.3,
            duration: 1.5,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <div className="flex justify-between text-xs sm:text-sm lg:text-md font-medium tracking-wider w-full">
            {"networks".split("").map((char, i) => (
              <span key={i} className="">
                {char}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
