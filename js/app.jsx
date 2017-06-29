import React from 'react';
import ReactDOM from 'react-dom';
require("../scss/style.scss")
// 8e58f891562ae902355026d0154ca7e6
// 9ae4ed1ac639ddc86076ade7d88f31cb
// 8ffa6fcb7a9453700d6ab0f782d706a2
// AIzaSyAuTRmCE8iOVHrEXSHnrc0oJ_M-AlkDH14

document.addEventListener('DOMContentLoaded', function() {
  class LocalTime extends React.Component{
    constructor(props){
      super(props)
      this.state={
        time:""
      }
    }
    componentDidUpdate(prevProps){
      if(prevProps.lat != this.props.lat){
    let targetDate = new Date() // Current date/time of user computer
    let timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
    timestamp = Math.round(timestamp);
    const url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + this.props.lat + ", " + this.props.lon + "&timestamp=" + timestamp + "&key=AIzaSyAuTRmCE8iOVHrEXSHnrc0oJ_M-AlkDH14"
    fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response);
      }
    }).then(time => {
      this.checkTime(time);
    }).catch(err => {
      console.log(err);
    })
}}
    componentWillMount(){
    let targetDate = new Date() // Current date/time of user computer
    let timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
    timestamp = Math.round(timestamp);
    const url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + this.props.lat + ", " + this.props.lon + "&timestamp=" + timestamp + "&key=AIzaSyAuTRmCE8iOVHrEXSHnrc0oJ_M-AlkDH14"
    fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response);
      }
    }).then(time => {
      this.checkTime(time);
    }).catch(err => {
      console.log(err);
    })
}

    checkTime = (time) => {
      if(this.intervalId!=0){
        clearInterval(this.intervalId)
      }
        this.intervalId = setInterval(()=>{
      var targetDate = new Date() // Current date/time of user computer
      var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
      timestamp = Math.round(timestamp);
      var offsets = time.dstOffset * 1000 + time.rawOffset * 1000 // get DST and time zone offsets in milliseconds
      var localdate = new Date(timestamp * 1000 + offsets)
      this.setState({
        time: new Date(timestamp * 1000 + offsets).toString().slice(16,24)
      })
      },1000)
    }
    render(){

      return <div className="Time"><h1>{this.state.time}</h1><h4>Local Time</h4></div>
    }
  }
  class Weather extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        weather: "",
        temp: "",
        humidity: 0,
        pressure: 850,
        windSpeed: 0,
        sunrise: "",
        sunset: "",
        country: "",
        code: "",
        city: "",
        cordLat: 0,
        cordLon: 0,
        citiCode: "",
      }
    }
    componentDidUpdate(prevProps) {
      if (this.props.city != prevProps.city) {
        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.props.city + "&units=metric&APPID=8e58f891562ae902355026d0154ca7e6"
        fetch(url).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
          }
        }).then(data => {
          this.weatherRender(data);
        }).catch(err => {
          console.log(err);
        });
      }
    }
    componentWillMount() {
      const url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.props.city + "&units=metric&APPID=8e58f891562ae902355026d0154ca7e6"
      fetch(url).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
        }
      }).then(data => {
        this.weatherRender(data);
      }).catch(err => {
        console.log(err);
      });
    }

    weatherRender(data) {
      console.log(data);
      this.setState({
        citiCode: data.id,
        weather: data.weather[0].description,
        temp: data.main.temp,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        country: data.sys.country,
        code: data.weather[0].id,
        city: data.name,
        windSpeed: data.wind.speed,
        pressure: 850,
        humidity: 0,
        cordLat: data.coord.lat,
        cordLon: data.coord.lon,
        localTime: "",
        localTimeMin: 0,
        sunriseMin: 0,
        sunsetMin: 0,

      })
      this.intervalId = setInterval(() => {
        this.setState({
          pressure: this.state.pressure + 1
        })
        if (this.state.pressure == data.main.pressure) {
          clearInterval(this.intervalId)
        }
      }, 10)
      this.intervalId2 = setInterval(() => {
        this.setState({
          humidity: this.state.humidity + 1
        })
        if (this.state.humidity == data.main.humidity) {
          clearInterval(this.intervalId2)
        }
      }, 10)
      let targetDate = new Date() // Current date/time of user computer
      let timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
      timestamp = Math.round(timestamp);
      const url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + this.state.cordLat + ", " + this.state.cordLon + "&timestamp=" + timestamp + "&key=AIzaSyAuTRmCE8iOVHrEXSHnrc0oJ_M-AlkDH14"
      fetch(url).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
        }
      }).then(time => {
        this.checkTime(time);
      }).catch(err => {
        console.log(err);
      });

    }


    checkTime = (time) => {
      var targetDate = new Date() // Current date/time of user computer
      var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
      timestamp = Math.round(timestamp);
      var offsets = time.dstOffset * 1000 + time.rawOffset * 1000 // get DST and time zone offsets in milliseconds
      var localdate = new Date(timestamp * 1000 + offsets)
      let sunrise = new Date(this.state.sunrise * 1000 + offsets)
      let sunset = new Date(this.state.sunset * 1000 + offsets)
      let localMin = parseInt(localdate.getHours()) * 60 + parseInt(localdate.getMinutes())
      let sunriseMin = parseInt(sunrise.getUTCHours()) * 60 + parseInt(localdate.getUTCMinutes())
      let sunsetMin = parseInt(sunset.getUTCHours()) * 60 + parseInt(sunset.getUTCMinutes())
      this.setState({
        sunrise: sunrise.toUTCString().slice(17, 22),
        sunset: sunset.toUTCString().slice(17, 22),
        localTimeMin: localMin,
        sunriseMin: sunriseMin,
        sunsetMin: sunsetMin
      })

    }
    render() {
      if (this.state.code == "") {
        return null
      } else {
        let icons;
        if (this.state.localTimeMin > this.state.sunriseMin && this.state.localTimeMin < this.state.sunsetMin) {
          document.querySelector(".ipad").style.backgroundColor = "rgba(19,133,234,0.26)"
          if (this.state.code.toString()[0] == "2") {
            icons = <div className="weatherContent">
              <div className="stormy"></div>
            </div>
          } else if (this.state.code.toString()[0] == "3") {
            icons = <div className="weatherContent">
              <div className="rainy"></div>
            </div>
          } else if (this.state.code.toString()[0] == "5") {
            icons = <div className="weatherContent">
              <div className="rainy"></div>
            </div>
          } else if (this.state.code.toString()[0] == "6") {
            icons = <div className="weatherContent">
              <div className="snowy"></div>
            </div>
          } else if (this.state.code.toString()[0] == "7") {
            icons = <div className="weatherContent">
              <div className="mists">
                <div className="cloud"></div>
                <div className="mist">
                  <div className="mist-box">
                    <div className="mist-inner"></div>
                  </div>
                </div>
              </div>
            </div>
          } else if (this.state.code.toString() == "800") {
            icons = <div className="weatherContent">
              <div className="sunny"></div>
            </div>
          } else if (this.state.code.toString()[0] == "8") {
            icons = <div className="weatherContent">
              <div className="fewCloud">
                <div className="sunny"></div>
                <div className="cloud"></div>
              </div>
            </div>
          }
        }

         else if (this.state.localTimeMin < this.state.sunriseMin || this.state.localTimeMin > this.state.sunsetMin) {
          document.querySelector(".ipad").style.backgroundColor = "rgba(19,133,234,0.86)";
          if (this.state.code.toString()[0] == "2") {
            icons = <div className="weatherContent">
              <div className="starryStorm">
                <div className="starry"></div>
                <div className="stormy"></div>
              </div>
            </div>
          } else if (this.state.code.toString()[0] == "3") {
            icons = <div className="weatherContent">
              <div className="starryRain">
                <div className="starry"></div>
                <div className="rainy"></div>
              </div>
            </div>
          } else if (this.state.code.toString()[0] == "5") {
            icons = <div className="weatherContent">
              <div className="starryRain">
                <div className="starry"></div>
                <div className="rainy"></div>
              </div>
            </div>
          } else if (this.state.code.toString()[0] == "6") {
            icons = <div className="weatherContent">
              <div className="starrySnowy">
                <div className="starry"></div>
                <div className="snowy"></div>
              </div>
            </div>
          } else if (this.state.code.toString()[0] == "7") {
            icons = <div className="weatherContent">
              <div className="mists">
                <div className="cloud"></div>
                <div className="mist">
                  <div className="mist-box">
                    <div className="mist-inner"></div>
                  </div>
                </div>
              </div>
            </div>
          } else if (this.state.code.toString() == "800") {
            icons = <div className="weatherContent">
              <div className="starry"></div>
            </div>
          } else if (this.state.code.toString()[0] == "8") {
            icons = <div className="weatherContent">
              <div className="starryCloud">
                <div className="starry"></div>
                <div className="cloud"></div>
              </div>
            </div>
          }
        }
        return <div className="weather">
          <div className="cityName">{this.state.city}, {this.state.country}</div>
          <div className="content">
            <div className="sunrise">
              <h1>{this.state.sunrise}</h1>
              <h4>Sunrise</h4>
            </div>
            {icons}
            <div className="sunset">
              <h1>{this.state.sunset}</h1>
              <h4>Sunset</h4>
            </div>
          </div>
          <div className="temperature">{this.state.temp}
            &#8451;</div>
          <div className="mainIndicator">
            <div className="humidity">
              <h1>{this.state.humidity}%</h1>
              <h4>Humidity</h4>
            </div>
            <div className="pressure">
              <h1>
                {this.state.pressure}
                hPa</h1>
              <h4>Pressure</h4>
            </div>
            <div className="windSpeed">
              <h1>{this.state.windSpeed}
                <sup>m</sup>
                <span>/</span>
                <sub>s</sub>
              </h1>
              <h4>Wind speed</h4>
            </div>
          </div>
          <LocalTime lat={this.state.cordLat} lon={this.state.cordLon}  />
        </div>
      }
    }

  }
  class SearchBar extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: ""
      }
    }
    handleChange = event => {
      this.setState({value: event.target.value})
    }
    handleClick = () => {
      if (typeof this.props.search === "function") {
        this.props.search(this.state.value)
      }

    }
    render() {
      return <div className="searchBar">
        <input className="input" placeholder="e.g. London, Warsaw" type="text" onChange={this.handleChange} value={this.state.value}/>
        <button className="button" onClick={this.handleClick}>Szukaj</button>
      </div>
    }
  }
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.prevCity = {
        city: ""
      }
      this.state = {
        city: ""
      }
    }
    searchCity = city => {
      this.setState({city: city})
    }
    render() {
      let weatherComp = "";
      if (this.state.city != "") {
        weatherComp = <Weather city={this.state.city} prevCity={this.prevCity.city}/>
      } else {
        weatherComp = null
      }

      return <div className="container">
        <div className="ipad">
          <div className="title">iWeather App</div>
          <SearchBar search={this.searchCity}/> {weatherComp}
          <div className="circle"></div>
          <div className="webCam"></div>
        </div>
      </div>

    }
  }
  ReactDOM.render(
    <App/>, document.getElementById('app'));
});
