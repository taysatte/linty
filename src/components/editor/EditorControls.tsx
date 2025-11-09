import { LanguageSelector } from "@/components/editor/LanguageSelector";
import { RunButton } from "@/components/editor/RunButton";
import { ResetButton } from "@/components/editor/ResetButton";
import { FormatButton } from "@/components/editor/FormatButton";
import { ButtonGroup } from "@/components/ui/button-group";
import { type Language } from "@/lib/languageVersions";

export interface EditorControlsProps {
  language: Language;
  setLanguage: (language: Language) => void;
  onRun: () => void;
  onReset: () => void;
  onFormat: () => void;
  isLoading?: boolean;
}

export const EditorControls = ({
  language,
  setLanguage,
  onRun,
  onReset,
  onFormat,
  isLoading,
}: EditorControlsProps) => {
  return (
    <div className="px-3 pb-2 flex sm:flex-row justify-between items-center sm:items-center gap-2 border-b border-border">
      <div className="flex items-center gap-0">
        <RunButton onRun={onRun} isLoading={isLoading} />
        <ResetButton onReset={onReset} disabled={isLoading} />
        <FormatButton onFormat={onFormat} disabled={isLoading} />
      </div>
      <LanguageSelector language={language} setLanguage={setLanguage} />
    </div>
  );
};
