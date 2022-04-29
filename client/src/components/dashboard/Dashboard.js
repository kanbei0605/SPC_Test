import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/custom.css";
import "../../assets/css/material.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../layout/Navbar";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  
    constructor(props){
      super(props);
      this.state = {      
      }
    }
    
    onLogoutClick = () => {      
      this.props.logoutUser();
    };

    render(){
      return (
        <div>
            <div><Navbar /></div>
            <div style={{paddingTop:"100px", marginLeft:"220px", textAlign:"center"}}>
              <div className="container">
                  <button id="logout" type="button" class="btn menu-link py-3" onClick={this.onLogoutClick}> Sign Out</button>
              </div>
            </div>
          </div>         
      );
    }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
