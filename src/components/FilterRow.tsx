// Filter row component for artist table

import { Artist } from '../types';

interface FilterRowProps {
  artists: Artist[];
  searchTerm: string;
  selectedGenre: string;
  selectedRole: string;
  selectedGroup: string;
  selectedSkill: string;
  selectedSkill3: string;
  selectedRanking: string;
  selectedPhotos: string;
  selectedBuild: string;
  genres: string[];
  roles: string[];
  groupOptions: string[];
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
  buildOptions: string[];
  photosOptions: string[];
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onGroupChange: (value: string) => void;
  onSkillChange: (value: string) => void;
  onSkill3Change: (value: string) => void;
  onRankingChange: (value: string) => void;
  onPhotosChange: (value: string) => void;
  onBuildChange: (value: string) => void;
}

export const FilterRow = ({
  artists,
  searchTerm,
  selectedGenre,
  selectedRole,
  selectedGroup,
  selectedSkill,
  selectedSkill3,
  selectedRanking,
  selectedPhotos,
  selectedBuild,
  genres,
  roles,
  groupOptions,
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
  buildOptions,
  photosOptions,
  onSearchChange,
  onGenreChange,
  onRoleChange,
  onGroupChange,
  onSkillChange,
  onSkill3Change,
  onRankingChange,
  onPhotosChange,
  onBuildChange,
}: FilterRowProps) => {
  const artistNames = [...new Set(artists.map((artist) => artist.name))].sort();

  return (
    <tr className="align-middle bg-gradient-to-r from-violet-800/70 via-fuchsia-800/70 to-pink-700/70">
      <th className="px-1 py-2">
        <select
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by artist name"
        >
          <option value="">Select Artist</option>
          {artistNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </th>
      <th className="px-1 py-2">
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by genre"
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </th>
      <th className="px-1 py-2">
        <select
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by role"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </th>
      <th className="px-1 py-2">
        <select
          value={selectedGroup}
          onChange={(e) => onGroupChange(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by group"
        >
          <option value="">Select Group</option>
          {groupOptions.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </th>
      <th className="px-1 py-2">
        <select
          value={selectedSkill}
          onChange={(e) => onSkillChange(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by skill 2"
        >
          <option value="">Select Skill 2</option>
          <optgroup label="Best">
            {bestSkills.map((skill) => (
              <option key={`s2-best-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
          <optgroup label="Good">
            {goodSkills.map((skill) => (
              <option key={`s2-good-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
          <optgroup label="Okay">
            {okaySkills.map((skill) => (
              <option key={`s2-okay-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
          <optgroup label="Bad">
            {badSkills.map((skill) => (
              <option key={`s2-bad-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
          <optgroup label="Worst">
            {worstSkills.map((skill) => (
              <option key={`s2-worst-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
        </select>
      </th>
      <th className="px-1 py-2">
        <select
          value={selectedSkill3}
          onChange={(e) => onSkill3Change(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by skill 3"
        >
          <option value="">Select Skill 3</option>
          <optgroup label="Best">
            {bestSkills3.map((skill) => (
              <option key={`s3-best-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
          <optgroup label="Good">
            {goodSkills3.map((skill) => (
              <option key={`s3-good-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
          <optgroup label="Okay">
            {okaySkills3.map((skill) => (
              <option key={`s3-okay-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
          <optgroup label="Bad">
            {badSkills3.map((skill) => (
              <option key={`s3-bad-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
          <optgroup label="Worst">
            {worstSkills3.map((skill) => (
              <option key={`s3-worst-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
        </select>
      </th>
      <th className="px-1 py-2">
        <select
          value={selectedRanking}
          onChange={(e) => onRankingChange(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by ranking"
        >
          <option value="">Select Ranking</option>
          <option value="S">S</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="F">F</option>
        </select>
      </th>
      <th className="px-1 py-2">
        <select
          value={selectedPhotos}
          onChange={(e) => onPhotosChange(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by photos"
        >
          <option value="">Select Photos</option>
          {photosOptions.map((photo) => (
            <option key={photo} value={photo}>
              {photo}
            </option>
          ))}
        </select>
      </th>
      <th className="px-1 py-2">
        <select
          value={selectedBuild}
          onChange={(e) => onBuildChange(e.target.value)}
          className="w-full px-1.5 py-1 rounded-md bg-violet-900/60 border border-fuchsia-400/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400/70 cursor-pointer hover:border-pink-300/70 hover:bg-violet-800/60 transition-colors not-italic"
          aria-label="Filter by build"
        >
          <option value="">Select Build</option>
          {buildOptions.map((build) => (
            <option key={build} value={build}>
              {build}
            </option>
          ))}
        </select>
      </th>
    </tr>
  );
};
