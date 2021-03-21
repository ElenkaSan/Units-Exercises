
async function getRandomGIF(enterInput) {
	let webGif = Math.round(Math.random() * 100);
	let url1 = `https://api.giphy.com/v1/gifs/search?api_key=ChCJqA15cCbdYYei158hBEUsiIXLoeJJ&q=${enterInput}&limit=1&offset=${webGif}&rating=g&lang=en`;
	let res1 = await axios.get(url1);
	let url2 = `https://api.giphy.com/v1/gifs/${res1.data.data[0].id}?api_key=ChCJqA15cCbdYYei158hBEUsiIXLoeJJ`;
 	let res2 = await axios.get(url2);    
	let GIFsrc = res2.data.data.images.original.url;

  let yourGif = document.createElement('div')
  let placeYourGif = document.getElementById('placeGIF');
  yourGif.classList.add('yourGifs');
  yourGif.innerHTML = `<img src="${GIFsrc}" alt="">`
	placeYourGif.appendChild(yourGif);	
	return GIFsrc;        
} 

  const form = document.querySelector('#searchform');
form.addEventListener('submit', function (e) {
  const input = document.querySelector('#title-input');
  e.preventDefault();
  getRandomGIF(input.value);
  input.value = '';
})

const dltBtn = document.getElementById('delete-btn');

dltBtn.addEventListener('click', function(e) {
    e.preventDefault();
	let results = document.getElementById('placeGIF');
    results.innerHTML = null;
});

