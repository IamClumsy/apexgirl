// Artist row component for the table

import { Artist } from '../types';
import { getSkillClass } from '../utils/skillStyling';
import { getLetterGrade } from '../utils/artistCalculations';

interface ArtistRowProps {
  artist: Artist;
  calculatePoints: (artist: Artist) => number;
  skillArrays: {
    bestSkills: string[];
    goodSkills: string[];
    okaySkills: string[];
    badSkills: string[];
    worstSkills: string[];
    bestSkills3: string[];
    goodSkills3: string[];
    okaySkills3: string[];
    badSkills3: string[];
    worstSkills3: string[];
  };
}

export const ArtistRow = ({ artist, calculatePoints, skillArrays }: ArtistRowProps) => {
  const points = calculatePoints(artist);
  const grade = getLetterGrade(points);

  const getRankingClass = (grade: string) => {
    switch (grade) {
      case 'S':
        return 'ranking-a';
      case 'A':
        return 'ranking-b';
      case 'B':
        return 'ranking-c';
      case 'C':
        return 'ranking-d';
      case 'F':
        return 'ranking-f';
      default:
        return 'text-white';
    }
  };

  return (
    <tr
      className="hover:bg-amber-400/10 transition-colors duration-200"
      role="row"
    >
      <td className="px-1 py-2 whitespace-nowrap" role="gridcell">
        <div className="text-sm font-medium text-white" title={artist.name}>
          {artist.name}
        </div>
      </td>
      <td className="px-1 py-2 whitespace-nowrap" role="gridcell">
        <div className="text-sm text-amber-100" title={artist.genre}>
          {artist.genre}
        </div>
      </td>
      <td className="px-1 py-2 whitespace-nowrap" role="gridcell">
        <div className="text-sm text-white text-center" title={artist.position}>
          {artist.position}
        </div>
      </td>
      <td className="px-1 py-2 whitespace-nowrap" role="gridcell">
        <div
          className="text-sm font-medium text-white text-center"
          title={artist.rank}
        >
          {artist.rank}
          {artist.rating && artist.rating > 0 && (
            <span className="ml-1 text-xs text-white/80">
              ({(artist.rating as number).toFixed(1)})
            </span>
          )}
        </div>
      </td>
      <td className="px-1 py-2" role="gridcell">
        <div className="flex justify-center">
          {artist.skills[1] ? (
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs shadow-sm transition-all duration-200 ${getSkillClass(artist.skills[1])}`}
            >
              {artist.skills[1]}
            </span>
          ) : (
            <span className="text-white/50 text-xs">-</span>
          )}
        </div>
      </td>
      <td className="px-1 py-2" role="gridcell">
        <div className="flex justify-center">
          {artist.skills[2] ? (
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs shadow-sm transition-all duration-200 ${getSkillClass(artist.skills[2])}`}
            >
              {artist.skills[2]}
            </span>
          ) : (
            <span className="text-white/50 text-xs">-</span>
          )}
        </div>
      </td>
      <td className="px-1 py-2 whitespace-nowrap" role="gridcell">
        <div
          className="text-sm font-bold text-center"
          title={`Points: ${points}`}
        >
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-slate-600 to-slate-700 ${getRankingClass(grade)}`}
          >
            {grade}
          </span>
        </div>
      </td>
      <td className="px-1 py-2 text-center" role="gridcell">
        <span className="text-white text-sm">{artist.photos || 'N/A'}</span>
      </td>
      <td className="px-1 py-2 text-center" role="gridcell">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-sm`}
        >
          {artist.build || 'N/A'}
        </span>
      </td>
    </tr>
  );
};
