import s from './style/general/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from './components/common/header.js'
import { DateForm } from './components/blocks/dateForm.js'
import { WeatherPlot } from './components/blocks/plot.js'
import { connect, Provider } from 'react-redux'

import { store } from './reducer.js'


const mapStateToProps = (state) => {
    // Метод записывает данные из стейта в пропсы компонента

    return {
        humidity: state.humidity,
        pressure: state.pressure,
        temp: state.temp,
        date: state.date,
    }
}

const WrapperWeatherComponent = connect(mapStateToProps)(WeatherPlot)
const WrapperDateComponent = connect(mapStateToProps)(DateForm)


ReactDOM.render(
    <Provider store={store}>
        <div>
            <Header></Header>
            <div className={s.container}>
                <WrapperDateComponent></WrapperDateComponent>
                <WrapperWeatherComponent></WrapperWeatherComponent>
            </div>
        </div>
    </Provider>, 
    document.querySelector('#app')
)