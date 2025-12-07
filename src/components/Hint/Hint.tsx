type HintProps = {
  size?: string | number;
  color?: string;
};

function Hint({ size = "20%", color = "gray" }: HintProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill={color} />
    </svg>
  );
}

export default Hint;
