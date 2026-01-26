import { useState, useEffect, useMemo, useCallback } from 'react';
import { FaDownload } from 'react-icons/fa';
import artistsData from './data/artists.json';
import { Artist } from './types';
import { categorizeSkills } from './utils/skillCategorization';
import { useArtistFilters } from './hooks/useArtistFilters';
import { FilterRow } from './components/FilterRow';
import { TableHeader } from './components/TableHeader';
import { ArtistRow } from './components/ArtistRow';

function App() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  // Skill 2 and Skill 3 independent filters
  const [selectedSkill, setSelectedSkill] = useState(''); // Skill 2
  const [selectedSkill3, setSelectedSkill3] = useState(''); // Skill 3
  const [selectedBuild, setSelectedBuild] = useState('');
  const [selectedRanking, setSelectedRanking] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState('');

  // Save artists to JSON file
  const saveArtists = async (updatedArtists: Artist[]) => {
    try {
      setArtists(updatedArtists);
    } catch (error) {
      // Silently handle errors - state update failures are handled by React
      if (error instanceof Error) {
        // Could add error reporting service here in production
      }
    }
  };

  // Handle adding a new artist
  const handleAddArtist = useCallback((artistData: Artist) => {
    const updatedArtists = [...artists, artistData];
    saveArtists(updatedArtists);
  }, [artists]);

  // Load artists data on component mount
  useEffect(() => {
    try {
      // Always load from artistsData to ensure we have the latest data
      setArtists(artistsData);
      // Save to localStorage
      localStorage.setItem('apexArtists', JSON.stringify(artistsData));
    } catch (error) {
      // Error loading artists - fallback to initial data
      // Fall back to initial data if there's an error
      setArtists(artistsData);
    }

    // Listen for messages from the add-artist window
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'ADD_ARTIST') {
        handleAddArtist(event.data.artist);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleAddArtist]);

  // Save to localStorage whenever artists change
  useEffect(() => {
    if (artists.length > 0) {
      try {
        localStorage.setItem('apexArtists', JSON.stringify(artists));
      } catch (error) {
        // Error saving to localStorage - non-critical, continue silently
      }
    }
  }, [artists]);

  // Ensure legend width matches table width so it centers visually under the table
  useEffect(() => {
    const updateLegendWidth = () => {
      const table = document.querySelector('table');
      const legend = document.getElementById('skill-legend');
      const main = document.querySelector('main');
      if (table && legend && main) {
        const tableRect = (table as HTMLElement).getBoundingClientRect();
        const mainRect = (main as HTMLElement).getBoundingClientRect();
        const width = Math.round(tableRect.width);
        const leftOffset = Math.round(tableRect.left - mainRect.left);
        const legendEl = legend as HTMLElement;
        legendEl.style.boxSizing = 'border-box';
        legendEl.style.width = 'auto';
        // position under table
        legendEl.style.marginLeft = `${leftOffset}px`;
        // helpful debug info in console
        // eslint-disable-next-line no-console
        // Legend alignment calculated
      }
    };
    // Run after a tick to ensure layout settled
    const t = setTimeout(updateLegendWidth, 50);
    window.addEventListener('resize', updateLegendWidth);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateLegendWidth);
    };
  }, [artists]);

  // Get unique values for filters - memoized to avoid recalculation
  const rankOptions = useMemo(() => [...new Set(artists.map((artist) => artist.rank))], [artists]);
  const roles = useMemo(() => [...new Set(artists.map((artist) => artist.position))], [artists]);
  const genres = useMemo(() => [...new Set(artists.map((artist) => artist.genre))], [artists]);
  const allSkills = useMemo(() => [...new Set(artists.map((artist) => artist.skills[1]).filter(Boolean))], [artists]); // Only Skill 2
  const allSkills3 = useMemo(() => [...new Set(artists.map((artist) => artist.skills[2]).filter(Boolean))], [artists]); // Only Skill 3
  
  // Skill categorization using shared utilities
  const skill2Categories = useMemo(() => categorizeSkills(allSkills), [allSkills]);
  const skill3Categories = useMemo(() => categorizeSkills(allSkills3), [allSkills3]);
  
  const worstSkills = skill2Categories.worstSkills;
  const badSkills = skill2Categories.badSkills;
  const bestSkills = skill2Categories.bestSkills;
  const goodSkills = skill2Categories.goodSkills;
  const okaySkills = skill2Categories.okaySkills;

  const worstSkills3 = skill3Categories.worstSkills;
  const badSkills3 = skill3Categories.badSkills;
  const bestSkills3 = skill3Categories.bestSkills;
  const goodSkills3 = skill3Categories.goodSkills;
  const okaySkills3 = skill3Categories.okaySkills;

  const buildOptions = useMemo(() => [...new Set(artists.map((artist) => artist.build).filter(Boolean))], [artists]);
  const photosOptions = useMemo(() => [...new Set(artists.map((artist) => artist.photos).filter(Boolean))], [artists]);

  // Use custom hook for filtering
  const skillArrays = useMemo(() => ({
    bestSkills,
    goodSkills,
    okaySkills,
    badSkills,
    worstSkills,
    bestSkills3,
    goodSkills3,
    okaySkills3,
    badSkills3,
    worstSkills3,
  }), [bestSkills, goodSkills, okaySkills, badSkills, worstSkills, bestSkills3, goodSkills3, okaySkills3, badSkills3, worstSkills3]);

  const { filteredArtists, calculatePoints } = useArtistFilters({
    artists,
    filters: {
      searchTerm,
      selectedRank,
      selectedRole,
      selectedGenre,
      selectedSkill,
      selectedSkill3,
      selectedBuild,
      selectedRanking,
      selectedPhotos,
    },
    skillArrays,
  });

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center py-8 text-white gap-8 px-4">
        {/* Page Title */}
        <header className="flex flex-col items-center gap-4 app-header">
          <h1
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_25px_rgba(236,72,153,0.6)] tracking-tight text-center bg-gradient-to-r from-pink-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent animate-pulse"
            style={{ color: '#ffffff' }}
          >
            Mick's Awesome SSR Artist Helper
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/?page=create';
              }}
              className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform font-bold flex items-center justify-center aspect-square w-12 h-12"
              style={{ fontSize: '22px' }}
              title="SR Artists"
              aria-label="Navigate to SR Artists page"
            >
              SR
            </button>
            <button
              type="button"
              onClick={() => {
                try {
                  const dataStr = JSON.stringify(artists, null, 2);
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'artist-and-records-1.9.json';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  // Export successful
                } catch (err) {
                  // Export failed - could show user notification here
                }
              }}
              className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform flex items-center justify-center aspect-square w-12 h-12"
              title="Download artist-and-records-1.9.json"
              aria-label="Download artists data as JSON file"
            >
              <FaDownload size={22} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-fit flex flex-col items-center bg-gradient-to-br from-violet-700/90 via-fuchsia-700/85 to-pink-600/90 rounded-2xl text-white shadow-[0_0_40px_rgba(219,39,119,0.5)] border-2 border-pink-400/50 backdrop-blur-md ring-2 ring-fuchsia-400/40 hover:shadow-[0_0_60px_rgba(219,39,119,0.7)] transition-all duration-300 mx-auto">
          <div className="overflow-x-auto w-full">
            <table
              className="table-fixed table-force-white table-with-spacing italic"
              role="table"
              aria-label="SSR Artists table with filters"
            >
              <thead className="bg-gray-800/95 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
                <FilterRow
                  artists={artists}
                  searchTerm={searchTerm}
                  selectedGenre={selectedGenre}
                  selectedRole={selectedRole}
                  selectedRank={selectedRank}
                  selectedSkill={selectedSkill}
                  selectedSkill3={selectedSkill3}
                  selectedRanking={selectedRanking}
                  selectedPhotos={selectedPhotos}
                  selectedBuild={selectedBuild}
                  genres={genres}
                  roles={roles}
                  rankOptions={rankOptions}
                  bestSkills={bestSkills}
                  goodSkills={goodSkills}
                  okaySkills={okaySkills}
                  badSkills={badSkills}
                  worstSkills={worstSkills}
                  bestSkills3={bestSkills3}
                  goodSkills3={goodSkills3}
                  okaySkills3={okaySkills3}
                  badSkills3={badSkills3}
                  worstSkills3={worstSkills3}
                  buildOptions={buildOptions}
                  photosOptions={photosOptions}
                  onSearchChange={setSearchTerm}
                  onGenreChange={setSelectedGenre}
                  onRoleChange={setSelectedRole}
                  onRankChange={setSelectedRank}
                  onSkillChange={setSelectedSkill}
                  onSkill3Change={setSelectedSkill3}
                  onRankingChange={setSelectedRanking}
                  onPhotosChange={setSelectedPhotos}
                  onBuildChange={setSelectedBuild}
                />
                <TableHeader />
              </thead>
              <tbody className="bg-gray-800/80">
                {filteredArtists.map((artist) => (
                  <ArtistRow
                    key={artist.id}
                    artist={artist}
                    calculatePoints={calculatePoints}
                    skillArrays={skillArrays}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* Legend (moved inside main to align with table width) */}
          <div
            id="skill-legend"
            className="mt-8 mb-4 px-6 py-4 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-xl border-2 border-fuchsia-400/40 shadow-[0_0_30px_rgba(192,38,211,0.4)] relative z-10 w-fit mx-auto hover:shadow-[0_0_40px_rgba(192,38,211,0.6)] hover:border-pink-400/60 transition-all duration-300"
          >
            <h3
              className="text-xl font-bold text-pink-100 mb-4 text-center drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
              style={{ color: '#ffffff' }}
            >
              Skill Color Legend
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 place-items-center">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-slate-600 to-slate-700 damage-to-player">
                  Gold&#9;
                </span>
                <span className="text-white text-sm" style={{ color: '#ffffff' }}>
                  Best Skills (Damage to Player, 60% Basic Attack Damage)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-slate-700 to-slate-800 skill-good">
                  Green&#9;
                </span>
                <span className="text-white text-sm" style={{ color: '#ffffff' }}>
                  Good Skills (50% BA Damage, Skill Damage variants)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-slate-600 to-slate-700 blue-text">
                  Blue&#9;
                </span>
                <span className="text-white text-sm font-bold legend-white">Reduction Skills</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-slate-600 to-slate-700 violet-text">
                  Violet&#9;
                </span>
                <span className="text-white text-sm font-bold legend-white">Okay Skills</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-slate-600 to-slate-700 skill-specific-worst">
                  Red&#9;
                </span>
                <span className="text-white text-sm" style={{ color: '#ffffff' }}>
                  Worst Skills (DPS variants, Drive Speed, etc.)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-slate-600 to-slate-700 gold-text">
                  Orange&#9;
                </span>
                <span className="text-white text-sm font-bold legend-white">
                  Gold Gathering Skill
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-slate-600 to-slate-700"
                  style={{ color: '#ffffff', fontWeight: '700' }}
                >
                  White&#9;
                </span>
                <span className="text-white text-sm font-bold" style={{ color: '#ffffff' }}>
                  Capacity Increase Skills
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 py-4 w-full flex justify-center items-center text-sm relative z-10">
          <p className="text-white font-medium">© {new Date().getFullYear()} JustMick</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
