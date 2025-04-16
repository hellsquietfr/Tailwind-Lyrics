interface Song {
    title: string;
    url: string;
}

class SongSearch {
    private songs: Song[];
    private searchInput: HTMLInputElement;
    private songGrid: HTMLElement;

    constructor() {
        this.songs = this.getAllSongs();
        this.searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        this.songGrid = document.querySelector('.grid') as HTMLElement;
        this.initializeSearch();
    }

    private getAllSongs(): Song[] {
        const songElements = document.querySelectorAll('.grid a');
        return Array.from(songElements).map(element => ({
            title: (element.querySelector('h2') as HTMLElement).textContent?.toLowerCase() || '',
            url: (element as HTMLAnchorElement).href
        }));
    }

    private initializeSearch(): void {
        this.searchInput.addEventListener('input', () => {
            const searchTerm = this.searchInput.value.toLowerCase();
            const filteredSongs = this.songs.filter(song => 
                song.title.includes(searchTerm)
            );
            this.updateDisplay(filteredSongs);
        });
    }

    private updateDisplay(filteredSongs: Song[]): void {
        const songElements = document.querySelectorAll('.grid a');
        songElements.forEach(element => {
            const title = (element.querySelector('h2') as HTMLElement).textContent?.toLowerCase() || '';
            const shouldShow = filteredSongs.some(song => song.title === title);
            (element as HTMLElement).style.display = shouldShow ? 'block' : 'none';
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SongSearch();
});