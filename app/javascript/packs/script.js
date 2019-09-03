import dayjs from 'dayjs';
import domtoimage from 'dom-to-image';

let currentMonth = dayjs()
  .format('MMMMYYYY')
  .toLowerCase();

const nextMonth = dayjs()
  .add(1, 'month')
  .format('MMMMYYYY')
  .toLowerCase();

document.addEventListener('DOMContentLoaded', function() {
  const thumbGallery = document.getElementById('downloadThumbGallery');
  const featuredGallery = document.getElementById('downloadFeaturedGallery');

  const thumb = document.getElementsByClassName('thumb')[0];
  const container = document.getElementsByClassName('container')[0];

  thumbGallery.addEventListener('click', downloadThumbGallery);
  featuredGallery.addEventListener('click', downloadFeaturedGallery);

  function downloadThumbGallery() {
    domtoimage.toJpeg(thumb, { quality: 0.95 }).then(function(dataUrl) {
      var link = document.createElement('a');
      link.download = `${currentMonth}-square.jpg`;
      link.href = dataUrl;
      link.click();
    });
  }

  function downloadFeaturedGallery() {
    domtoimage.toJpeg(container, { quality: 0.95 }).then(function(dataUrl) {
      var link = document.createElement('a');
      link.download = `${currentMonth}-featured.jpg`;
      link.href = dataUrl;
      link.click();
    });
  }

  const month = document.getElementById('month');
  month.placeholder = `eg: ${nextMonth}`;

  month.addEventListener('input', function(evt) {
    currentMonth = this.value.toLowerCase();
  });

  const monthTitle = document.getElementById('monthTitle');
  monthTitle.innerText = `Is this for ${dayjs().format('MMMM')}? If not...`;
});
