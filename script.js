<script>
    const songs = [
        {
            title: "Perfect",
            artist: "Ed Sheeran",
            lyrics: "I found a love, for me...\nDarling just dive right in..."
        },
        {
            title: "Shape of You",
            artist: "Ed Sheeran",
            lyrics: "The club isn't the best place to find a lover..."
        },
        {
            title: "Someone Like You",
            artist: "Adele",
            lyrics: "I heard that you're settled down..."
        }
    ];

    function searchSongs() {
        const keyword = document.getElementById("searchInput").value.toLowerCase();
        const resultsDiv = document.getElementById("results-area");
        resultsDiv.innerHTML = "";

        const filtered = songs.filter(song =>
            song.title.toLowerCase().includes(keyword) ||
            song.artist.toLowerCase().includes(keyword)
        );

        if (filtered.length === 0) {
            resultsDiv.innerHTML = "<p>No songs found</p>";
            return;
        }

        filtered.forEach((song, index) => {
            const songDiv = document.createElement("div");
            songDiv.className = "song";

            songDiv.innerHTML = `
                <div class="song-info">
                    <strong>${song.title}</strong> - ${song.artist}
                </div>
                <button onclick="toggleLyrics(${index})">Get Lyrics</button>
            `;

            const lyricsDiv = document.createElement("div");
            lyricsDiv.className = "lyrics";
            lyricsDiv.id = "lyrics-" + index;
            lyricsDiv.textContent = song.lyrics;

            const wrapper = document.createElement("div");
            wrapper.appendChild(songDiv);
            wrapper.appendChild(lyricsDiv);

            resultsDiv.appendChild(wrapper);
        });
    }

    function toggleLyrics(index) {
        const el = document.getElementById("lyrics-" + index);
        el.style.display = el.style.display === "block" ? "none" : "block";
    }
</script>