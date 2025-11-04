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
      size="default"
      onClick={onReset}
      icon={RotateCcwIcon}
      label="Reset"
      disabled={disabled}
    />
  );
};
