export const getDifficultyColor = (difficulty: string | null) => {
  const normalizedDifficulty = (difficulty || "easy").toLowerCase();
  if (normalizedDifficulty === "easy") {
    return "text-[var(--easy-puzzle)]";
  } else if (normalizedDifficulty === "medium") {
    return "text-[var(--medium-puzzle)]";
  } else if (normalizedDifficulty === "hard") {
    return "text-[var(--hard-puzzle)]";
  }
  return "text-muted-foreground";
};

export const getDifficultyBgColor = (difficulty: string | null) => {
  const normalizedDifficulty = (difficulty || "easy").toLowerCase();
  if (normalizedDifficulty === "easy") {
    return "bg-[var(--easy-puzzle)]/10";
  } else if (normalizedDifficulty === "medium") {
    return "bg-[var(--medium-puzzle)]/10";
  } else if (normalizedDifficulty === "hard") {
    return "bg-[var(--hard-puzzle)]/10";
  }
  return "bg-primary/5";
};

export const getDifficultyHoverColor = (difficulty: string | null) => {
  const normalizedDifficulty = (difficulty || "easy").toLowerCase();
  if (normalizedDifficulty === "easy") {
    return "hover:bg-[var(--easy-puzzle)]/15";
  } else if (normalizedDifficulty === "medium") {
    return "hover:bg-[var(--medium-puzzle)]/15";
  } else if (normalizedDifficulty === "hard") {
    return "hover:bg-[var(--hard-puzzle)]/15";
  }
  return "hover:bg-primary/10";
};
