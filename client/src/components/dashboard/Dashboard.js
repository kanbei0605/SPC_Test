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
        size: "",
        count: "",
      }
    }
    
    componentDidMount = () => {
      axios
        .get("/api/video")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          alert("failed");
          console.log(err.respnse.data);
        });
    }

    onLogoutClick = () => {      
      this.props.logoutUser();
    };

    onAdd = () => {
      if( this.state.size === '' || this.state.count === '') {
        alert("Input correctly");
        return;
      }
      const data = {
        videoSize: this.state.size,
        viewerCount: this.state.count,
        username: this.props.auth.user.name,
      }
      axios
        .post("/api/video", data)
        .then(res => {
          console.log(res);
          alert("created successfully");
        })
        .catch(err => {
          alert("failed");
          console.log(err.respnse.data);
        });
    };

    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    render(){
      return (
        <div>
          <Navbar ></Navbar>
          <div style={{marginLeft:"220px", padding:"20px"}}>
            <div className="row">
              <span className="float-left" style={{fontSize: "40px"}}>Wellcome : {this.props.auth.user.name}</span>
            </div>
            <button className="btn-primary py-3 float-right" onClick={this.onLogoutClick}> Sign Out</button>
            <div className="mt-10">
              <label className="form-label fs-6 fw-bolder text-dark">Video Size (in MB) : &nbsp;</label>
              <input
                type="number"
                onChange={this.onChange}
                value={this.state.size}
                // error={errors.email}
                name="size"
              />
              <span className="red-text">
                  {/* {errors.email}
                  {errors.emailnotfound} */}
              </span>
              <br></br>
              
              <label className="form-label fs-6 fw-bolder text-dark">Count : &nbsp;</label>
              <input
                type="number"
                onChange={this.onChange}
                value={this.state.count}
                // error={errors.email}
                name="count"
              />
              <span className="red-text">
                  {/* {errors.email}
                  {errors.emailnotfound} */}
              </span>
              
              <button className="btn-success ml-5" onClick={this.onAdd}> Add </button>
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
