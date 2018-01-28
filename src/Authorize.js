import React, { Component } from 'react';

class Authorize extends Component {

    constructor(props){
        super(props);
        this.state = {
            partnerSelection: "",
            displaySection: false,
            authorizeLink:""
        }

        this.partnerSelected = this.partnerSelected.bind(this);
        this.renderSection = this.renderSection.bind(this);
        
    }

    renderSection(){
        var selectedOption = this.state.partnerSelection;
        var displayValue = this.state.displaySection;

        if(selectedOption === "ecobee" && displayValue === true){
            return (
                <p>Click <a href={this.state.authorizeLink} target="_blank">here</a> to authorize ecobee app</p>
            )
        } else if(selectedOption === "carrier" && displayValue === true){
            return (
                <p>Click <a href={this.state.authorizeLink} target="_blank">here</a> to authorize carrier app</p>
            )
        } else if(selectedOption === "bryant" && displayValue === true){
            return (
                <p>Click <a href={this.state.authorizeLink} target="_blank">here</a> to authorize bryant app</p>
            )
        } else {
            return (
                <p></p>
            )
        }
    }

    partnerSelected(event){
        var optionSelected = event.target.value;
        var {appKey, domain} = this.props;
        var urlSwitch = `response_type=code&scope=smartWrite&redirect_uri=${domain}/home/parrot&state=testState&client_id=`;
        
        if(optionSelected === "ecobee"){
            this.setState({
                partnerSelection: optionSelected,
                displaySection: true,
                authorizeLink: `${domain}?${urlSwitch}${appKey}`
            });
        } else if(optionSelected === "carrier"){
            this.setState({
                partnerSelection: optionSelected,
                displaySection: true,
                authorizeLink:`${domain}?${urlSwitch}${appKey}&partner=carrier`
            });
        } else if(optionSelected === "bryant"){
            this.setState({
                partnerSelection: optionSelected,
                displaySection: true,
                authorizeLink:`${domain}?${urlSwitch}${appKey}&partner=bryant`
            })
        }
    }

    render(){
        var partnerLink = this.renderSection();
        
        return (
            <div>
                <p>Select Authorization partner</p>
                <label htmlFor="ecobee">
                    Ecobee:&nbsp;
                    <input type="radio" name="partner" id="ecobee" value="ecobee" onChange={this.partnerSelected}/>
                </label> &nbsp;
                <label htmlFor="carrier">
                    Carrier:&nbsp;
                    <input type="radio" name="partner" id="carrier" value="carrier" onChange={this.partnerSelected}/>
                </label>&nbsp;
                <label htmlFor="bryant">
                    Bryant:&nbsp;
                    <input type="radio" name="partner" id="bryant" value="bryant" onChange={this.partnerSelected}/>
                </label><br/>
                {partnerLink}
            </div>
        )
    }
}

export default Authorize;