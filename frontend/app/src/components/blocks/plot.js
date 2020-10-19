import React, { Component } from 'react'
import Plot from 'react-plotly.js'
import s from '../../style/components/blocks/plot.scss'


export class WeatherPlot extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={s.plotContainer}>
        <Plot
          data={[
            { 
              x: this.props.date,
              y: this.props.temp,
              type: 'scatter',
              mode: 'lines+markers',
              line: {shape: 'spline', color: 'red'},
              name: 'Temperature',
            },
            { 
              x: this.props.date,
              y: this.props.humidity,
              type: 'scatter',
              mode: 'lines+markers',
              line: {shape: 'spline', color: 'blue'},
              visible: "legendonly",
              name: 'Humidity',
            },
            { 
              x: this.props.date,
              y: this.props.pressure,
              type: 'scatter',
              mode: 'lines+markers',
              line: {shape: 'spline', color: 'gray'},
              visible: "legendonly",
              name: 'Pressure',
            },

          ]}
          layout= { 
            {
                title: 'Weather Plot',
                xaxis: {
                  rangeslider: {
                    thickness: 0.15
              },
                  rangeselector: {
                    buttons: [
                    {
                      step: 'month',
                      stepmode: 'backward',
                      count: 1,
                      label: '1m',
                      active: true
                    }, {
                      step: 'month',
                      stepmode: 'backward',
                      count: 6,
                      label: '6m'
                   }, {
                      step: 'year',
                      stepmode: 'backward',
                      count: 1,
                      label: '1y'
                    }, {
                      step: 'all',
                    }
                    ],
                  }
                },
              paper_bgcolor: '#f1f1f1',
              plot_bgcolor: '#e3e3e3'
            }
          }
          style= {{width: "100%", height: "500px"}}
        />
      </div>
    );
  }
}