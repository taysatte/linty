import { LanguageSelector } from "@/components/editor/LanguageSelector";
import { RunButton } from "@/components/editor/RunButton";
import { SubmitButton } from "@/components/editor/SubmitButton";
import { ResetButton } from "@/components/editor/ResetButton";
import { ButtonGroup } from "@/components/ui/button-group";
import { type Language } from "@/lib/languageVersions";
import { Separator } from "@/components/ui/separator";

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
    <div className="px-2 pb-4 lg:px-4 md:px-4 sm:px-2 sm:pb-4 flex sm:flex-row justify-between items-center sm:items-center gap-2 border-b border-border">
      <div className="flex flex-row items-center gap-4">
        <ButtonGroup
          orientation="horizontal"
          className="gap-0 border border-border rounded-lg"
        >
          <RunButton onRun={onRun} isLoading={isLoading} />
          <ResetButton onReset={onReset} disabled={isLoading} />
        </ButtonGroup>
        <div className="h-6 hidden sm:block">
          <Separator
            className="hidden sm:hidden md:block"
            orientation="vertical"
            decorative
          />
        </div>
        <ButtonGroup orientation="horizontal" className="gap-0">
          <SubmitButton
            onSubmit={onSubmit}
            isLoading={isLoading}
            attemptsLeft={attemptsLeft}
            maxAttempts={maxAttempts}
          />
        </ButtonGroup>
      </div>
      <div className="flex flex-row items-center gap-2">
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
    </div>
  );
};
