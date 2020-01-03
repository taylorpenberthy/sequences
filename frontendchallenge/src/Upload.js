import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileInput from 'react-simple-file-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { URL } from './config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
var allowedFileTypes = ['application/json'];

function fileIsIncorrectFiletype(file) {
  if (allowedFileTypes.indexOf(file.type) === -1) {
    return true;
  } else {
    return false;
  }
}

export default class Upload extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cancelButtonClicked: false,
      refresh: false
    };
  }
  uploader = () => {
    const data = new FormData();
    data.append('myFile', this.state.sel);
  };

  render() {
      return (
        <div>
          <label>
            <FileInput
              readAs='binary'
              className='clickMe'
              style={{ display: 'none' }}
              onLoadStart={this.showProgressBar}
              onLoad={this.handleFileSelected}
              onProgress={this.updateProgressBar}
              cancelIf={fileIsIncorrectFiletype}
              abortIf={this.cancelButtonClicked}
              onCancel={this.showInvalidFileTypeMessage}
              onAbort={this.resetCancelButtonClicked}
            />
            {/* styling comes from Material UI due to limitations with react-simple-file-input */}
            <span
              className='MuiButtonBase-root MuiButton-root MuiButton-contained icon'
              tabIndex='0'
              style={{
                marginLeft: 10,
                marginBottom: 5,
                backgroundColor: 'white',
                float: 'right'
              }}
            >
              <span class='MuiButton-label' style={{ marginRight: 10 }}>
                <CloudUploadIcon />
              </span>
              Upload
            </span>
          </label>
        </div>
      );
  }

  cancelButtonClicked = () => {
    return this.state.cancelButtonClicked;
  };

  resetCancelButtonClicked = () => {
    this.setState({ cancelButtonClicked: false });
  };

  showInvalidFileTypeMessage = file => {
    window.alert('Tried to upload invalid filetype ' + file.type);
  };

  showProgressBar = () => {
    this.setState({ progressBarVisible: true });
  };

  updateProgressBar = event => {
    this.setState({
      progressPercent: (event.loaded / event.total) * 100
    });
  };

  handleFileSelected = (event, file) => {
    const data = new FormData();
    data.append('myfile', file);
    axios
      .post(URL + 'upload/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
          let answer = res.data;
          if (answer['ok']) {
              alert('Success!')
              console.log("Success!  "+answer['ok']);
          } 
          else {
              alert('Error Uploading: ' + answer['error'])
            }
          this.setState({refresh: !this.state.refresh});
        })
    
    };
}
