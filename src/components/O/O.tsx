type OProps = {
  size?: string | number;
  color?: string;
  strokeWidth?: number;
};

function O({ size = "60%", color = "#6e5745", strokeWidth = 10 }: OProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

export default O;
