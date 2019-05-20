import React from 'react'

import groupBy from 'lodash/groupBy'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { localPoint } from '@vx/event';

import { Spring } from 'react-spring'

const LineGraph = (props) => {
  
    //if (props.yType === 'monthlyDistance') {
      ;
      const series = props.data.map(athlete => {
        return athlete.activities.map(activity => {
          return {
            'month': activity.start_date_local,
            'distance': activity.distance
          }
        })
      });
      //console.log(series);
      const months = ['01','02','03','04','05','06','07','08','09','10','11','12'].reduce(function(acc, cur, i) {
        acc[i] = cur;
        return acc;
      }, {});
      
        months.map(month => {
          return props.data.map(athlete => {
            return athlete.activities.map(activity => {
              if (activity.start_date_local === month) {
                return {
                  'distance': activity.distance
                }
              }
            })
          })
        });

      console.log(months);
    //}
  
  const endseries = [
    {
      '01': 4567,
      '02': 5677,
      '03': 4565
    },
    {
    
    }
  ];

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
  const width = 800;
  const height = 500;
  const margin = { top: 20, bottom: 20, left: 20, right: 20 };
  
  return (
    <svg width={width} height={height} style={{paddingLeft: '3em'}}>
      <Group>
        {props.data.sort((a, b) => {
          return yPoint(a) - yPoint(b);
        }).map((d, i) => {
          return (
            <Group key={`lines-${i}`} top={i * yMax / 2}>
              <LinePath
                data={d}
                x={d => xScale(x(d))}
                y={d => yScale(y(d))}
                stroke={d.colour}
                strokeWidth={1}
                // curve={i % 2 == 0 ? curveMonotoneX : undefined}
                />
            </Group>
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

export default LineGraph

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