'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YTPlayer = function () {
    function YTPlayer(id, code, options, props) {
        _classCallCheck(this, YTPlayer);

        this.code = code;
        this.id = id;
        this.currentTime = 0;
        this.videoId;
        this.code;
        this.data = { currentTime: 0, duration: 0, title: "" };
        this.btnClass;
        this.yt;
        this.ready;
        this.paused;
        this.iframe;
        this.timer;
        this.options = {};
        this.date;
        this.duration = 0;
        this.currentState = false;

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
                if (typeof options[b] == 'boolean') this.options[b] = options[b] ? '1' : '0';else this.options[b] = options[b];
            }
        }

        var trigger = ["onPause", "onPlay", "onStop", "onPlaying", "onReadyCallback", "onUpdateLiveData", "onLoadDataCallback", "onStateChangeCallback", "onEnd", "onBufferize"];

        for (var _b in trigger) {
            var triggerName = trigger[_b];
            if (props[triggerName]) {
                this[triggerName] = props[triggerName];
            }
        }

        this.onReady = this.onReady.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.follower = this.follower.bind(this);
        this.onYTReady = this.onYTReady.bind(this);
        this.updateLiveData = this.updateLiveData.bind(this);
        //this.loadData();
        this.onYTReady();
    }

    YTPlayer.prototype.loadData = function loadData(onlyupdate) {
        this.onlyupdate = onlyupdate ? true : false;
        //if (!this.onlyupdate)
        //this.onYTReady();

        if (typeof this.onLoadDataCallback == 'function') {
            this.onLoadDataCallback();
        }
    };

    YTPlayer.prototype.onYTReady = function onYTReady() {
        if (!youtubePlayerReady) {
            setTimeout(this.onYTReady, 1000);
        } else {
            this.yt = new YT.Player(this.id, {
                videoId: this.code,
                width: this.options.width,
                height: this.options.height,
                timeout: 0,
                playerVars: {
                    'controls': this.options.controls ? this.options.controls : true,
                    'color': this.options.color ? this.options.color : "white",
                    'showinfo': this.options.showinfo ? this.options.showinfo : true,
                    'autoplay': this.options.autoplay ? this.options.autoplay : false,
                    'enablejsapi': 0,
                    'disablekb': 0,
                    'modestbranding': this.options.modestbranding ? this.options.modestbranding : false,
                    'fs': this.options.fullscreen ? this.options.fullscreen : true,
                    'start': this.options.start ? this.options.start : 0,
                    'iv_load_policy': this.options.policy ? this.options.policy : 3,
                    'rel': this.options.rel ? this.options.rel : false
                },
                events: {
                    'onReady': this.onReady,
                    'onStateChange': this.onStateChange
                }
            });

            this.iframe = this.yt.getIframe();
        }
    };

    YTPlayer.prototype.onReady = function onReady() {
        this.ready = true;
        if (!this.data.title && !this.data.duration) {
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
    };

    YTPlayer.prototype.updateLiveData = function updateLiveData() {
        if (typeof this.onUpdateLiveData == 'function' && this.currentState == YT.PlayerState.PLAYING) {
            this.follower();
            this.onUpdateLiveData(this.data);
        }
        setTimeout(this.updateLiveData, 1000 / 10); // 10fps
    };

    YTPlayer.prototype.onStateChange = function onStateChange(a) {

        if (a.data == this.currentState) return;

        this.currentState = a.data;

        if (this.yt && !this.data.title) this.data.title = this.yt.getVideoData().title;

        if (typeof this.onLoadDataCallback == 'function') {
            this.onLoadDataCallback();
        }

        var currentStateText = "";
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

        if (typeof this.onStateChangeCallback == 'function') this.onStateChangeCallback(currentStateText, this.data);
    };

    YTPlayer.prototype.pause = function pause() {
        if (this.ready && this.yt) this.yt.pauseVideo();
    };

    YTPlayer.prototype.play = function play(code) {
        if (this.ready && this.yt) {
            this.loading(true);
            if (code) {
                this.data.title = false;
                this.data.duration = false;
                this.code = code;
                this.loadData(true);
                this.yt.loadVideoById(code);
            } else {
                this.yt.playVideo();
            }
        }
    };

    YTPlayer.prototype.stop = function stop() {
        if (this.ready && this.yt) {
            this.seekTo(0);
            var _yt = this.yt;
            setTimeout(function () {
                if (_yt) _yt.stopVideo();
            }, 100);

            if (typeof this.onStop == 'function') {
                this.onStop();
            }
        }
    };

    YTPlayer.prototype.setVolume = function setVolume(v) {
        if (this.ready && this.yt) this.yt.setVolume(v);
    };

    YTPlayer.prototype.seekTo = function seekTo(to) {
        if (this.ready && this.yt) this.yt.seekTo(to);
    };

    YTPlayer.prototype.loading = function loading(isLoading) {
        this.isLoading = isLoading;
    };

    YTPlayer.prototype.follower = function follower() {
        this.data.currentTime = this.yt.getCurrentTime();
        if (!this.data.duration) {
            this.data.duration = this.yt.getDuration();
        }
        if (typeof this.onPlaying == 'function') {
            this.onPlaying();
        }
    };

    return YTPlayer;
}();

exports.default = YTPlayer;