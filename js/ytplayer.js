var YTPlayer = function(Playlist){

  if(Playlist && typeof Playlist=='object')
  {
    this.videos = Playlist;
  }
  var scope = this;
  $(this.videos).each(function(a,b)
  {
    var p = new Player(b);
    $(p.iframe).hide();
    if(scope.players.length==0)
    {
      p.callback = p.play;
    }
    scope.players.push(p);
  });
};

YTPlayer.prototype = {
  videos:[],
  players:[],
  audio:null,
  switchIndex:function(code)
  {
    $(this.players).each(function()
    {
      if(this.youtubecode==code)
      {
        $('.'+this.class).addClass('active');
        $(this.iframe).css('zIndex', 10);
      }else{
        $('.'+this.class).removeClass('active');
        if($(this.iframe).css('zIndex')==10)
        {
          $(this.iframe).css('zIndex', 5);
        }else{
          $(this.iframe).css('zIndex', 1);
        }
      }
    });
  },
  stopAllVideo:function(code)
  {
    if(code)
    {
      $(this.players).each(function()
      {
        if(this.youtubecode!=code)
        {
          setTimeout($.proxy(this.pause,this),500);
        }
      });
    }else{
      $(this.players).each(function()
      {
        this.stop();
      });
    }
  },
  disableBtn:function()
  {
    $(this.players).each(function()
    {
      $('.'+this.class).attr("disabled", "disabled");
    });
  },
  enableBtn:function()
  {
    $(this.players).each(function()
    {
      $('.'+this.class).removeAttr("disabled");
    });
  }

};

var live;
function onYouTubePlayerAPIReady()
{
  live = new YTPlayer(myPlaylist);
}