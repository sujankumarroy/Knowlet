import { getHistoryPaths } from "@/db/user/history";
import StatsBlock from "./Block";
import { parseResourcePath } from "@/components/dashboard/resources/utils";
import sortByPath from "@/utils/sortByPath";
import { USER_LEVELS } from "@/config/constants";

type HistoryItem = {
  path: string;
};

function getLevelData(history: HistoryItem[]) {
  const xp = calculateXp(history);

  let level = 1;
  let required = 20;
  let previousRequired = 0;

  while (xp >= required) {
    previousRequired = required;
    level++;
    required = Math.floor(required * 1.6);
  }

  const progressPercent =
    ((xp - previousRequired) / (required - previousRequired)) * 100;

  const levelName = USER_LEVELS[level - 1] || "Legend";

  return {
    level,
    levelName,
    xp,
    previousRequired,
    required,
    progressPercent: Math.min(progressPercent, 100).toFixed(2),
  };
}

function calculateXp(history: HistoryItem[]) {
  if (!history.length) return 0;

  const sortedHistory = sortByPath(history);

  let xp = 0;
  let streak = 0;

  let lastPath = "";
  let lastSlug = "";

  xp = [...new Set(history.map((i) => i.path))].length;

  for (const item of sortedHistory) {
    const path = item.path;
    const { paperSlug } = parseResourcePath(path);

    const parts = path.split("/");
    const slug = parts.slice(0, paperSlug ? 3 : 2).join("/");

    if (lastPath && lastPath === path) {
      xp += 0.5;
    } else if (lastSlug && lastSlug === slug) {
      streak += 1;
      xp += Math.min(streak * 0.5, 5);
    } else {
      streak = 0;
    }

    lastPath = path;
    lastSlug = slug;
  }

  return xp;
}

export default async function LevelBlock({ userId }: { userId: string }) {
  const history = await getHistoryPaths(userId)
    .then((h) =>
      h.map((i) => ({
        created_at: i.created_at,
        path: i.resource.path,
      })),
    )
    .catch((error) => {
      console.log(error);
      return [];
    });

  const levelData = getLevelData(history);
  const { level, levelName, xp, required, progressPercent } = levelData;

  return (
    <StatsBlock title="Level">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500">Current Level</p>
          <p className="text-lg font-semibold leading-tight">
            {level} · {levelName}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">XP</p>
          <p className="text-sm font-medium">{xp}</p>
        </div>
      </div>

      <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />

        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-500">
          {required - xp} XP to next level
        </p>

        <p className="text-xs text-gray-400">{progressPercent}% complete</p>
      </div>
    </StatsBlock>
  );
}
