/**
 * Author : Cyril Pereira <cyril.pereira@gmail.com>
 * jQYTPlayer
 * @param id
 * @param code
 * @param options
 */
var jQYTPlayer = function(id, code, options){
  this.code = code;
  this.id = id;

  this.options={
    width:640,
    height:360,
    loop:false,
    autoplay:'0',
    controls:'0',
    showinfo:'0',
    theme:'dark',
    start:0,
    policy:3,
    rel:0
  };
  if(options)
  {
    for(var b in options)
    {
      if(typeof options[b] =='boolean')
        this.options[b] = options[b] ? '1' : '0';
      else
        this.options[b] = options[b];
    }
  }
  this.loadData();
};

jQYTPlayer.prototype = {
  currentTime:0,
  videoId:null,
  code:null,
  data:{currentTime:0,duration:0},
  btnClass:null,
  yt:null,
  ready:false,
  paused:false,
  iframe:null,
  timer:null,
  options:{},
  date:null,
  duration:0,
  onPause:null,
  onPlay:null,
  onStop:null,
  onPlaying:null,
  onReadyCallback:null,
  onLoadDataCallback:null,
  onStateChangeCallback:null,
  onEnd:null,
  onBufferize:null,
  loadData:function(onlyupdate)
  {
    this.onlyupdate = onlyupdate ? true : false;
    if(!this.onlyupdate)
      this.onYTReady();

    if(typeof this.onLoadDataCallback == 'function')
    {
      this.onLoadDataCallback();
    }
  },
  onYTReady:function()
  {
    if(!youtubePlayerReady)
    {
      setTimeout($.proxy(this.onYTReady, this), 300);
    }else{
      this.yt = new YT.Player(this.id, {
        videoId: this.code,
        width: this.options.width,
        height: this.options.height,
        timeout:0,
        playerVars: {
          'controls': this.options.controls,
          'showinfo':this.options.showinfo,
          'autoplay': this.options.autoplay,
          'enablejsapi': 0,
          'start':this.options.start,
          'theme':this.options.theme,
          'iv_load_policy':this.options.policy,
          'wmode':'transparent',
          'rel':this.options.rel
        },
        events: {
          'onReady': $.proxy(this.onReady, this),
          'onStateChange': $.proxy(this.onStateChange, this)
        }
      });

      this.iframe = this.yt.getIframe();
    }
  },
  onReady:function()
  {
    this.ready = true;
    this.timer = setInterval($.proxy(this.follower, this), 1000);
    if(typeof this.onReadyCallback == 'function')
    {

      this.onReadyCallback();
    }
  },
  onStateChange:function(a)
  {
    switch(a.data)
    {
      case YT.PlayerState.BUFFERING:
      case YT.PlayerState.CUED:
        this.loading(true);
        if(typeof this.onBufferize =='function')
        {
          this.onBufferize();
        }
        break;
      case YT.PlayerState.ENDED:
        if(this.options.loop=='1')
        {
          this.seekTo(0);
          this.play();
        }else{
          this.stop();
        }
        if(typeof this.onEnd =='function')
        {
          this.onEnd();
        }
        break;
      case YT.PlayerState.PAUSED:
        this.paused = true;
        if(typeof this.onPause =='function')
        {
          this.onPause();
        }
        break;
      case YT.PlayerState.PLAYING:
        this.paused = false;
        this.loading(false);
        if(typeof this.onPlay =='function')
        {
          this.onPlay();
        }
        break;
    }

    if(typeof this.onStateChangeCallback == 'function')
      this.onStateChangeCallback();
  },
  pause:function()
  {
    if(this.ready)
      this.yt.pauseVideo();
  },
  play:function(code)
  {
    if(this.ready)
    {
      this.loading(true);
      if(code)
      {
        this.code = code;
        this.loadData(true);
        this.yt.loadVideoById(code);
      }else{
        this.yt.playVideo();
      }
    }
  },
  stop:function()
  {
    if(this.ready)
    {
      this.seekTo(0);
      var _yt = this.yt;
      setTimeout(function()
      {
        if(_yt)
          _yt.stopVideo();
      },100);

      if(typeof this.onStop =='function')
      {
        this.onStop();
      }
    }
  },
  setVolume:function(v)
  {
    if(this.ready)
      this.yt.setVolume(v);
  },
  seekTo:function(to)
  {
    if(this.ready)
      this.yt.seekTo(to);
  },
  follower:function()
  {
    this.data.currentTime = this.yt ? this.yt.getCurrentTime() : 0;
    this.data.duration = this.yt ? this.yt.getDuration() : 0;
    if(typeof this.onPlaying == 'function')
    {
      this.onPlaying();
    }
  },
  getProgress:function()
  {
    return Math.round(this.data.currentTime/this.data.duration*100);
  },
  loading:function(b)
  {
    if(b)
    {
      if($(this.loader).length)
        $(this.loader).show();
    }else{
      if($(this.loader).length)
        $(this.loader).hide();
    }
  }
};

var youtubePlayerReady = false;
function onYouTubeIframeAPIReady()
{
  youtubePlayerReady = true;
}

jQuery.fn.extend({
  jQYTPlayer: function(code,options){
    var _jQ = new jQYTPlayer($(this).attr('id'), code, options);
    $(window).on('resize', $.proxy(_jQ.onResize, _jQ));
    return _jQ;
  }
});