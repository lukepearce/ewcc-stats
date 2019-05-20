import React from 'react'

import { AxisLeft, AxisBottom } from '@vx/axis'
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { localPoint } from '@vx/event';

import { Spring } from 'react-spring'

const BarGraph = (props) => {
  
  function handleMouseOver(event, datum) {
    const coords = localPoint(event.target.ownerSVGElement, event);
    this.props.showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum
    });
  };
  
  function getYData(d) {
    if (props.yType === 'distance') {
      return Math.round(d.stats.ytd_ride_totals.distance / 1000);
    }
    if (props.yType === 'elevation') {
      return Math.round(d.stats.ytd_ride_totals.elevation_gain);
    }
    if (props.yType === 'moving') {
      return Math.round((d.stats.ytd_ride_totals.moving_time / 60) / 60);
    }
    if (props.yType === 'calories') {
      return d.activities.reduce((calorieTotal, activity) => {
        return calorieTotal + activity.kilojoules;
      }, 0);
    }
  }
  
  // Define the graph dimensions and margins
  const width = 800;
  const height = 500;
  const margin = { top: 20, bottom: 20, left: 20, right: 20 };

  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // We'll make some helpers to get at the data we want
  const x = d => `${d.firstname} ${d.lastname}`;
  // Distance
  const y = d => getYData(d);

  // And then scale the graph by our data
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: props.data.map(x),
    padding: 0.4,
  });

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...props.data.map(y))],
  });

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) => scale(accessor(data));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  const axisLeftTickLabel = (
    <text
      fill="rgb(25, 29, 34)"
      opacity="1"
      fontSize={16}
      dy="0.25em"
      textAnchor="middle"
      fontWeight="bold"
    />
  )

  const axisBottomTickLabel = (
    <text
      fill="rgb(25, 29, 34)"
      opacity="1"
      fontSize={16}
      dy="0.25em"
      textAnchor="middle"
      fontWeight="bold"
    />
  )
  
  const padding = 60;
  
  return (
    <svg width={width} height={height} style={{paddingLeft: '3em'}}>
      <Group>
        {props.data.sort((a, b) => {
          return yPoint(a) - yPoint(b);
        }).map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Bar
              key={`bar-${i}`}
              x={xPoint(d) + padding}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill={d.colour}
            />
          )
        })}
        <AxisBottom
          scale={xScale}
          top={yMax}
          left={padding}
          label={props.xLabel}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
          tickLabelComponent={axisBottomTickLabel}
          hideTicks
        />
        <AxisLeft
          scale={yScale}
          top={0}
          left={padding}
          label={props.yLabel}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
          tickLabelComponent={axisLeftTickLabel}
          hideTicks
        />
      </Group>
    </svg>
  )
}

export default BarGraph

// export const query = graphql`
//     {
//         allStravaAthlete {
//             edges {
//                 node {
//                     memberId
//                     stravaId
//                     firstname
//                     lastname
//                     activities {
//                         id
//                         name
//                         distance
//                         total_elevation_gain
//                         moving_time
//                         elapsed_time
//                         start_date
//                         trainer
//                         commute
//                         average_speed
//                         max_speed
//                         average_heartrate
//                         suffer_score
//                         weighted_average_watts
//                         kilojoules
//                     }
//                 }
//             }
//         }
//     }
// `