import { RotateCcwIcon } from "lucide-react";
import { EditorButton } from "@/components/editor/EditorButton";

export interface ResetButtonProps {
  onReset: () => void;
  disabled?: boolean;
}

export const ResetButton = ({
  onReset,
  disabled = false,
}: ResetButtonProps) => {
  return (
    <EditorButton
      onClick={onReset}
      icon={RotateCcwIcon}
      label=""
      variant="ghost"
      disabled={disabled}
    />
  );
};
