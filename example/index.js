import {YoutubePlayer}  from '../dist/index'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {Timeline} from 'funkymed-timeliner/dist'

let node = document.getElementById('app');

class Example extends Component
{

    constructor()
    {
        super();
        // Custom Example
        this.onClickSeek = this.onClickSeek.bind(this);
        this.actionCustom = this.actionCustom.bind(this);
        this.state = {
            customState: "stop",
            videoCode: "273lxZw25B0",
            progressbar: 0,
            startAt: 0,
            isplaying: false,
            currentTime: 0
        };
        this.customState = this.state.customState;

        this.VideoData = {
            state: "",
            data: {},
        };


        this.onStateChangeCallback = this.onStateChangeCallback.bind(this);
        this.onReadyCallback = this.onReadyCallback.bind(this);
        this.onUpdateLiveData = this.onUpdateLiveData.bind(this);
        /*
        this.onBufferize = this.onBufferize.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onPlaying = this.onPlaying.bind(this);
        this.onLoadDataCallback = this.onLoadDataCallback.bind(this);
        */

        // Multi Videos

        this.VideoDataMulti = {
            state: "",
            data: {},
        };
        this.changeVideo = this.changeVideo.bind(this);
        this.onStateChangeMultiCallback = this.onStateChangeMultiCallback.bind(this);

        // Timeliner


        this.onUpdateLiveTimelineData = this.onUpdateLiveTimelineData.bind(this);

        this.json = {
            startTime: '0',
            options: {
                groupcolors: {
                    "slider": ["#ffae32", "#ffc266"],
                    "title": ["#6f9dff", "#8fb3ff"],
                    "chat": ["#fe6fff", "#fe8fff"],
                    "survey": ["#30c84a", "#3dfb5d"],
                }
            },
            scenes: [
                {start: 0, end: 500, type: "chat", data: {}},
                {start: 500, end: 1000, type: "slider", data: {}},
                {start: 1000, end: 1500, type: "survey", data: {}},
                {start: 1500, end: 2000, type: "title", data: {}},
                {start: 2000, end: 2500, type: "survey", data: {}},
                {start: 2500, end: 3000, type: "slider", data: {}},
                {start: 3000, end: 3500, type: "chat", data: {}},
                {start: 3500, end: 4000, type: "slider", data: {}},
                {start: 4000, end: 4500, type: "survey", data: {}},
                {start: 4500, end: 5000, type: "title", data: {}},
            ]
        };
    }

    componentDidMount() {
    }

    updateCurrentTime(){
    }

    onClickSeek(e){
        //e.preventDefault();
        e.stopPropagation();
        if(this.VideoData){
            var seekto =  e.clientX/parseInt(e.target.style.width)*this.VideoData.data.duration;
            this.setState({
                startAt: seekto
            });
        }
    }

    actionCustom(e) {
        e.preventDefault();
        switch (e.target.innerText) {
            case 'Play':
                this.customState = "play";
                break;
            case 'Pause':
                this.customState = "pause";
                break;
            case 'Stop':
                this.customState = "stop";
                break;
        }

        this.setState({
            customState: this.customState
        });
    }

    changeVideo(e) {
        e.preventDefault();
        let videoCode="273lxZw25B0";
        switch (e.target.innerText) {
            default:
            case 'Video1':
                videoCode = "273lxZw25B0";
                break;
            case 'Video2':
                videoCode = "lkhDR91TH9M";
                break;
            case 'Video3':
                videoCode = "3apWSRa8ugI";
                break;
            case 'Video4':
                videoCode = "AQKu1R92vfY";
                break;
        }

        this.setState({
            videoCode: videoCode
        });
    }

    onUpdateLiveData(data){
        this.VideoData.data = data;
        document.getElementById("custom-info").innerText = JSON.stringify(this.VideoData, null, 2);

        var progression = (data.currentTime / data.duration * 100) + "%";
        if(progression>data.duration){
            progression = data.duration;
        }

        this.setState({
            progressbar: progression
        });
    }

    onUpdateLiveTimelineData(data){
        if(data && data.currentTime) {
            this.setState({
                currentTime: data.currentTime ? data.currentTime * 100 : 0
            });
        }
    }

    onReadyCallback(data){
        this.VideoData.data = data;
        document.getElementById("custom-info").innerText = JSON.stringify(this.VideoData, null, 2);
    }

    onStateChangeCallback(YT, currentStateText, data){
        this.VideoData.state = currentStateText;
        document.getElementById("custom-info").innerText = JSON.stringify(this.VideoData, null, 2);
    }

    onStateChangeMultiCallback(YT, currentStateText, data){
        this.VideoDataMulti.state = currentStateText;
        this.VideoDataMulti.data = data;
        document.getElementById("custom-info-multi").innerText = JSON.stringify(this.VideoDataMulti, null, 2);
    }

    render()
    {
        return (
            <div>
                <h2>Simple</h2>
                <YoutubePlayer code="Zrock_tnsSQ" />

                <h2>Basic options</h2>

                <YoutubePlayer code="ipPEy7T3GCk" options={{
                    width:640,
                    height:270,
                    theme:'light',
                    controls:true,
                    loop:true,
                    start:128
                }}/>

                <h2>Custom</h2>

                <div>
                    <YoutubePlayer code="45wrqMuLAlA"
                        currentState={this.CustomState}
                        startAt={this.state.startAt}
                        options={{
                            width:640,
                            height:360,
                            theme:'light',
                            showinfo:false,
                            controls:false,
                            loop:true,
                        }}
                        currentState={this.state.customState}
                        onStateChangeCallback={this.onStateChangeCallback}
                        onUpdateLiveData={this.onUpdateLiveData}
                    />
                    <div id="custom-info">
                        Please wait...
                    </div>
                    <div style={{width:"640px",height:"10px", backgroundColor:"#CECECE"}} onClick={this.onClickSeek}>
                        <div style={{pointerEvents: "none",width:this.state.progressbar,backgroundColor:"red", height:"10px"}}>&nbsp;</div>
                    </div>
                    <div>
                        <button onClick={this.actionCustom}>Play</button>
                        <button onClick={this.actionCustom}>Pause</button>
                        <button onClick={this.actionCustom}>Stop</button>
                    </div>
                </div>

                <h2>Multi videos</h2>
                <div>
                    <YoutubePlayer code={this.state.videoCode}
                        options={{
                            width:640,
                            height:360,
                            theme:'dark',
                            controls:true,
                            showinfo:false,
                            loop:true,
                         }}
                        onStateChangeCallback={this.onStateChangeMultiCallback}
                    />
                    <div id="custom-info-multi">
                        Please wait...
                    </div>
                    <div>
                        <button onClick={this.changeVideo}>Video1</button>
                        <button onClick={this.changeVideo}>Video2</button>
                        <button onClick={this.changeVideo}>Video3</button>
                        <button onClick={this.changeVideo}>Video4</button>
                    </div>
                </div>

                console.log(this.state.currentTime)
                <h2>Timeliner support</h2>
                <YoutubePlayer code="45wrqMuLAlA"
                    options={{
                        width:640,
                        height:360,
                        theme:'dark',
                        controls:true,
                    }}
                    onUpdateLiveData={this.onUpdateLiveTimelineData}
                />
                <Timeline rendering={true} data={this.json} isplaying={this.state.isplaying} currentTime={this.state.currentTime} />
            </div>
        );
    }
}

render(
<Example/>,
    node
);
