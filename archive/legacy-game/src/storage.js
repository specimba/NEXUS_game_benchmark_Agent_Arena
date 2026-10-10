// ============================================================================
//  storage.js — corrupt-safe localStorage wrapper
//  Never throws; on parse failure or quota error returns a clean default so a
//  tampered / corrupted save can never crash the game (benchmark robustness).
// ============================================================================

const KEY = 'tidewright.save.v1';

const DEFAULT_SAVE = {
  version: 1,
  levels: {},          // levelId -> { stars, bestTime, cleared }
  settings: { graphics: 'auto', muted: false, reducedMotion: false },
  highestUnlocked: 1,
};

export function loadSave() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_SAVE);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') throw new Error('bad shape');
    // shallow-merge to tolerate missing/new fields
    return {
      ...structuredClone(DEFAULT_SAVE),
      ...parsed,
      levels: parsed.levels && typeof parsed.levels === 'object' ? parsed.levels : {},
      settings: { ...DEFAULT_SAVE.settings, ...(parsed.settings || {}) },
    };
  } catch (e) {
    console.warn('[storage] corrupted save reset:', e);
    return structuredClone(DEFAULT_SAVE);
  }
}

export function writeSave(save) {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
    return true;
  } catch (e) {
    console.warn('[storage] write failed (quota/private mode):', e);
    return false;
  }
}

export function resetSave() {
  try { localStorage.removeItem(KEY); } catch {}
  return structuredClone(DEFAULT_SAVE);
}

export { DEFAULT_SAVE };
