import React, { Component } from 'react';
import { Avatar, CircularProgress } from 'material-ui';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import { fromJS } from 'immutable';

const styles = {
  avatarIcon: { zIndex: 1, position: 'absolute' },
};

class ImageSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }


  componentWillReceiveProps(newProps) {
    if (this.props.originalImage !== newProps.originalImage) {
      this.setState({ loading: false });
    }
  }

  clickPhotoInput = () => {
    const node = this.photoInput;
    if (node) {
      node.click();
    }
  };

  onChange(e) {
    e.preventDefault();
    const { input: { onChange } } = this.props;
    const file = e.target.files[0];
    onChange(file);
  }

  render() {
    const { originalImage, disabled = false, input } = this.props;
    delete input.value;
    const { loading } = this.state;
    const avatarIconStyle = Object.assign(
            { visibility: disabled ? 'hidden' : 'visible' },
            styles.avatarIcon
        );
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        { loading ? <CircularProgress style={avatarIconStyle} /> : <AddAPhoto onClick={this.clickPhotoInput.bind(this)} style={avatarIconStyle} /> }
        <Avatar size={120} src={loading ? null : originalImage} />
        <input
          style={{
            display: 'none',
          }}
          type="file"
          accept="image/*"
          ref={(el) => { this.photoInput = el; }}
          // value={value}
          {...input}
          onChange={this.onChange}
          value={this.state.file || ''}
        />
      </div>
    );
  }
}

export default ImageSelector;
