import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ chartData, innerRadius, colors }) => {
  return (
    <>
        <div style={{ height: 350 }}>
          <ResponsivePie
            data={chartData}
            margin={{ top: 80, right: 80, bottom:80, left: 80 }}
            innerRadius={innerRadius}
            padAngle={0.5}
            label={(d) =>
              d.value === 0 ? <tspan y="-15">{d.value}</tspan> : d.value
            }
            activeOuterRadiusOffset={8}
            borderWidth={1}
            colors={colors}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
          />
        </div>
      
    </>
  );
};

export default PieChart;
