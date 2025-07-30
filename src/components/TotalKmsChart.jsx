import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "2010",
    TotalKm: 332,
  },
  {
    name: "2011",
    TotalKm: 350,
  },
  {
    name: "2012",
    TotalKm: 550,
  },
  {
    name: "2013",
    TotalKm: 644,
  },
  {
    name: "2014",
    TotalKm: 683,
  },
  {
    name: "2015",
    TotalKm: 747,
  },
  {
    name: "2016",
    TotalKm: 747,
  },
  {
    name: "2017",
    TotalKm: 763,
  },
  {
    name: "2018",
    TotalKm: 823,
  },
  {
    name: "2019",
    TotalKm: 866,
  },
  {
    name: "2020",
    TotalKm: 925,
  },
  {
    name: "2021",
    TotalKm: 941,
  },
  {
    name: "2022",
    TotalKm: 994,
  },
  {
    name: "2023",
    TotalKm: 1074,
  },
  {
    name: "2024",
    TotalKm: 1275,
    TotalKmEst: 1275,
  },
  {
    name: "2025",
    TotalKm: 1316,
    TotalKmEst: 1466,
  },
  {
    name: "2026",
    TotalKmEst: 1716,
  },
  {
    name: "2027",
    TotalKmEst: 1871,
  },
  {
    name: "2028",
    TotalKmEst: 1951,
  },
  {
    name: "2029",
    TotalKmEst: 2011,
  },

  {
    name: "2030",
    TotalKmEst: 2100,
  },
];

export default function TotalKmsChart() {
  return (
    <>
      <div
        style={{
          background: "#abbaab",
          background: `linear-gradient(
            90deg,
            rgba(235, 235, 235, 0.8) 0%,
            rgba(255, 255, 255, 0.8) 100%
          )`,
          margin: "0 auto",
          width: "90%",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          marginTop: "50px",
          boxShadow: "-10px 10px 10px rgba(0, 0, 0, 0.65)",
        }}
      >
        <h2
          className="my-3 display-3 fade-in text-center"
          style={{
            fontSize: "clamp(1rem, 5vw, 4rem)",
          }}
        >
          Total kilometri autostrazi
        </h2>
        <hr className="hr" style={{ marginBottom: 0 }}></hr>
      </div>
      <div
        style={{
          width: "90%",
          maxHeight: "60vh",
          aspectRatio: "16 / 9",
          background: "#2980B9",
          background: `linear-gradient(
            90deg,
            rgba(171, 186, 171, 0.9) 0%,
            rgba(255, 255, 255, 0.9) 100%
          )`,

          margin: "0 auto",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "-10px 10px 10px rgba(0, 0, 0, 0.65)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%" className="fade-in">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}km`} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="TotalKmEst"
              stroke="#9c7425ff"
              fill="#ffc658"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="TotalKm"
              stroke="#073d24ff"
              fill="#198754"
              stackId="2"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
