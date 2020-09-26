import React, { Component } from 'react';
import './App.css';
const url = "http://ctp-zip-api.herokuapp.com/zip/"


class Cities extends React.Component{                 // C) Child Class - ** NESTIGN COMPONENTS: WILL USE THIS COMPONENT INSIDE ANOTHER COMPONENT
  render() { 
    let cityArray = []                                      // a) make an array of objs to make components of
    this.props.cities.forEach(i => {                        // b) gett props from Parent class (App)
      cityArray.push(i)
    })

    return(
      <div>
        {
          cityArray.map(c => 
            <City city={c}/>
          )
        }
      </div>
    )
  }
}

function City({city}){                                    // C) // ** NESTIGN COMPONENTS: WILL USE THIS COMPONENT INSIDE ANOTHER COMPONENT
  return (
    <div>
    <h1> City: {city.LocationText}</h1>
      <ul>
        <li>State: {city.State}</li>
        <li>Location: ({city.Lat}, {city.Long})</li>
        <li>Population (estimated): {city.EstimatedPopulation}</li>
        <li>Total Wages: {city.TotalWages} </li>
      </ul>
    </div>
  );
}


function ZipSearchField({handleZipChange}) {                //B)  // 3) Use the "onChange" method of the textinput. call the handler function that was passed via props when onChange activates
  return (<div>
     <label for="zipfield">ZipCode</label>
     <input type="text" onChange={ e => handleZipChange(e.target.value) }></input>
  </div>);
}                                                                 // 4) onChange={ e => zipChanged(e) }  - wont have issues bindig the 'this' keyword

class App extends React.Component {                         // A) 
  state = {                                                       // 0) state to store zip and cities
    zipcode: "",
    cities: []
  }  
 
  async handleZipChange(zip){                                     // 1) handler function to chnage state of zipcode
    if (isNaN(zip))
      return console.log("input error, enter a number")
    try{
      const res = await fetch(url+zip)                            // 5) get the api data from the zipcode
      const data = await res.json()
      this.setState({
        cities: data
      })
      console.log(data)
    }
    catch(e){
      console.log(`error getting data for zipcode: ${zip}`)
    }
  }

  render() {                                                      // 2) passing the handler function to the component using props
    return (    
      <div className="App">
        <div className="App-header"> <h2>Zip Code Search</h2></div>
        <ZipSearchField  handleZipChange={e => this.handleZipChange(e)}/>
        <div>
          <Cities cities={this.state.cities}/>
        </div>
      </div>
    );
  }
}

export default App;
