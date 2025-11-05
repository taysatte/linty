import { LanguageSelector } from "@/components/editor/LanguageSelector";
import { RunButton } from "@/components/editor/RunButton";
import { SubmitButton } from "@/components/editor/SubmitButton";
import { ResetButton } from "@/components/editor/ResetButton";
import { ButtonGroup } from "@/components/ui/button-group";
import { type Language } from "@/lib/languageVersions";

export interface EditorControlsProps {
  language: Language;
  setLanguage: (language: Language) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading?: boolean;
  attemptsLeft?: number | null;
  maxAttempts?: number;
}

export const EditorControls = ({
  language,
  setLanguage,
  onRun,
  onSubmit,
  onReset,
  isLoading,
  attemptsLeft,
  maxAttempts,
}: EditorControlsProps) => {
  return (
    <div className="px-2 pb-2 flex sm:flex-row justify-between items-center sm:items-center gap-2 border-b border-border">
      <ButtonGroup
        orientation="horizontal"
        className="gap-0 border border-border rounded-lg shadow-sm"
      >
        <RunButton onRun={onRun} isLoading={isLoading} />
        <ResetButton onReset={onReset} disabled={isLoading} />
        <SubmitButton
          onSubmit={onSubmit}
          isLoading={isLoading}
          attemptsLeft={attemptsLeft}
          maxAttempts={maxAttempts}
        />
      </ButtonGroup>
      <LanguageSelector language={language} setLanguage={setLanguage} />
    </div>
  );
};
