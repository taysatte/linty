import { PlayIcon } from "lucide-react";
import { EditorButton } from "@/components/editor/EditorButton";

export interface RunButtonProps {
  onRun: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const RunButton = ({
  onRun,
  disabled = false,
  isLoading = false,
}: RunButtonProps) => {
  return (
    <EditorButton
      size="default"
      onClick={onRun}
      icon={PlayIcon}
      label="Run"
      disabled={disabled}
      isLoading={isLoading}
    />
  );
};
