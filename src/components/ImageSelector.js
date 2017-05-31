import React, { Component } from 'react';
import { Avatar, CircularProgress } from 'material-ui';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import ReactDOM from "react-dom";
import Loading from './Loading';

const styles = {
    avatarIcon : { zIndex: 1, position: 'absolute' }
};

class ImageSelector extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    onPictureChange = (event) => {
        // Obtenha uma referencia para a imagem capturada ou escolha um arquivo
        let files = event.target.files;
        this.setState({
            loading: true
        });
        this.props.uploadPhoto(files[0])
            .then(() => {
                this.setState({ loading: false })
            });
    };

    clickPhotoInput = () => {
        if(this.state.open) return;
        const node = ReactDOM.findDOMNode(this.photoInput);
        if(node) {
            node.click();
        }
    };

    render() {
        const { originalImage } = this.props;
        const { loading } = this.state;
        return (
            <div
                onClick={this.clickPhotoInput.bind(this)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                { loading ? <CircularProgress style={styles.avatarIcon} /> : <AddAPhoto style={styles.avatarIcon} /> }
                <Avatar size={120} src={ loading ?  null : originalImage } />
                <input
                    style={{
                        display: 'none',
                    }}
                    type="file"
                    accept="image/*"
                    ref={(el) => { this.photoInput = el; }}
                    onChange={this.onPictureChange.bind(this)}
                />
            </div>
        );
    }
}

export default ImageSelector;