import { useEffect, useState } from "react";

const REPOS_API = "https://api.github.com/users/Sanskar1724/repos?per_page=100";
const CACHE_KEY = "forge:github";
const CACHE_MS = 30 * 60 * 1000;

const SNAPSHOT = { repos: 31, stars: 103 };
const SNAPSHOT_LABEL = "GitHub snapshot, Oct 2026";

interface Live {
  repos: number;
  stars: number;
  byRepo: Record<string, number>;
}

interface GithubRepo {
  name: string;
  stargazers_count: number;
}

function readCache(): Live | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: Live };
    return Date.now() - at < CACHE_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data: Live) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // storage blocked: the next visit simply fetches again
  }
}

let pending: Promise<Live | null> | null = null;

function fetchLive() {
  pending ??= fetch(REPOS_API)
    .then((res) => (res.ok ? (res.json() as Promise<GithubRepo[]>) : null))
    .then((list) => {
      if (!list) return null;
      const data: Live = {
        repos: list.length,
        stars: list.reduce((sum, r) => sum + r.stargazers_count, 0),
        byRepo: Object.fromEntries(list.map((r) => [r.name, r.stargazers_count])),
      };
      writeCache(data);
      return data;
    })
    .catch(() => null);
  return pending;
}

export function useGithubStats() {
  const [live, setLive] = useState<Live | null>(readCache);

  useEffect(() => {
    if (live) return;
    let on = true;
    fetchLive().then((data) => { if (on && data) setLive(data); });
    return () => { on = false; };
  }, [live]);

  return {
    repos: live?.repos ?? SNAPSHOT.repos,
    stars: live?.stars ?? SNAPSHOT.stars,
    label: live ? "live from GitHub" : SNAPSHOT_LABEL,
    starsFor: (repoUrl: string, fallback?: number) => live?.byRepo[repoUrl.split("/").pop() ?? ""] ?? fallback,
  };
}
