import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileInput from 'react-simple-file-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { URL } from './config';
import axios from 'axios';
var allowedFileTypes = ['application/json'];
// Code adapted from https://www.npmjs.com/package/react-simple-file-input
// We use a FileInput component to access the contents of a JSON sequence
// file which we upload to our server

// Check to make sure file is correct type before upload
function fileIsIncorrectFiletype(file) {
  if (allowedFileTypes.indexOf(file.type) === -1) {
    return true;
  } else {
    return false;
  }
}

// There's a bit of magic here.  
//
// The low level Material UI CSS was used to 'fake' a 
// Material UI button as a span.
//
// This span is the label for a hidden FileInput component.  
//
// When you click on the label, the input component is activated
// and it appears as though you clicked on a button.
//
// There's a subtle difference here, as we lose some fading 
// animation from Material UI but this seems to work for now.
export default class Upload extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cancelButtonClicked: false,
      redirect: false,
      parentState: props.state
    };
  }


  // Generate input field and fake button for upload.
  // The CSS class names came from inspecting a Material UI 
  // button.
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

  // Basic handlers required by FileInput component 
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

  // Generate a simple alert string given JSON information from our 
  // server in terms of sequences added, skipped, or rejected.
  formatOK = answer => {
    let info = answer['ok'];
    let out = 'Database updated: ';
    if (info['new'].length > 0) {
      out += 'added ' + info['new'].length + ' sequences ';
    }
    if (info['dup'].length > 0) {
      out += ' skipped ' + info['dup'].length + ' duplicate(s)';
    }
    if (info['bad'].length > 0) {
      out += ' rejected ' + info['bad'].length + ' sequences(s)';
    }
    return out;
  };

  // This is our work horse.  Once a file is selected,
  // handleFileSelected uses a simple react form and 
  // specifies the file name as 'myfile' attribute.  Our server
  // expects to see this.
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
          this.forceUpdate();
        } else {
          alert('Error Uploading: ' + answer['error']);
        }
      });
  };
}
