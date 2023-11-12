import {Swappable, Plugins} from '@shopify/draggable';

document.addEventListener("DOMContentLoaded",function(){
  const imageContainers = document.querySelectorAll('.image-container');

  if (imageContainers.length === 0) {
    return false;
  }

  const swappable = new Swappable(imageContainers, {
    draggable: 'img',
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Plugins.ResizeMirror],
  });

});