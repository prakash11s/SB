import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ chartData, keyName, indexName, layout, bottomTitle, leftTitle, legends, colors, colorBy, isCurrency, left, right, tickRotation }) => {
  return (
    <>
        <div style={{ height: 350 }}>
        <ResponsiveBar
                data={chartData}
                keys={ keyName }
                indexBy={ indexName }
                margin={{ top: 50, right: right ? right : 130, bottom: 80, left: left ? left : 180 }}
                padding={0.5}
                layout={ layout }
                label={d => isCurrency ? `R$ ${d.value}` : `${d.value}`}
                valueScale={{ type: "linear" }}
                colorsScheme={ { scheme : 'paired' } }
                colorBy= { colorBy }
                colors={colors}
                animate={true}
                enableLabel={true}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: tickRotation ? tickRotation : 35,
                  legend:  bottomTitle,
                  legendPosition: "middle",
                  legendOffset: 100,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: leftTitle,
                  legendPosition: "middle",
                  legendOffset: -50,
                }}
                legends={legends ? [
                  {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: -110,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]:[]}
              />
        </div>
    </>
  );
};

export default BarChart;
