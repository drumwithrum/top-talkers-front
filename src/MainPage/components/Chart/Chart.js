import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

const chart = (props) => {

return (

<ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={400}
          data= {props.data}
          
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#0F9D58" name="Amount of packets" minPointSize={5} />
        </BarChart>
      </ResponsiveContainer>

)
        }
export default chart