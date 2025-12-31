import { TestTubeDiagonalIcon } from "lucide-react";
import { EditorButton } from "@/components/editor/EditorButton";

export interface TestButtonProps {
  onRunTests: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const TestButton = ({
  onRunTests,
  disabled = false,
  isLoading = false,
}: TestButtonProps) => {
  return (
    <EditorButton
      onClick={onRunTests}
      icon={TestTubeDiagonalIcon}
      label=""
      variant="ghost"
      disabled={disabled}
      isLoading={isLoading}
    />
  );
};
