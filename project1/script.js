const search = document.getElementById('search');
const resultsArea = document.getElementById('results-area');
const more = document.getElementById('more');
const apiURL = 'https://api.lyrics.ovh';

// Current pagination URLs
let prevURL = null;
let nextURL = null;

// Search by song or artist
async function searchSongs(url) {
    const term = search.value.trim();
    let fetchURL = url || `${apiURL}/suggest/${term}`;

   
    const res = await fetch(fetchURL);
    const data = await res.json();
    showData(data);
}

// Show song and artist in DOM
function showData(data) {
    resultsArea.innerHTML = `
        <ul class="songs">
            ${data.data.map(song => `
                <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button onclick="getLyrics('${song.artist.name}', '${song.title}')">Get Lyrics</button>
                </li>
            `).join('')}
        </ul>
    `;

    prevURL = data.prev ? `https://cors-anywhere.herokuapp.com/${data.prev}` : null;
    nextURL = data.next ? `https://cors-anywhere.herokuapp.com/${data.next}` : null;

    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button onclick="searchSongs('${data.prev}')">Prev</button>` : ''}
            ${data.next ? `<button onclick="searchSongs('${data.next}')">Next</button>` : ''}
        `;
    } else {
        more.innerHTML = '';
    }
}

//get lyrics button click
resultsArea.addEventListener('click', e => {
    const clickedE1 = e.target;

    if(clickedE1.tagName === 'BUTTON'){   // <-- fixed
        const artist = clickedE1.getAttribute('data-artist');
        const songTitle = clickedE1.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
});


async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${encodeURIComponent(artist)}/${encodeURIComponent(songTitle)}`);
    const data = await res.json();

    const lyricsArea = document.getElementById('lyrics-area');

    if(data.error){
        lyricsArea.innerHTML = `<p>${data.error}</p>`;
    } else {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        lyricsArea.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <p>${lyrics}</p>
        `;
    }
}
