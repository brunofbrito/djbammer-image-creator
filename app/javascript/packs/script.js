import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

let currentMonth = dayjs().format('MMMMYYYY').toLowerCase();
let currentYear = dayjs().format('YYYY');
const nextMonth = dayjs().add(1, 'month').format('MMMMYYYY').toLowerCase();

document.addEventListener('DOMContentLoaded', function () {
  const monthTitle = document.getElementById('monthTitle');
  monthTitle.innerText = `Is this for ${dayjs().format('MMMM')}? If not...`;

  const monthInput = document.getElementById('month');
  monthInput.placeholder = `eg: ${nextMonth}`;

  month.addEventListener('input', function (evt) {
    currentMonth = this.value.toLowerCase();
    generateTracklist(currentMonth);
  });
  
  generateTracklist(currentMonth);
  
  const downloadSquareBtn = document.getElementById('downloadThumbGallery');
  const thumb = document.getElementsByClassName('thumb')[0];
  const downloadFeaturedBtn = document.getElementById('downloadFeaturedGallery');
  const container = document.getElementsByClassName('featured')[0];
  downloadSquareBtn.addEventListener('click', () => { downloadThumbGallery(thumb)});
  downloadFeaturedBtn.addEventListener('click', () => {downloadFeaturedGallery(container)});

});

  function downloadThumbGallery(thumb) {
    html2canvas(thumb).then((canvas) => {
      canvas.toBlob(function (blob) {
        window.saveAs(blob, `${currentMonth}-square.png`);
      });
    });
  };

  function downloadFeaturedGallery(container) {
    html2canvas(container).then((canvas) => {
      canvas.toBlob(function (blob) {
        window.saveAs(blob, `${currentMonth}-featured.png`);
      });
    });
  };

function generateTracklist(currentMonth) {
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

  let formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1, -4);
  let year = currentMonth.slice(-4);

  let fullTracklistData = `{
  id: 305,
  slug: '${currentMonth}',
  publishedDate: '${dayjs().format('YYYY-MM-DDTHH:mm')}',
  title: '${currentMonth? formattedMonth + " " + year : dayjs().format('MMMM YYYY')}',
  year: ${year},
  tracklist: '${tracklist}',
  mixcloud: 'https://f001.backblazeb2.com/file/djbammer-mixes/${year}/${currentMonth}.mp3',
  waveform: 'https://f001.backblazeb2.com/file/djbammer-mixes/${year}/${currentMonth}.json',
  fileName: 'http://mixes.djbammer.net/${year}/${currentMonth}.mp3',
},`

  let textArea = document.getElementById('tracklistData');
  textArea.value = fullTracklistData;

  const copyButton = document.getElementById('copyButton')

  copyButton.addEventListener('click', function() {
    const initialBtnText = copyButton.innerHTML;
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);
    document.execCommand('copy');
    textArea.setSelectionRange(0, 0);
    copyButton.innerHTML = "Copied! &#10004;"
    setTimeout(function(){ copyButton.innerHTML = initialBtnText }, 2000);

  });
}