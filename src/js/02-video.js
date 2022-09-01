import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const TIME_FRAME = 'videoplayer-current-time';
let localStorageTime = localStorage.getItem(TIME_FRAME);
console.log(localStorageTime);

const onPlay = function (data) {
  const dataSecond = data.seconds;
  localStorage.setItem(TIME_FRAME, dataSecond);
  console.log(dataSecond);
};

player.on('timeupdate', throttle(onPlay, 1000));

if (localStorageTime !== null) {
  player
    .setCurrentTime(localStorageTime)

    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
