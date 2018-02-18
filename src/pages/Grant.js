import React, { Component } from 'react';
import $ from 'jquery';

import logo3 from '../assets/images/logo3.png';
import getWeb3 from './../utils/getWeb3'
import {createGrant} from './../utils/web3Calls';

class Grant extends Component {

  constructor(props) {
      super(props);
      this.state = {
          web3: null,
          name: 'Space Mission Alpha Onias III',
          ipfsHash: '056a9ec2e4847755d9012f31dfecfeb193a42330c3e83b9fd52086fc4d5eabb5',
          topic: 'Science Exploration and Discovery',
          amountNeeded: '10000000000000000000',
          summary: 'Lorem ipsum dolor sit amet, nostrum erroribus vis no, aliquid molestiae instructior usu in. Exerci everti neglegentur at cum. Pro id aeque congue definitionem'

      };
      this.submitGrant = this.submitGrant.bind(this);

  }
  componentDidMount() {
    $('html,body').animate({ scrollTop: 0 }, 'fast');

    getWeb3.then(results => {
          this.setState({
              web3: results.web3
          })

      }).catch(() => {
            console.log('Error finding web3.')
    })
  }

  submitGrant() {
      createGrant(this.state.web3,
          this.state.name,
          this.state.topic,
          this.state.amountNeeded,
          this.state.summary,
          this.state.ipfsHash).then((result) => {
            console.log(result);
      }).catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="grant-area-bg">
        {/* grant header */}
        <div className="grant-header-block moveFromTopFade">
          <div className="row">
            <div className="col s3 m3" />
            <div className="col s6 m6">
              <div className="grant-header-card card">
                <div className="grant-header-top" />
                <div className="row">
                  <div className="col s2 m2">
                    <div className="circle-teal-one" />
                  </div>
                  <div className="col s2 m2">
                    <img src={logo3} className="grant-header-logo3" />
                  </div>
                  <div className="col s6 m6">
                  <div className="grant-header-text">Grant Proposal Page</div>
                  </div>
                  <div className="col s2 m2" />
                </div>
              </div>
            </div>
            <div className="col s3 m3" />
          </div>
        </div>

        {/* grant body */}
        <div className="row">
          <div className="col s1 m1" />
          <div className="col s6 m6">

            <div className="grant-body-card card moveFromBottomFade delay200 z-depth-2">
            <div className="row grant-body-card-first">
                <div className="grant-header-top" />
                <div className="col s1 m1" />
                <div className="col s10 m10">
                  <div className="grant-body-form">
                    <div className="input-field">
                      <label className="active" htmlFor="grant-name">Grant Name:</label>
                      <input defaultValue={this.state.name} id="grant-name" type="text" />
                    </div>
                  </div>
                </div>
                <div className="col s1 m1" />
              </div>
              <div className="row grant-body-card-second">
                <div className="col s1 m1" />
                <div className="col s10 m10">
                  <div className="grant-body-form">
                    <div className="input-field">
                      <label className="active" htmlFor="ipfs-hash">IPFS Description Hash:</label>
                      <input defaultValue={this.state.ipfsHash} id="ipfs-hash" type="text" />
                    </div>
                  </div>
                </div>
                <div className="col s1 m1" />
              </div>
              <div className="row grant-body-card-third">
                <div className="col s1 m1" />
                <div className="col s10 m10">
                  <div className="grant-body-form">
                    <div className="input-field">
                      <label className="active" htmlFor="grant-topic">Grant Topic:</label>
                      <input defaultValue={this.state.topic} id="grant-topic" type="text" />
                    </div>
                  </div>
                </div>
                <div className="col s1 m1" />
              </div>
              <div className="row grant-body-card-fourth">
                <div className="col s1 m1" />
                <div className="col s10 m10">
                  <div className="grant-body-form">
                    <div className="input-field">
                      <label className="active" htmlFor="amount-needed">Amount Needed:</label>
                      <input defaultValue={this.state.amountNeeded} id="amount-needed" type="text" />
                    </div>
                  </div>
                </div>
                <div className="col s1 m1" />
              </div>
              <div className="row grant-body-card-fifth">
                <div className="col s1 m1" />
                <div className="col s10 m10">
                  <div className="grant-body-form">
                    <div className="input-field">
                      <label className="active" htmlFor="summary">Proposal Summary:</label>
                      <textarea className="materialize-textarea" data-length="320" defaultValue={this.state.summary} id="summary" type="text" />
                    </div>
                  </div>
                </div>
                <div className="col s1 m1" />
              </div>
            </div>

          </div>

          <div className="col s4 m4">
            
            <div className="grant-submit-card card moveFromBottomFade delay200 z-depth-1">
              <div className="grant-submit-bar">
                <div className="row">
                  <div className="col s2 m2" />
                  <div className="col s2 m2">
                    <i className="fa fa-cogs gear-icon"></i>
                  </div>
                  <div className="col s6 m6">
                    <div className="click-sumbit-text">Click submit when ready!</div>
                  </div>
                  <div className="col s2 m2" />
                </div>
              </div>

              <div className="grant-submit-block">
                <div className="circle-teal-one grant-submit-square" />
                <a className="waves-effect waves-light btn" onClick={this.submitGrant}>Sumbit Grant Proposal</a>
              </div> 

            </div>

          </div>
          <div className="col s1 m1" />
        </div>

      </div>
    );
  }
};

export default Grant;