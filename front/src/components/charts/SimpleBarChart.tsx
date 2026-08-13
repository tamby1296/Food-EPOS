export interface IBarChartPoint {
  label: string;
  value: number;
}

interface ISimpleBarChartProps {
  data: IBarChartPoint[];
  height?: number;
  color?: string;
}

const SimpleBarChart: React.FC<ISimpleBarChartProps> = ({
  data,
  height = 180,
  color = "var(--kAppCoral)",
}) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="w-full flex items-end gap-3" style={{ height }}>
      {data.map((point) => (
        <div
          key={point.label}
          className="flex-1 h-full flex flex-col items-center justify-end gap-2"
        >
          <div
            className="w-full max-w-8 rounded-t-md transition-all"
            style={{
              height: `${(point.value / max) * 100}%`,
              backgroundColor: color,
            }}
          />
          <p className="text-xs text-kAppCoolGray">{point.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SimpleBarChart;
