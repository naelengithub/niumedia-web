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
    <div className={`${className} flex items-center justify-center w-fit`}>
      <div className="grid grid-cols-6 grid-rows-2 gap-0.5 w-16 h-8">
        <div className={getColor(colors[0]) + " col-span-1 row-span-1"} />
        <div className={getColor(colors[1]) + " col-span-3 row-span-1"} />
        <div className={getColor(colors[2]) + " col-span-2 row-span-2"} />
        <div className={getColor(colors[3]) + " col-span-4 row-span-1"} />
      </div>
    </div>
  );
}
