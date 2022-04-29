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
        datas: [],
        searchName: "",
      }
    }
    
    getAll = () => {
      axios
        .get("/api/video")
        .then(res => {
          console.log(res);
          this.setState({datas: res.data});
        })
        // .catch(err => {
        //   alert("failed");
        //   console.log(err.respnse.data);
        // });
    }

    componentDidMount = () => {
      this.getAll();
    }

    onLogoutClick = () => {      
      this.props.logoutUser();
    };

    onGetTotalVideoSize = () => {
      if( this.state.searchName === '') {
        alert("Input Search Username");
        return;
      }
      const data = {
        username: this.state.searchName
      }
      axios
        .get("/api/video/gettotal", data)
        .then(res => {
          console.log(res);
        })
    }

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
          alert("created successfully");
          this.getAll();
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
        <div className="container">
          {/* <Navbar ></Navbar> */}
          <div style={{padding:"20px"}}>
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
                name="size"
              />
              <label className="form-label fs-6 fw-bolder text-dark ml-5">ViewerCount : &nbsp;</label>
              <input
                type="number"
                onChange={this.onChange}
                value={this.state.count}
                name="count"
              />
              <button className="btn-success ml-5" onClick={this.onAdd}> Add </button>
              <hr></hr>
              <label className="form-label fs-6 fw-bolder text-dark">Search Username : &nbsp;</label>
              <input
                type="text"
                onChange={this.onChange}
                value={this.state.searchName}
                name="searchName"
              />
              <button className="btn-success ml-5" onClick={this.onGetTotalVideoSize}> Get total video size </button>
            </div>
            <div>
              <table className="table table-bordered table-striped table-hover fs-6 gy-5 "> 
                <thead>
                  <tr>
                    <th> CreatedBy </th>
                    <th> id </th>
                    <th> Video Size (in MB) </th>
                    <th> Viewers Count </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.datas.map((val,index) => {
                      return (
                        <tr key={index}>
                          <td> {val.createdBy} </td>
                          <td> {val.videoID._id} </td>
                          <td> {val.videoID.videoSize} </td>
                          <td> {val.videoID.viewerCount} </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
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
