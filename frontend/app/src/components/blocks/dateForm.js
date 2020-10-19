import React, { Component } from 'react'
import DateAPI from '../../api/dateAPI.js'
import s from '../../style/components/common/dateSelector.scss'
import { actionChangeValues } from '../../actions.js'


const dateAPI = new DateAPI()

export class DateForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: '',
            finishDate: '',
        }
        
        this.getFormValues = this.getFormValues.bind(this)
        this.getValue = this.getValue.bind(this)
        this.sender = this.sender.bind(this)
    }

    sender(result) {
                const dispatch = this.props.dispatch
                let weatherObj = {
                    humidity: [],
                    pressure: [],
                    temp: [],
                    date: [],
                }

                for (let value of result['weather']) {
                    weatherObj.humidity.push(value.humidity)
                    weatherObj.pressure.push(value.pressure)
                    weatherObj.temp.push(value.temp)
                    weatherObj.date.push(value.date)
                }    

                dispatch(actionChangeValues(weatherObj))
            }


    getFormValues(e) {
        e.preventDefault()
        let dataSetObj = {
            startDate: this.state.startDate,
            finishDate: this.state.finishDate,
        }
        dateAPI.getDate(dataSetObj).then((result) =>
            this.sender(result),
            (error) => {
                // произошла ошибка, временно невозможно получить данные
                // сделать обработку и вывести
                console.log(error)
            }
        )
    }

    getValue(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    
    componentDidMount() {
        dateAPI.getDate().then(
      (result) => this.sender(result)
      )
    }

    render () {
        return (
            <div className={ s.dateSelectorContainer }>
                <form onSubmit={this.getFormValues}>
                    <h3>Select date</h3>
                    <input 
                        type="date"
                        name="startDate"
                        onChange={this.getValue}
                    ></input>
                    <input 
                        type="date"
                        name="finishDate"
                        onChange={this.getValue}
                    ></input>
                    <button type="submit">Submit</button>
                </form>
                
            </div>
        )
    }
}