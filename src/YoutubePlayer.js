import React, {Component, PropTypes} from 'react'
import YTPlayer from './YTPlayer'

export default class YoutubePlayer extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = props;
        this.player;
        this.id = this.generateUid();
        this.code = this.props.code;
    }

    componentDidMount() {
        this.player = new YTPlayer(this.id, this.props.code, this.props.options, this.props);
    }

    componentDidUpdate() {
        switch(this.props.currentState){
            case "play":
                this.player.play();
                break;
            case "pause":
                this.player.pause();
                break;
            case "stop":
                this.player.stop();
                break;
        }
        if(this.code!=this.props.code){
            this.code = this.props.code;
            this.player.play(this.code);
        }
    }

    generateUid(separator) {
        var delim = separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    }

    render() {
        return (
            <div id={this.id} />
        )
    }
}

