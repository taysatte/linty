import { Item, ItemContent } from "@/components/ui/item";
import {
  getDifficultyColor,
  getDifficultyBgColor,
  getDifficultyHoverColor,
} from "@/lib/puzzleDesc";

interface PuzzleMetadataProps {
  difficulty: string | null;
  tags: string[];
  variant?: "desktop" | "mobile";
}

export function PuzzleMetadata({
  difficulty,
  tags,
  variant = "desktop",
}: PuzzleMetadataProps) {
  const difficultyValue = difficulty ?? "easy";
  const difficultyColor = getDifficultyColor(difficulty);

  const isMobile = variant === "mobile";

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 mb-2">
      <Item
        variant="default"
        className={`py-1 px-3 ${
          isMobile ? "" : "cursor-default"
        } transition-colors duration-100 rounded-full ${getDifficultyBgColor(
          difficultyValue
        )} ${getDifficultyHoverColor(difficultyValue)}`}
      >
        <ItemContent
          className={`text-md ${
            isMobile ? "font-semibold" : "font-mono font-semibold"
          } ${difficultyColor}`}
        >
          {difficultyValue}
        </ItemContent>
      </Item>
      {tags.map((tag) => (
        <Item
          key={tag}
          variant="default"
          className={`${
            isMobile
              ? "bg-muted/50 hover:bg-muted/60"
              : "bg-muted/50 hover:bg-muted/60"
          } transition-all duration-100 cursor-default py-1 px-3 rounded-full`}
        >
          <ItemContent
            className={`${
              isMobile
                ? "text-accent/80 text-md font-semibold"
                : "text-muted-foreground font-mono text-md font-semibold"
            }`}
          >
            {tag}
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
