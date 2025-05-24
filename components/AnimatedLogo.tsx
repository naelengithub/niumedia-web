const AnimatedLogo = () => {
  const blocks = [
    { color: "bg-niu01", className: "col-span-1 row-span-1" },
    { color: "bg-niu02", className: "col-span-3 row-span-1" },
    { color: "bg-niu04", className: "col-span-2 row-span-2" },
    { color: "bg-niu03", className: "col-span-4 row-span-1" },
  ];

  return (
    <div className="flex items-center justify-center w-fit">
      <div className="grid grid-cols-6 grid-rows-2 gap-0.5 w-16 h-8">
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
    </div>
  );
};

export default AnimatedLogo;
