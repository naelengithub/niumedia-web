type LogoProps = {
  tone?: "color" | "light" | "dark";
};

export default function Logo({ tone = "color" }: LogoProps) {
  const getColor = (color: string) => {
    if (tone === "dark") return "bg-black";
    if (tone === "light") return "bg-white";
    return color;
  };

  const colors = ["bg-cyan-800", "bg-cyan-400", "bg-cyan-800", "bg-cyan-200"];

  return (
    <div className="flex items-center justify-center w-fit mix-blend-difference">
      <div className="grid grid-cols-4 grid-rows-2 gap-1 w-16 h-8">
        <div className={getColor(colors[0]) + " col-span-1 row-span-1"} />
        <div className={getColor(colors[1]) + " col-span-2 row-span-1"} />
        <div className={getColor(colors[2]) + " col-span-1 row-span-2"} />
        <div className={getColor(colors[3]) + " col-span-3 row-span-1"} />
      </div>
    </div>
  );
}
