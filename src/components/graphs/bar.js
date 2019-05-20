import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const Bar = ({ data }) => (
  <>
    <ResponsiveBar
      data={data}
      keys={[
        "hot dog",
        "burger",
        "sandwich",
        "kebab",
        "fries",
        "donut"
      ]}
      indexBy="country"
      margin={{
        "top": 50,
        "right": 130,
        "bottom": 50,
        "left": 60
      }}
      padding={0.3}
      groupMode="grouped"
      colors="nivo"
      colorBy="id"
      defs={[
        {
          "id": "dots",
          "type": "patternDots",
          "background": "inherit",
          "color": "#38bcb2",
          "size": 4,
          "padding": 1,
          "stagger": true
        },
        {
          "id": "lines",
          "type": "patternLines",
          "background": "inherit",
          "color": "#eed312",
          "rotation": -45,
          "lineWidth": 6,
          "spacing": 10
        }
      ]}
      fill={[
        {
          "match": {
            "id": "fries"
          },
          "id": "dots"
        },
        {
          "match": {
            "id": "sandwich"
          },
          "id": "lines"
        }
      ]}
      borderColor="inherit:darker(1.6)"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "country",
        "legendPosition": "middle",
        "legendOffset": 32
      }}
      axisLeft={{
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "food",
        "legendPosition": "middle",
        "legendOffset": -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="inherit:darker(1.6)"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          "dataFrom": "keys",
          "anchor": "bottom-right",
          "direction": "column",
          "justify": false,
          "translateX": 120,
          "translateY": 0,
          "itemsSpacing": 2,
          "itemWidth": 100,
          "itemHeight": 20,
          "itemDirection": "left-to-right",
          "itemOpacity": 0.85,
          "symbolSize": 20,
          "effects": [
            {
              "on": "hover",
              "style": {
                "itemOpacity": 1
              }
            }
          ]
        }
      ]}
    />
  </>
)

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }
//
Bar.defaultProps = {
  data: [
    {
      "country": "AD",
      "hot dog": 82,
      "hot dogColor": "hsl(254, 70%, 50%)",
      "burger": 53,
      "burgerColor": "hsl(128, 70%, 50%)",
      "sandwich": 197,
      "sandwichColor": "hsl(123, 70%, 50%)",
      "kebab": 196,
      "kebabColor": "hsl(288, 70%, 50%)",
      "fries": 112,
      "friesColor": "hsl(260, 70%, 50%)",
      "donut": 48,
      "donutColor": "hsl(255, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 90,
      "hot dogColor": "hsl(287, 70%, 50%)",
      "burger": 39,
      "burgerColor": "hsl(232, 70%, 50%)",
      "sandwich": 27,
      "sandwichColor": "hsl(108, 70%, 50%)",
      "kebab": 92,
      "kebabColor": "hsl(195, 70%, 50%)",
      "fries": 136,
      "friesColor": "hsl(329, 70%, 50%)",
      "donut": 134,
      "donutColor": "hsl(166, 70%, 50%)"
    },
  ]
}

export default Bar

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.