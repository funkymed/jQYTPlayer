#YT-Player

YT-Player is a player that will display a Youtube chromless fullscreen player, and manager to fade between many videos.

##How to use

HTML
~~~
<div class="contents">
    <div id="videos"></div>
    <div id="video_controllers"></div>
</div>
~~~

Javascript
~~~
var myPlaylist = ['mxfmxi-boyo','_YWMGuh15nE','rNqpD3Mg9hY','o9GLl6kI4hQ'];
~~~

Dont forgot to add those files at the end of your script
~~~
<script type="text/javascript" src="vendor/jquery/jquery-1.9.0.js"></script>
<script type="text/javascript" src="//www.youtube.com/player_api"></script>
<script type="text/javascript" src="js/player.js"></script>
<script type="text/javascript" src="js/ytplayer.js"></script>
~~~