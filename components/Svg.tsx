import { svgs, type SvgName } from "util/lib/icons/googleIconSvgs";

export const svgNames = Object.keys(svgs) as SvgName[];

export interface SvgProps {
  name: SvgName;
  fill?: string;
  hoverFill?: string | undefined;
  className?: string;
}

export function Svg({ name, fill = "#000000", hoverFill, className = "" }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 -960 960 960"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fill={hoverFill || fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={svgs[name]} />
    </svg>
  );
}
