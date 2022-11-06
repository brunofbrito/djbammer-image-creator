import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

let currentMonth = dayjs().format('MMMMYYYY').toLowerCase();
const nextMonth = dayjs().add(1, 'month').format('MMMMYYYY').toLowerCase();

document.addEventListener('DOMContentLoaded', function () {
  const thumbGallery = document.getElementById('downloadThumbGallery');
  const featuredGallery = document.getElementById('downloadFeaturedGallery');

  const thumb = document.getElementsByClassName('thumb')[0];
  const container = document.getElementsByClassName('container')[0];

  thumbGallery.addEventListener('click', downloadThumbGallery);
  featuredGallery.addEventListener('click', downloadFeaturedGallery);

  function downloadThumbGallery() {
    html2canvas(thumb).then((canvas) => {
      canvas.toBlob(function (blob) {
        window.saveAs(blob, `${currentMonth}-square.jpg`);
      });
    });
  }

  function downloadFeaturedGallery() {
    html2canvas(container).then((canvas) => {
      canvas.toBlob(function (blob) {
        window.saveAs(blob, `${currentMonth}-featured.jpg`);
      });
    });
  }

  const month = document.getElementById('month');
  month.placeholder = `eg: ${nextMonth}`;

  month.addEventListener('input', function (evt) {
    currentMonth = this.value.toLowerCase();
  });

  const monthTitle = document.getElementById('monthTitle');
  monthTitle.innerText = `Is this for ${dayjs().format('MMMM')}? If not...`;
});
