import React from 'react';
import ReactDOM from 'react-dom';
require("../scss/style.scss")
// 8e58f891562ae902355026d0154ca7e6
// 9ae4ed1ac639ddc86076ade7d88f31cb
// 8ffa6fcb7a9453700d6ab0f782d706a2
document.addEventListener('DOMContentLoaded', function(){
    class Weather extends React.Component{
      constructor(props){
        super(props)
        this.state={
          weather :"",
          temp: "",
          maxtemp:"",
          minTemp:"",
          humidity:"",
          pressure:"",
          windSpeed: "",
          sunrise: "",
          sunset: "",
          country:"",
          code:"",
          city:""
        }
      }
      componentDidUpdate(prevProps){
        if(this.props.city!=prevProps.city){
        const url = "http://api.openweathermap.org/data/2.5/weather?q="+this.props.city+"&units=metric&APPID=8e58f891562ae902355026d0154ca7e6"
          fetch(url).then(response=>{
            if(response.ok){
              return response.json();
            }
            else{
              console.log(response);
            }
          }).then( data => {
            this.weatherRender(data);
          }).catch( err => {
            console.log( err );
          });
        }
      }
      componentWillMount(){
        const url = "http://api.openweathermap.org/data/2.5/weather?q="+this.props.city+"&units=metric&APPID=8e58f891562ae902355026d0154ca7e6"
          fetch(url).then(response=>{
            if(response.ok){
              return response.json();
            }
            else{
              console.log(response);
            }
          }).then( data => {
            this.weatherRender(data);
          }).catch( err => {
            console.log( err );
          });
      }



      weatherRender(data){
          console.log(data);
        this.setState({
          weather: data.weather[0].description,
          temp: data.main.temp,
          maxtemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windSpeed: data.wind.speed,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          country: data.sys.country,
          code: data.weather[0].id,
          city: data.name
        })
      }
      render(){
        if(this.state.code==""){
          return null
        }
        else{
          let icons;
           if(this.state.code.toString()[0]=="2"){
            icons = <div className="weatherContent"><div className = "stormy"></div></div>
          }
          else if(this.state.code.toString()[0]=="3"){
            icons = <div className="weatherContent"><div className = "rainy"></div></div>
          }
          else if(this.state.code.toString()[0]=="5"){
            icons = <div className="weatherContent"><div className = "rainy"></div></div>
          }
          else if(this.state.code.toString()[0]=="6"){
            icons = <div className="weatherContent"><div className = "snowy"></div></div>
          }
          else if(this.state.code.toString()[0]=="7"){
            icons =   <div className="weatherContent">
                        <div className="mists">
                          <div className="cloud">\</div>
                            <div className="mist">
                              <div className="mist-box">
                                <div className="mist-inner"></div>
                                </div>
                              </div>
                            </div>
                          </div>
          }
          else if(this.state.code.toString()=="800"){
            icons = <div className="weatherContent"> <div className = "sunny"></div></div>
          }
          else if(this.state.code.toString()[0]=="8"){
            icons = <div className="weatherContent">
                        <div className = "fewCloud">
                          <div className="sunny"></div>
                            <div className="cloud"></div>
                        </div>
                      </div>
          }
          return <div className="weather">
                  <div className="cityName">{this.state.city}, {this.state.country}</div>
                  {icons}
                  <div className="weatherDescription">{this.state.weather}</div>
                  <div className="temperature">{this.state.temp} &#8451;</div>
                  <div className="mainIndicator">
                    <div className="humidity">{this.state.humidity}%</div>
                    <div className="pressure"> {this.state.pressure} hPa</div>
                    <div className="windSpeed">{this.state.windSpeed}<sup>meter</sup>/<sub>sec</sub></div>
                  </div>
                  </div>
        }
        }

    }
    class SearchBar extends React.Component{
      constructor(props){
        super(props)
        this.state={
          value: ""
        }
      }
      handleChange= event =>{
        this.setState({
          value: event.target.value
        })
      }
      handleClick = () =>{
        if(typeof this.props.search === "function"){
          this.props.search(this.state.value)
        }
      }
      render(){
        return <div className="searchBar">
                <input className="input" type="text" onChange={this.handleChange} value={this.state.value}/>
                <button className="button" onClick={this.handleClick}>Szukaj</button>
              </div>
      }
    }
    class App extends React.Component{
      constructor(props){
        super(props)
        this.prevCity={
          city:""
        }
        this.state={
          city: "",
        }
      }
      searchCity = city =>{
        this.setState({
          city: city
        })
      }
      render(){
        let weatherComp ="";
        if (this.state.city!= ""){
          weatherComp = <Weather city={this.state.city} prevCity={this.prevCity.city}/>
        }
        else{
          weatherComp =  null
        }

        return <div className="container">
                    <div className="ipad">
                    <SearchBar search={this.searchCity}/>
                      {weatherComp}
                      <div className="circle"></div><div className="webCam"></div>
                    </div>
                </div>

      }
    }
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
