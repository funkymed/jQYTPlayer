/**
 * Player by Cyril Pereira
 * 01 / 2014
 * @param youtubecode
 * @constructor
 */
var Player = function(youtubecode){
  this.date = new Date().getTime();
  this.id = 'yt'+this.date;

  this.youtubecode = youtubecode;

  this.test();

  this.yt = new YT.Player(this.id, {
    videoId: youtubecode,
    height: '100%',
    width: '100%',
    playerVars: {
      'controls': 0,
      'showinfo':0,
      'autoplay': 0,
      'enablejsapi': 0,
      'origin':'localhost',
      'theme':'dark',
      'iv_load_policy':3,
      'rel':0
    },
    events: {
      'onReady': $.proxy(this.onReady, this),
      'onStateChange': $.proxy(this.onStateChange, this)
    }
  });

  this.iframe = this.yt.getIframe();
};

Player.prototype = {
  timecode:0,
  id:null,
  yt:null,
  youtubecode:'',
  iframe:null,
  timer:null,
  date:null,
  callback:null,
  duration:0,
  test:function()
  {
    this.class    = 'btn'+this.date;
    this.idTimer  = 'timer'+this.date;
    $('#videos').append('<div id="'+this.id+'"></div>');
    $('#video_controllers').append('<button class="'+ this.class +'">play</button>');
    $('.'+this.class).on('click' ,$.proxy( this.btns, this ));
  },
  onReady:function()
  {
    if(typeof this.callback == 'function')
    {
      this.callback();
    }
    //this.yt.mute();
  },
  onStateChange:function(a)
  {
    switch(a.data)
    {
      case YT.PlayerState.ENDED:
      case YT.PlayerState.PAUSED:
      case YT.PlayerState.BUFFERING:
      case YT.PlayerState.CUED:
        //this.stopTimer();
        //$(this.iframe).hide();
        break;
      case YT.PlayerState.PLAYING:
        live.enableBtn();
        //this.startTimer();
        $(this.iframe).hide();
        live.switchIndex(this.youtubecode);
        $(this.iframe).fadeIn();
        live.stopAllVideo(this.youtubecode);
        break;
    }
  },
  startTimer:function()
  {
    if(this.timer)
    {
      this.stopTimer();
    }
    this.timer = setInterval($.proxy(this.updateTimer, this ),50);
  },
  stopTimer:function()
  {
    if(this.timer)
    {
      clearInterval(this.timer);
    }
  },
  btns:function(a)
  {
    switch($(a.target).html()){
      case "play":
        this.play();
        break;
      case "pause":
        this.pause();
        break;
      case "stop":
        this.stop();
        break;
    }
  },
  play:function()
  {
    live.disableBtn();
    this.yt.playVideo();
  },
  pause:function()
  {
    this.yt.pauseVideo();
  },
  stop:function()
  {
    this.seekTo(0);
    this.yt.stopVideo();
    setTimeout($.proxy(this.updateTimer,this), 500);
  },
  getYoutubeCode:function()
  {
    return this.youtubecode;
  },
  getCurrentTimeCode:function()
  {
    return this.timecode;
  },
  seekTo:function(timecode)
  {
    this.yt.seekTo(timecode);
  },
  updateTimer:function()
  {
    this.timecode = this.yt.getCurrentTime();
    var pourcentage = Math.ceil(this.timecode/this.duration*100);
    $('#b'+this.date+' .progress-bar').css('width',pourcentage+'%');
    $('#'+this.idTimer).val(this.timecode);
  }
};
