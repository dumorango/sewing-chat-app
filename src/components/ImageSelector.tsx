import { Avatar, CircularProgress } from "material-ui";
import AddAPhoto from "material-ui/svg-icons/image/add-a-photo";
import * as React from "react";

const styles = {
  avatarIcon: { zIndex: 1, position: "absolute" },
};

interface IProps {
    originalImage: string;
    disabled: boolean;
    input: any;
}

interface IState {
    loading: boolean;
    file: File;
}

class ImageSelector extends React.Component<IProps, IState> {

  private photoInput: HTMLInputElement;

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
        loading: false,
        file: undefined,
    };
  }

  public componentWillReceiveProps(newProps) {
    if (this.props.originalImage !== newProps.originalImage) {
      this.setState({ loading: false });
    }
  }

  public render() {
    const { originalImage, disabled = false, input } = this.props;
    const file: File = this.state.file;
    delete input.value;
    const { loading } = this.state;
    const avatarIconStyle = Object.assign(
            { visibility: disabled ? "hidden" : "visible" },
            styles.avatarIcon,
        );
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {
            loading ?
            <CircularProgress style={avatarIconStyle} /> :
            <AddAPhoto onClick={this.clickPhotoInput.bind(this)} style={avatarIconStyle} />
        }
        <Avatar size={120} src={loading ? null : originalImage} />
        <input
          style={{
            display: "none",
          }}
          type="file"
          accept="image/*"
          ref={(el) => { this.photoInput = el; }}
          {...input}
          onChange={this.onChange}
          value={file || ""}
        />
      </div>
    );
  }

  private clickPhotoInput = () => {
    const node = this.photoInput;
    if (node) {
        node.click();
    }
  }

  private onChange(e) {
    e.preventDefault();
    const { input: { onChange } } = this.props;
    const file: File = e.target.files[0];
    onChange(file);
  }
}

export default ImageSelector;
