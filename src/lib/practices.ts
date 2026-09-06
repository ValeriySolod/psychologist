export const groundingPractice = {
  title: "Техніка 5–4–3–2–1",
  items: [
    "5 речей, які бачите навколо",
    "4 речі, яких торкаєтесь",
    "3 звуки, які чуєте",
    "2 запахи, які відчуваєте",
    "1 глибокий видих",
  ],
};

export const parentingPractice = {
  title: "Підтримка дитини при тривозі",
  items: [
    "Спершу — власний спокійний видих, потім слова",
    "Назвіть почуття дитини вголос: «Тобі страшно, я поруч»",
    "Дихайте разом — рахунок або пальці замість пояснень",
    "Після — коротка звична дія: казка, гра, обійми",
  ],
};

export const breathingSteps = [
  { src: "/images/photos/Inhale2x.png", alt: "Вдих — 4 секунди" },
  { src: "/images/photos/HoldingBreath2x.png", alt: "Затримка після вдиху — 4 секунди" },
  { src: "/images/photos/Exhale2x.png", alt: "Видих — 4 секунди" },
  { src: "/images/photos/HoldingBreath2x.png", alt: "Затримка після видиху — 4 секунди" },
] as const;

export const STEP_DURATION_MS = 4000;

export function getBreathingStep(elapsedMs: number) {
  if (!Number.isFinite(elapsedMs) || elapsedMs < 0) return 0;
  return Math.floor(elapsedMs / STEP_DURATION_MS) % breathingSteps.length;
}

export type PracticeState = { checked: boolean[]; isOpen: boolean; rating: number };
export type PracticeAction =
  | { type: "check"; index: number; checked: boolean }
  | { type: "rate"; value: number }
  | { type: "close" };

export function createPracticeState(count: number): PracticeState {
  if (!Number.isInteger(count) || count < 1) throw new RangeError("A practice must have at least one step");
  return { checked: Array<boolean>(count).fill(false), isOpen: false, rating: 0 };
}

export function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case "check": {
      if (!Number.isInteger(action.index) || action.index < 0 || action.index >= state.checked.length || state.checked[action.index] === action.checked) return state;
      const checked = state.checked.map((value, index) => index === action.index ? action.checked : value);
      const completed = checked.every(Boolean);
      return { checked, isOpen: completed, rating: completed ? state.rating : 0 };
    }
    case "rate":
      return state.isOpen && Number.isInteger(action.value) && action.value >= 1 && action.value <= 5
        ? { ...state, rating: action.value }
        : state;
    case "close":
      return { ...state, isOpen: false };
  }
}
