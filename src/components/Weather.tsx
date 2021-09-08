import React, { Component } from 'react';

type myProps = {}

type myState = {
    temp: number,
    description: string,
    lat: number,
    lon: number
};

class Weather extends React.Component<myProps, myState> {
    constructor(props: myProps){
        super(props)
        this.state = {
            lat: 0,
            lon: 0,
            temp: 0,
            description: ""
        }
        this.getLocation = this.getLocation.bind(this)
        this.getWeather = this.getWeather.bind(this)
    }

    getLocation () {
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            })
            console.log(this.state.lat , this.state.lon);
          },
          error => console.log(error)
          )
        //   console.log(this.state);
        }
    
    getWeather () {        
        const { lat, lon } = this.state
        const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=26f179f37713a7811deffc9d54bcf54b`

        console.log(URL);

        // let res = await fetch(URL)
        // let json = await res.json()
        // console.log(json);

        fetch(URL)
        .then(res => res.json())
        .then(json => {
        this.setState({
            temp: json.main.temp,
            description: json.weather[0].description
        })
        console.log(this.state.description);
        
    }) .catch (error => console.log(error))
}
    
componentDidMount(){
    this.getLocation()
}

componentDidUpdate(prevProps: myProps, prevState: myState){
    if (prevState.lat !== this.state.lat){
        console.log('state has changed');
        this.getWeather()
    }
}

    render() {
        return(
            <div>
                <p>
                    {this.state.temp}
                    {this.state.description}
                </p>
            </div>
        )
    }
}

export default Weather