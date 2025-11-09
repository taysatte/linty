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
      size="icon"
      onClick={onRun}
      icon={PlayIcon}
      label=""
      variant="ghost"
      disabled={disabled}
      isLoading={isLoading}
    />
  );
};
