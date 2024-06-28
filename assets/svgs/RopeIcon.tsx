import { Path, Svg, G, ClipPath, Rect, Defs } from "react-native-svg";
type Props = {
  height?: number;
  width?: number;
};
const RopeIcon = ({ width, height }: Props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_812_36321)">
        <Path d="M24 0H0V24H24V0Z" fill="white" fill-opacity="0.01" />
        <Path
          d="M5 16C5 16 5 7.433 5 5.5C5 3.567 6.567 2 8.5 2C10.433 2 12 3.567 12 5.5C12 5.5 12 16.567 12 18.5C12 20.433 13.567 22 15.5 22C17.433 22 19 20.433 19 18.5V8"
          stroke="#090B22"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path d="M20.5 2V8H17.5V2H20.5Z" fill="#58DAFC" />
        <Path
          d="M16 8H17.5M17.5 8V2H20.5V8M17.5 8H20.5M22 8H20.5"
          stroke="#090B22"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path d="M3.5 22V16H6.5V22H3.5Z" fill="#58DAFC" />
        <Path
          d="M8 16H6.5M6.5 16V22H3.5V16M6.5 16H3.5M2 16H3.5"
          stroke="#090B22"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_812_36321">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default RopeIcon;
