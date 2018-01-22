import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      domainValue:true,
      appKeyValue:"123489qwerty",
      selectedOption:"ecobeepin",
      domainName:""
    }
    this.domainChange = this.domainChange.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.getPin = this.getPin.bind(this);
    this.updateKey = this.updateKey.bind(this);
  }

  updateKey(event){
    this.setState({
      appKeyValue:event.target.value
    })
  }

  domainChange(event){
    this.setState(
      {
        domainValue: event.target.value
      }
    )
    
    if(event.target.value === "aqua"){
      this.setState({domainName:"https://aqua.ecobee.com"})
    } else if(event.target.value === "beta"){
      this.setState({domainName:"https://beta.ecobee.com"})
    }
    
  }
  
  selectOption(event){
    
    this.setState(
      {
        selectedOption: event.target.value
      }
    )
  }

  getPin(){
    var apiKey = this.state.appKeyValue;
    var domain = this.state.domainName;
    var fullUrl = `${domain}?client_id=${apiKey}&someValue=testing`;
    var test = "http://www.mocky.io/v2/5a6563cd2b0000931ef414f5";
    var params = {
      method:'GET',
      mode:'cors',
      cache:'default'
    };
    console.log("url ", fullUrl);
    fetch(test, params)
    .then((res)=>{
      console.log(res);
      return res.json();
    })
    .then((data)=>{
      var info = data;
      console.log(info);
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }

  render() {
    return (
      <div className="App">
        <div>
          <label htmlFor="aqua">
            Aqua:&nbsp;
            <input type="radio" name="domainName" id="aqua" value="aqua" onChange={this.domainChange}/>&nbsp;
          </label>
          <label htmlFor="beta">
            Beta:&nbsp;
            <input type="radio" name="domainName" id="beta" value="beta" onChange={this.domainChange}/>
          </label>
        </div>
        <div>
          <label htmlFor="appKey">
            Enter application key:&nbsp;
          </label>
          <input type="text" name="appKeyField" id="appKey" value={this.state.appKeyValue} onChange={this.updateKey}/>&nbsp;
          <select value={this.state.selectedOption} onChange={this.selectOption}>
            <option value="ecobeepin">GetPin</option>
            <option value="authorize">Authorize</option>
          </select>
        </div>
        <div>
          <button type="submit" onClick={this.getPin}>Get Pin details</button>
        </div>
      </div>
    );
  }
}

export default App;
