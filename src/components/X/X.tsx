type XProps = {
  size?: string | number;
  color?: string;
  strokeWidth?: number;
};

function X({ size = "60%", color = "#6e5745", strokeWidth = 10 }: XProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <line x1="20" y1="20" x2="80" y2="80" stroke={color} strokeWidth={strokeWidth} />
      <line x1="80" y1="20" x2="20" y2="80" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

export default X;
