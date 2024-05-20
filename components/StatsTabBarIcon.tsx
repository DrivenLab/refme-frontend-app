import { Path, Svg } from "react-native-svg";

const StatsTabBarIcon = ({
  color,
  isFocused,
}: {
  color: string;
  isFocused: boolean;
}) => {
  const colorStroke = color || "#090B22";
  const strokeWidth = isFocused ? "2" : "1.5";
  return (
    <Svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.02697 9.20703V16.0672"
        stroke={colorStroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.694 5.92188V16.0646"
        stroke={colorStroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.2843 12.832V16.067"
        stroke={colorStroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.3415 1.00391H6.97005C3.70338 1.00391 1.65576 3.31599 1.65576 6.58906V15.4187C1.65576 18.6918 3.69386 21.0039 6.97005 21.0039H16.3415C19.6177 21.0039 21.6558 18.6918 21.6558 15.4187V6.58906C21.6558 3.31599 19.6177 1.00391 16.3415 1.00391Z"
        stroke={colorStroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default StatsTabBarIcon;
