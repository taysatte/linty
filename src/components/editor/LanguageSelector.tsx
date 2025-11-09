import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  languageVersions,
  languageDisplayNames,
  type Language,
} from "@/lib/languageVersions";

export interface LanguageSelectorProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageSelector = ({
  language,
  setLanguage,
}: LanguageSelectorProps) => {
  const handleLanguageChange = (value: string) => {
    // Explicit type guard: only setLanguage if value is a supported Language
    if (Object.keys(languageVersions).includes(value)) {
      setLanguage(value as Language);
      localStorage.setItem("linty-selected-language", value);
    }
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="cursor-pointer rounded-lg px-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {Object.entries(languageVersions).map(([lang, version]) => {
            const languageName = languageDisplayNames[lang as Language];
            if (!languageName) {
              return null;
            }
            return (
              <SelectItem
                className="cursor-pointer flex items-center justify-between gap-2"
                key={lang}
                value={lang}
              >
                <span className="text-muted text-sm font-semibold font-mono">
                  {languageName}
                </span>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
