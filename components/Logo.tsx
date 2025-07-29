type LogoProps = {
  tone?: "color" | "light" | "dark";
  className?: string;
};

export default function Logo(props: LogoProps) {
  const { tone, className } = props;
  const getColor = (color: string) => {
    if (tone === "dark") return "bg-black";
    if (tone === "light") return "bg-white";
    return color;
  };

  const colors = ["bg-niu01", "bg-niu02", "bg-niu04", "bg-niu03"];

  return (
    <div
      className={`${className} flex flex-col items-center justify-center w-fit text-grey-200`}
    >
      <div className="flex">
        <div className="grid grid-cols-6 grid-rows-2 gap-0.5  w-12 h-6 sm:w-16 sm:h-8">
          <div className={getColor(colors[0]) + " col-span-1 row-span-1"} />
          <div className={getColor(colors[1]) + " col-span-3 row-span-1"} />
          <div className={getColor(colors[2]) + " col-span-2 row-span-2"} />
          <div className={getColor(colors[3]) + " col-span-4 row-span-1"} />
        </div>
        <h1 className="font-myriad text-3xl sm:text-4xl leading-none tracking-tight pl-2">
          Niumedia
        </h1>
      </div>
      <div className="font-myriad overflow-hidden w-42 sm:w-52">
        <div className="flex justify-between text-xs sm:text-sm lg:text-md font-medium tracking-wider w-full">
          {"networks".split("").map((char, i) => (
            <span key={i} className="">
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
