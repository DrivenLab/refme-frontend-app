import { Path, Svg } from "react-native-svg";
type Props = {
  height?: number;
  width?: number;
};

const ConeIcon = ({ width, height }: Props) => {
  return (
    <Svg
      width={width ?? "30"}
      height={height ?? "30"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M17.0769 14.7692H6.9231L9.021 10.1538H15.2308L17.0769 14.7692Z"
        fill="#58DAFC"
      />
      <Path
        d="M8.88889 10.0001H15.1111M6.94444 15.0001H17.0556M3 20.0001H21M5 20.0001L10.3 6.37144C10.8287 5.01201 11.093 4.33229 11.4736 4.13418C11.8035 3.96244 12.1965 3.96244 12.5264 4.13418C12.907 4.33229 13.1713 5.01201 13.7 6.37145L19 20.0001"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ConeIcon;
