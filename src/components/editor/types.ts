/**
 * CodeEditor component props
 */

import { RunCodeProps } from "@/components/puzzle/types";
import { type Language } from "@/lib/languageVersions";

export interface CodeEditorProps {
  value: string; // Controlled value for the editor
  onChange: (value: string) => void; // Callback when code changes
  language: Language; // Current language
  onLanguageChange: (language: Language) => void; // Callback when language changes
  onRunCode: ({ code, language }: RunCodeProps) => void;
  onRunTests?: ({ code, language }: RunCodeProps) => void; // Optional callback to run tests
  onReset: () => void; // Callback to reset code to initial value
  isLoading: boolean;
}
