import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EditorButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const EditorButton = ({
  onClick,
  icon: Icon,
  label,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  isLoading = false,
}: EditorButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "cursor-pointer font-semibold bg-accent/5 hover:bg-accent/10 text-foreground/90 shadow-md rounded-lg",
        className
      )}
    >
      <Icon className="size-4 stroke-3 text-primary/90" />
      {label}
    </Button>
  );
};
