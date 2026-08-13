export interface IDonutChartSlice {
  label: string;
  value: number;
  color: string;
}

interface IDonutChartProps {
  data: IDonutChartSlice[];
  size?: number;
  strokeWidth?: number;
}

const DonutChart: React.FC<IDonutChartProps> = ({
  data,
  size = 160,
  strokeWidth = 22,
}) => {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
    >
      {total < 1 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--kAppCharcoal)"
          strokeWidth={strokeWidth}
        />
      )}
      {data.map((slice) => {
        const fraction = total > 0 ? slice.value / total : 0;
        const dash = fraction * circumference;
        const offset = cumulative;
        cumulative += dash;

        return (
          <circle
            key={slice.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
};

export default DonutChart;
