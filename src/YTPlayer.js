export default class YTPlayer {

    constructor(id, code, options, props) {

        this.code = code;
        this.id = id;
        this.currentTime= 0;
        this.videoId;
        this.code;
        this.data = {currentTime: 0, duration: 0, title: ""};
        this.btnClass;
        this.yt;
        this.ready;
        this.paused;
        this.iframe;
        this.timer;
        this.options = {};
        this.date;
        this.duration = 0;

        this.options = {
            width: 640,
            height: 360,
            loop: false,
            autoplay: '0',
            controls: '0',
            showinfo: '0',
            theme: 'dark',
            start: 0,
            policy: 3,
            rel: 0
        };

        if (options) {
            for (var b in options) {
                if (typeof options[b] == 'boolean')
                    this.options[b] = options[b] ? '1' : '0';
                else
                    this.options[b] = options[b];
            }
        }

        const trigger = [
            "onPause", "onPlay", "onStop", "onPlaying", "onReadyCallback", "onUpdateLiveData",
            "onLoadDataCallback", "onStateChangeCallback", "onEnd", "onBufferize"
        ];

        for (let b in trigger) {
            let triggerName = trigger[b];
            if (props[triggerName]) {
                this[triggerName] = props[triggerName];
            }
        }

        this.onReady = this.onReady.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.follower = this.follower.bind(this);
        this.onYTReady = this.onYTReady.bind(this);
        this.updateLiveData = this.updateLiveData.bind(this);
        this.loadData();
    }

    loadData(onlyupdate) {
        this.onlyupdate = onlyupdate ? true : false;
        if (!this.onlyupdate)
            this.onYTReady();

        if (typeof this.onLoadDataCallback == 'function') {
            this.onLoadDataCallback();
        }

    }

    onYTReady() {
        if (!youtubePlayerReady) {
            setTimeout(this.onYTReady, 300);
        } else {
            this.yt = new YT.Player(this.id, {
                videoId: this.code,
                width: this.options.width,
                height: this.options.height,
                timeout: 0,
                playerVars: {
                    'controls': this.options.controls,
                    'showinfo': this.options.showinfo,
                    'autoplay': this.options.autoplay,
                    'enablejsapi': 0,
                    'start': this.options.start,
                    'theme': this.options.theme,
                    'iv_load_policy': this.options.policy,
                    'wmode': 'transparent',
                    'rel': this.options.rel
                },
                events: {
                    'onReady': this.onReady,
                    'onStateChange': this.onStateChange
                }
            });

            this.iframe = this.yt.getIframe();
        }
    }

    onReady() {
        this.ready = true;
        if(!this.data.title && this.data.duration){
            this.data.title = this.yt.getVideoData().title;
            this.data.duration = this.yt.getDuration();
        }

        this.updateLiveData();
        if (typeof this.onReadyCallback == 'function') {
            this.onReadyCallback(this.data);
        }

        if (typeof this.onLoadDataCallback == 'function') {
            this.onLoadDataCallback(this.data);
        }
    }

    updateLiveData() {
        this.follower();
        if (typeof this.onUpdateLiveData == 'function') {
            this.onUpdateLiveData(this.data);
        }
        requestAnimationFrame(this.updateLiveData);
    }

    onStateChange(a) {
        if (this.yt && !this.data.title)
            this.data.title = this.yt.getVideoData().title;

        if (typeof this.onLoadDataCallback == 'function') {
            this.onLoadDataCallback();
        }

        let currentStateText = "";
        switch (a.data) {
            case YT.PlayerState.BUFFERING:
            case YT.PlayerState.CUED:
                this.loading(true);
                currentStateText = "BUFFERING";
                if (typeof this.onBufferize == 'function') {
                    this.onBufferize();
                }
                break;
            case YT.PlayerState.ENDED:
                currentStateText = "ENDED";
                if (this.options.loop == '1') {
                    this.seekTo(0);
                    this.play();
                } else {
                    this.stop();
                }
                if (typeof this.onEnd == 'function') {
                    this.onEnd();
                }
                break;
            case YT.PlayerState.PAUSED:
                currentStateText = "PAUSED";
                this.paused = true;
                if (typeof this.onPause == 'function') {
                    this.onPause();
                }
                break;
            case YT.PlayerState.PLAYING:
                currentStateText = "PLAYING";
                this.paused = false;
                this.loading(false);
                if (typeof this.onPlay == 'function') {
                    this.onPlay();
                }
                break;
        }

        if (typeof this.onStateChangeCallback == 'function')
            this.onStateChangeCallback(YT, currentStateText, this.data);
    }

    pause() {
        if (this.ready)
            this.yt.pauseVideo();
    }

    play(code) {
        if (this.ready) {
            this.loading(true);
            if (code) {
                this.code = code;
                this.loadData(true);
                this.yt.loadVideoById(code);
            } else {
                this.yt.playVideo();
            }
        }
    }

    stop() {
        if (this.ready) {
            this.seekTo(0);
            var _yt = this.yt;
            setTimeout(function () {
                if (_yt)
                    _yt.stopVideo();
            }, 100);

            if (typeof this.onStop == 'function') {
                this.onStop();
            }
        }
    }

    setVolume(v) {
        if (this.ready)
            this.yt.setVolume(v);
    }

    seekTo(to) {
        if (this.ready)
            this.yt.seekTo(to);
    }

    follower() {
        this.data.currentTime = this.yt.getCurrentTime();
        if(!this.data.duration){
            this.data.duration = this.yt.getDuration();
        }
        if (typeof this.onPlaying == 'function') {
            this.onPlaying();
        }
    }

    getProgress() {
        return Math.round(this.data.currentTime / this.data.duration * 100);
    }

    loading(b) {
        /*
        if (b) {
            if ($(this.loader).length)
                $(this.loader).show();
        } else {
            if ($(this.loader).length)
                $(this.loader).hide();
        }*/
    }
}

