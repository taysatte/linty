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
  size = "icon",
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
      className={cn("cursor-pointer", className)}
    >
      <Icon className="size-4 stroke-2 text-muted-foreground" />
      {label && <span className="hidden sm:hidden md:inline">{label}</span>}
    </Button>
  );
};
