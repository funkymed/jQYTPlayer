# Youtube Player

Author : Cyril Pereira

Control the Youtube Player only by code and without iframe.
You can custom the player, make your own.
You can get all the informations, title, length, currentTime and state.

## Install

First of all in your root page of react you will need to add this in your header
```html
<head>
    <script type="text/javascript" src="//www.youtube.com/player_api"></script>
    <script type="text/javascript">
        var youtubePlayerReady = false;
        function onYouTubeIframeAPIReady() {
            youtubePlayerReady = true;
        }
    </script>
</head>
```

```bash
yarn add funkymed-youtube-player --save
```

And in your compennent add those lines in the render

```javascript
render(){
    return (
        <div>
            <YoutubePlayer code="Zrock_tnsSQ" />
        </div>
    );
}
```

## Build

```bash
yarn build
```

## Test

```bash
yarn start
```

in your browser go the url http://localhost:3001/

## Demo

The component in action : http://medcg.free.fr/tmp/npm-youtube-player

## Options

```javascript
{
  width:640,
  height:360,
  loop:false,
  autoplay:true,
  controls:true,
  showinfo:true,
  theme:'dark', // dark or light
  start:0,      // where the video start
  policy:3,     // 1 or 3
  rel:0         // 0 or 1 Display related video at the end
}
```

Check the example to have a full information about implementation
