// Custom hook for artist filtering logic

import { useMemo, useCallback } from 'react';
import { Artist, LetterGrade } from '../types';
import { calculateArtistPoints, getLetterGrade } from '../utils/artistCalculations';

interface FilterState {
  searchTerm: string;
  selectedRank: string;
  selectedRole: string;
  selectedGenre: string;
  selectedSkill: string;
  selectedSkill3: string;
  selectedBuild: string;
  selectedRanking: string;
  selectedPhotos: string;
}

interface UseArtistFiltersParams {
  artists: Artist[];
  filters: FilterState;
  skillArrays: {
    bestSkills: string[];
    goodSkills: string[];
    okaySkills: string[];
    badSkills: string[];
    terribleSkills: string[];
    bestSkills3: string[];
    goodSkills3: string[];
    okaySkills3: string[];
    badSkills3: string[];
    terribleSkills3: string[];
  };
}

export const useArtistFilters = ({ artists, filters, skillArrays }: UseArtistFiltersParams) => {
  const calculatePoints = useCallback(
    (artist: Artist) =>
      calculateArtistPoints(
        artist,
        skillArrays.bestSkills,
        skillArrays.goodSkills,
        skillArrays.okaySkills,
        skillArrays.badSkills,
        skillArrays.terribleSkills,
        skillArrays.bestSkills3,
        skillArrays.goodSkills3,
        skillArrays.okaySkills3,
        skillArrays.badSkills3,
        skillArrays.terribleSkills3
      ),
    [skillArrays]
  );

  const filteredArtists = useMemo(() => {
    return artists
      .filter((artist: Artist) => {
        const matchesSearch = filters.searchTerm === '' || artist.name === filters.searchTerm;
        const matchesRank = filters.selectedRank === '' || artist.rank === filters.selectedRank;
        const matchesRole = filters.selectedRole === '' || artist.position === filters.selectedRole;
        const matchesGenre =
          filters.selectedGenre === '' || artist.genre === filters.selectedGenre;
        const matchesSkill =
          filters.selectedSkill === '' || artist.skills[1] === filters.selectedSkill;
        const matchesSkill3 =
          filters.selectedSkill3 === '' || artist.skills[2] === filters.selectedSkill3;
        const matchesBuild =
          filters.selectedBuild === '' ||
          (artist.build && artist.build.toLowerCase().includes(filters.selectedBuild.toLowerCase()));
        const matchesRanking =
          filters.selectedRanking === '' ||
          getLetterGrade(calculatePoints(artist)) === filters.selectedRanking;
        const matchesPhotos =
          filters.selectedPhotos === '' || artist.photos === filters.selectedPhotos;

        return (
          matchesSearch &&
          matchesRank &&
          matchesRole &&
          matchesGenre &&
          matchesSkill &&
          matchesSkill3 &&
          matchesBuild &&
          matchesRanking &&
          matchesPhotos
        );
      })
      .sort((a, b) => {
        const aIsUR = a.rank.startsWith('UR');
        const bIsUR = b.rank.startsWith('UR');
        if (aIsUR !== bIsUR) return aIsUR ? 1 : -1; // push UR ranks to bottom
        const genreCompare = a.genre.localeCompare(b.genre);
        if (genreCompare !== 0) return genreCompare;
        const roleCompare = a.position.localeCompare(b.position);
        if (roleCompare !== 0) return roleCompare;
        return a.name.localeCompare(b.name);
      });
  }, [artists, filters, calculatePoints]);

  return { filteredArtists, calculatePoints };
};
