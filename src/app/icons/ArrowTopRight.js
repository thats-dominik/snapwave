export default function ArrowTopRightIcon({ width = 14, height = 14, color = "#000", style = {} }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 20"
        aria-labelledby="arrow-icon"
        role="img"
        style={{ marginLeft: "4px", ...style }}
      >
        <title id="arrow-icon">Arrow pointing to the top right</title>
        <line
          x1="0.54"
          y1="19.4"
          x2="19.29"
          y2="0.61"
          stroke={color}
          strokeWidth="3.5"
          strokeMiterlimit="10"
          fill="none"
        />
        <line
          x1="2.94"
          y1="0.61"
          x2="19.94"
          y2="0.61"
          stroke={color}
          strokeWidth="5"
          strokeMiterlimit="10"
          fill="none"
        />
        <line
          x1="19.39"
          y1="0.01"
          x2="19.39"
          y2="17.01"
          stroke={color}
          strokeWidth="5"
          strokeMiterlimit="10"
          fill="none"
        />
      </svg>
    );
  }