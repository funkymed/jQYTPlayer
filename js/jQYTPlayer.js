/**
 * @param id of
 * @param code
 * @constructor
 */
var jQYTPlayer = function(id,code, options){
  this.code = code;
  this.id = id;
  this.options={
    width:300,
    height:200,
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

  this.onYTReady();
};

jQYTPlayer.prototype = {
  videoId:null,
  code:null,
  btnClass:null,
  yt:null,
  ready:false,
  paused:false,
  youtubecode:'',
  iframe:null,
  timer:null,
  option:{},
  date:null,
  duration:0,
  onPlay:null,
  onPause:null,
  onReadyCallback:null,
  onEnd:null,
  onYTReady:function()
  {
    if(!youtubePlayerReady)
    {
      setTimeout($.proxy(this.onYTReady, this), 300);
    }else{

      this.loader(false);

      this.date = new Date().getTime();

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
          'theme':this.options.dark,
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
        this.loader(true);
        break;
      case YT.PlayerState.ENDED:
        if(this.options.loop=='1')
        {
          this.seekTo(0);
          this.play();
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
        if(typeof this.onPlay =='function')
        {
          this.onPlay();
        }
        this.loader(false);
        break;
    }
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
      this.loader(true);
      if(code)
      {
        this.yt.loadVideoById(code);
      }else{
        this.yt.playVideo();
      }
    }
  },
  loader:function(s)
  {/*
   if($('.loader').length)
   {
   if(s)
   {
   $('.loader').fadeIn('fast');
   var scope= this;
   clearTimeout(this.timeout);
   this.timeout = setTimeout(function()
   {
   scope.loader(false);
   },10000);
   }else{
   $('.loader').fadeOut('fast');
   }
   }
   */
  },
  volume:function(v)
  {
    if(this.ready)
      this.yt.setVolume(v);
  },
  seekTo:function(to)
  {
    if(this.ready)
      this.yt.seekTo(to);
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
  }
});