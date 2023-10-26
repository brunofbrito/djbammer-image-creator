import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

let currentMonth = dayjs().format('MMMMYYYY').toLowerCase();
let currentYear = dayjs().format('YYYY');
const nextMonth = dayjs().add(1, 'month').format('MMMMYYYY').toLowerCase();

document.addEventListener('DOMContentLoaded', function () {

  const newDocument = document.implementation.createHTMLDocument('New Document');
  const newDocElement = newDocument.documentElement;
  newDocElement.innerHTML = gon.tracklist;
  const table = Array.from(newDocument.querySelectorAll('tr')).slice(1);
  let tracklist = []
  table.forEach((element, index) => {
    let track = "<li><strong>" + element.querySelector('td:nth-child(4)').textContent + "</strong> - " + element.querySelector('td:nth-child(3)').textContent + "</li>"
    tracklist.push(track);
  });
  tracklist = `<ol>${tracklist.join("")}</ol>`

  let fullTracklistData = `{
    id: 305,
    slug: '${currentMonth}',
    publishedDate: '${dayjs().format('YYYY-MM-DDTHH:mm')}',
    title: '${dayjs().format('MMMM YYYY')}',
    year: 2023,
    tracklist: '${tracklist}',
    mixcloud: 'https://f001.backblazeb2.com/file/djbammer-mixes/${currentYear}/${currentMonth}.mp3',
    waveform: 'https://f001.backblazeb2.com/file/djbammer-mixes/${currentYear}/${currentMonth}.json',
    fileName: 'http://mixes.djbammer.net/${currentYear}/${currentMonth}.mp3',
  },`
  
  let textArea = document.getElementById('tracklistData');
  textArea.value = fullTracklistData;

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

  const monthTitle = document.getElementById('monthTitle');
  monthTitle.innerText = `Is this for ${dayjs().format('MMMM')}? If not...`;

  document.getElementById('copyButton').addEventListener('click', function() {
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);
    document.execCommand('copy');
    textArea.setSelectionRange(0, 0);
    alert('Copied!');
  });
});
