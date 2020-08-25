import { initProject } from './utils'
import config from './config.json'
import makeImage from './utils/makeImage'

initProject(config as any)

document.querySelector('.make-image').addEventListener('click', () => {
  makeImage(window.layer)
})

// new BackgroundLayerComponent()

// import imageUrl from './image.jpg';
// import './slice';

// const cvs = document.getElementById('canvas') as HTMLCanvasElement;
// cvs.width = 1400;
// cvs.height = 1000;

// const ctx = cvs.getContext('2d');

// const image = new Image();
// image.addEventListener('load', () => {
//   ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
// });
// image.setAttribute('src', imageUrl);
