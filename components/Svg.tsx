import { svgs, type SvgName } from "util/lib/icons/googleIconSvgs";

export const svgNames = Object.keys(svgs) as SvgName[];

export interface SvgProps {
  name: SvgName;
  fill?: string;
  className?: string;
}

export function Svg({ name, fill = "#000000", className }: SvgProps) {
  return (
    <svg
      className={`w-full h-full ${className || ""}`}
      viewBox="0 -960 960 960"
      width="100%"
      height="100%"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={svgs[name]} />
    </svg>
  );
}
