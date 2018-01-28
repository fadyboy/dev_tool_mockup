import React, { Component } from 'react';
import './App.css';
import './Authorize';
import Authorize from './Authorize';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      appKeyValue:"",
      selectedOption:"ecobeepin",
      domainName:"",
      ecobeePinResults:""
    }
    this.domainChange = this.domainChange.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.getPin = this.getPin.bind(this);
    this.updateKey = this.updateKey.bind(this);
    this.displayAuthMethod = this.displayAuthMethod.bind(this);
    this.displayecobeePinResutls = this.displayecobeePinResutls.bind(this);
  }

  updateKey(event){
    this.setState({
      appKeyValue:event.target.value
    })
  }

  domainChange(event){
    
    if(event.target.value === "aqua"){
      this.setState({domainName:"https://aqua.ecobee.com"})
    } else if(event.target.value === "beta"){
      this.setState({domainName:"https://beta.ecobee.com"})
    }
    
  }
  
  selectOption(event){
    
    this.setState(
      {
        selectedOption: event.target.value,
        ecobeePinResults:""
      }
    )
  }

  displayAuthMethod(){
    var authMethod = this.state.selectedOption;
    if(authMethod === "ecobeepin"){
      return (
        <button type="submit" onClick={this.getPin}>Get Pin details</button>
      )
    } else if(authMethod === "authorize"){
        return (
          <Authorize domain={this.state.domainName} appKey={this.state.appKeyValue}/>
        )
    }
  }

  getPin(){
    var apiKey = this.state.appKeyValue;
    console.log("appkey ", apiKey);
    var domain = this.state.domainName;
    console.log("domain ", domain);
    var fullUrl = `${domain}?client_id=${apiKey}&someValue=testing`;
    var test = "http://www.mocky.io/v2/5a6563cd2b0000931ef414f5";
    var params = {
      method:'GET',
      mode:'cors',
      cache:'default'
    };
    console.log("url ", fullUrl);
    if(apiKey !== "" && domain !== ""){
      fetch(test, params)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      var info = data;
      console.log(info);
      this.setState({
        ecobeePinResults:info
      });
    })
    .catch((err)=>{
      console.log(err);
      this.setState({
        ecobeePinResults:err
      });
    })
   } else if(apiKey === "" || domain === ""){
     this.setState({
       ecobeePinResults:"Please enter an app key or select a domain first!"
     })
   }
    
  }

  displayecobeePinResutls(){
    var results = this.state.ecobeePinResults;
    console.log("results ", results);
    if(results === ""){
      return (
        <p></p>
      ) 
    } else if(results.name){
      return(
        <p>
          <b>{results.name}</b><br/>
          <b>{results.title}</b>
        </p>
      )
    } else {
      return (
        <p>{results}</p>
      )
    }
  }

  render() {
    var authMethod = this.displayAuthMethod();
    var results = this.displayecobeePinResutls();
    return (
      <div className="App">
        <div>
          <h1>Developer App Tool</h1>
          <hr />
          <label htmlFor="aqua">
            Aqua:&nbsp;
            <input type="radio" name="domainName" id="aqua" value="aqua" onChange={this.domainChange} required/>&nbsp;
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
          {authMethod}
        </div>
        <div>{results}</div>
      </div>
    );
  }
}

export default App;
