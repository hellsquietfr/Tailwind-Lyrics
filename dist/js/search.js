"use strict";
class SongSearch {
    constructor() {
        this.songs = this.getAllSongs();
        this.searchInput = document.querySelector('input[type="search"]');
        this.songGrid = document.querySelector('.grid');
        this.initializeSearch();
    }
    getAllSongs() {
        const songElements = document.querySelectorAll('.grid a');
        return Array.from(songElements).map(element => {
            var _a;
            return ({
                title: ((_a = element.querySelector('h2').textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '',
                url: element.href
            });
        });
    }
    initializeSearch() {
        this.searchInput.addEventListener('input', () => {
            const searchTerm = this.searchInput.value.toLowerCase();
            const filteredSongs = this.songs.filter(song => song.title.includes(searchTerm));
            this.updateDisplay(filteredSongs);
        });
    }
    updateDisplay(filteredSongs) {
        const songElements = document.querySelectorAll('.grid a');
        songElements.forEach(element => {
            var _a;
            const title = ((_a = element.querySelector('h2').textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
            const shouldShow = filteredSongs.some(song => song.title === title);
            element.style.display = shouldShow ? 'block' : 'none';
        });
    }
}
// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SongSearch();
});
