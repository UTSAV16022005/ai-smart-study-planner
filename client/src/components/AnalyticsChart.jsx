import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const colors = ["#4f46e5", "#8b5cf6", "#10b981", "#f59e0b", "#f43f5e"];

const AnalyticsChart = ({ type = "bar", data = [], dataKey = "value", nameKey = "name", height = 260 }) => (
  <div className="h-full min-h-[220px] w-full">
    <ResponsiveContainer width="100%" height={height}>
      {type === "donut" ? (
        <PieChart>
          <Tooltip />
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} innerRadius={60} outerRadius={90} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry[nameKey]} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} radius={[10, 10, 0, 0]} fill="#4f46e5" />
        </BarChart>
      )}
    </ResponsiveContainer>
  </div>
);

export default AnalyticsChart;
