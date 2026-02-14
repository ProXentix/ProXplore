import * as React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";

const Logo = (props) => (
    <Svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect width={100} height={100} rx={24} fill="#E0F2FE" />
        <Circle
            cx={45}
            cy={45}
            r={20}
            stroke="#0EA5E9"
            strokeWidth={8}
        />
        <Path
            d="M60 60L75 75"
            stroke="#0EA5E9"
            strokeWidth={8}
            strokeLinecap="round"
        />
        <Circle cx={75} cy={25} r={6} fill="#F97316" />
    </Svg>
);

export default Logo;
