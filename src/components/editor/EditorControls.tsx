import { LanguageSelector } from "@/components/editor/LanguageSelector";
import { RunButton } from "@/components/editor/RunButton";
import { SubmitButton } from "@/components/editor/SubmitButton";
import { type Language } from "@/lib/languageVersions";

export interface EditorControlsProps {
  language: Language;
  setLanguage: (language: Language) => void;
  onRun: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const EditorControls = ({
  language,
  setLanguage,
  onRun,
  onSubmit,
  isLoading,
}: EditorControlsProps) => {
  return (
    <div className="px-2 pb-4 lg:px-4 md:px-4 sm:px-2 sm:pb-4 flex sm:flex-row justify-between items-center sm:items-center gap-2 border-b border-border">
      <div className="flex flex-row items-center gap-2">
        <RunButton onRun={onRun} isLoading={isLoading} />
        <SubmitButton onSubmit={onSubmit} isLoading={isLoading} />
      </div>
      <LanguageSelector language={language} setLanguage={setLanguage} />
    </div>
  );
};
