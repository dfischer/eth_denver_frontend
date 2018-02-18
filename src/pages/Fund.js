import React, { Component } from 'react';
import $ from 'jquery';

import FundDetails from '../components/FundDetail';
import logo4 from '../assets/images/logo4.png';
import getWeb3 from './../utils/getWeb3'
import {getAllGrants, getSpecificGrant, fundGrant} from './../utils/web3Calls';

class Fund extends Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            grantList: [],
            currentGrant: {}
        };
        this.makeList = this.makeList.bind(this);
        this.grantSelected = this.grantSelected.bind(this);
        this.fundGrantClicked = this.fundGrantClicked.bind(this);
    }

    componentDidMount() {
        $('html,body').animate({ scrollTop: 0 }, 'fast');
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            });
            getAllGrants(results.web3).then((result) => {
                this.setState({
                    grantList: result.reverse()
                });
                console.log(result);
            });
        }).catch(() => {
            console.log('Error finding web3.')
        });
    }

    grantSelected(grantAddress) {
        if(this.state.web3) {
            getSpecificGrant(this.state.web3, grantAddress).then((result) => {
                console.log(result);
                this.setState({
                    currentGrant: result
                });
            });
        } else {
            this.setState({
                currentGrant: {}
            });
        }

    }

    makeList() {
        const data = this.state.grantList[0];
        return (
          <div className=" moveFromTopFade delay300">
            {data.map((c,i,a)=>{
                return (
                <li className="single-grant-block" key={i} onClick={() => this.grantSelected(c.grantAddress)}>
                    <div className="row">
                        <div className="col s3 m3">
                            <p className="single-grant-title">{c.grantTitle}</p>
                        </div>
                        <div className="col s2 m2">
                            <p className="single-grant-topic">{c.grantTopic}</p>
                        </div>
                        <div className="col s7 m7">
                            <p className="single-grant-address">{c.grantAddress}</p>
                        </div>
                    </div>
                </li>
                )
            })}
          </div>
        );
    }

    displayFundDetails() {
        if(this.state.web3 && this.state.currentGrant.grantAddress) {
            return (<FundDetails details={this.state.currentGrant}/>);
        }
        return (<div className="fund-standin" />);
    }

    fundGrantClicked() {
        //hard coded grant value for now. Choice will be added after MVP hackathon stage
        const fundingAmount = "1000000000000000000";
        fundGrant(this.state.web3, this.state.currentGrant.grantAddress, fundingAmount).then((result) => {
            const grantCopy = this.state.currentGrant;
            //also temp hard coded increment because web3 is being odd
            grantCopy.amountGranted = grantCopy.amountGranted + 1;
            this.setState({
                currentGrant: grantCopy
            });
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }

  render() {
    return (
      <div className="fund-area-bg">
            {/* fund header */}
            <div className="fund-header-block">
                <div className="row">
                    <div className="col s1 m1" />
                    <div className="col s4 m4">
                        <div className="fund-header-card moveFromTopFade">
                            {/* top left header */}
                            <div className="row">
                                <div className="col s1 m1" />
                                <div className="col s3 m3">
                                    <img src={logo4} className="fund-header-logo4" />
                                </div>
                                <div className="col s8 m8">
                                    <div className="fund-header-text">Fund Proposal Page</div>
                                </div>
                            </div>
                        </div>
                        <div className="fund-info-section moveFromBottomFade">
                            {this.displayFundDetails()}
                        </div>
                    </div>
                    <div className="col s1 m1">
                        <div className="fund-header-card-line moveFromLeftFade" />
                        <div className="fund-header-card-line-two moveFromRightFade" />
                        <div className="fund-header-card-line-three moveFromRightFade delay100" />
                    </div>
                    <div className="col s5 m5">
                        <div className="fund-header-card-right moveFromRightFade">
                            <div className="row">
                                <div className="col s12 m12">
                                <div className="fund-header-text-left">Select a grant to fund:</div>
                                    <div className="fund-header-card-block">
                                        <div className="single-grant-top">
                                            <p className="single-grant-label">Title</p>
                                            <p className="single-grant-label-next">Topic</p>
                                            <p className="single-grant-label-next">Address</p>
                                        </div>
                                        {this.makeList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fund-header-card-mid moveFromTopFade" />
                        <div className="fund-body-card-right moveFromRightFade">
                            <div className="fund-header-text-right">Review Grant Details before Funding</div>
                            <div className="row">
                                <div className="col s1 m1" />
                                <div className="col s5 m5">
                                    <div className="fund-btn">
                                        <a className="waves-effect cyan lighten-1 btn" onClick={this.fundGrantClicked}>Fund Grant</a>
                                    </div>
                                </div>
                                <div className="col s5 m5">
                                    <div className="fund-btn">
                                        <a className="waves-effect orange lighten-2 btn">Submit to Feat</a>
                                    </div>
                                </div>
                                <div className="col s1 m1" />
                            </div>
                        </div>
                    </div>
                    <div className="col s1 m1" />
                </div>
            </div>

      </div>
    );
  }
};

export default Fund;
