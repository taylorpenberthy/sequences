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
      redirect: false,
      parentState: props.state
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

  formatOK = (answer) => {
      console.log("Got answer");
      console.log(answer);
          let info = answer['ok'];
          let out = "Database updated: "
          if (info['new'].length > 0) {
              out += "added "+info['new'].length+" sequences ";
          }
          if (info['dup'].length > 0) {
              out += " skipped "+info['dup'].length+" duplicate(s)"
          }
          if (info['bad'].length > 0) {
              out += " rejected "+info['bad'].length+" sequences(s)";
          }
          return out
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
              alert(this.formatOK(answer));
              this.forceUpdate()
          } 
          else {
              alert('Error Uploading: ' + answer['error'])
          }
        })
    
    };
}
