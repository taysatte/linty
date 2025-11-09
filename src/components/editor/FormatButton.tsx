import { EditorButton } from "@/components/editor/EditorButton";
import { BracesIcon } from "lucide-react";

export interface FormatButtonProps {
  onFormat: () => void;
  disabled?: boolean;
}

export const FormatButton = ({
  onFormat,
  disabled = false,
}: FormatButtonProps) => {
  return (
    <EditorButton
      onClick={onFormat}
      icon={BracesIcon}
      label=""
      variant="ghost"
      disabled={disabled}
    />
  );
};
