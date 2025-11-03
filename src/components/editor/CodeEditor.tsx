"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import RosePine from "@/themes/rose-pine.json";
import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { puzzle } from "@/components/editor/puzzle";
import { options } from "@/components/editor/options";
import { EditorControls } from "@/components/editor/EditorControls";
import { useIsMobile } from "@/lib/useMediaQuery";
import { CodeEditorProps } from "@/components/editor/types";
import { type Language, isSupportedLanguage } from "@/lib/languageVersions";
import { Card } from "../ui/card";

const CodeEditor = ({ onRunCode, isLoading, initialCode }: CodeEditorProps) => {
  const [value, setValue] = useState<string>(initialCode || puzzle);

  // Update editor content when initialCode prop changes (e.g., new puzzle)
  useEffect(() => {
    if (initialCode) {
      setValue(initialCode);
    }
  }, [initialCode]);
  const [language, setLanguage] = useState<Language>("javascript");
  const [version, setVersion] = useState<string>("18.15.0");
  const [theme, setTheme] = useState<string>("RosePine");
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isMobile = useIsMobile();

  const editorOptions = useMemo(() => {
    return {
      ...options,
      fontSize: isMobile ? 15 : 16,
      wordWrap: isMobile ? "on" : "off",
      lineNumbers: isMobile ? "off" : "on",
      folding: !isMobile,
      glyphMargin: !isMobile,
    } as editor.IStandaloneEditorConstructionOptions;
  }, [isMobile]);

  const handleBeforeMount = (monaco: Monaco) => {
    const { rules, colors } = RosePine;
    monaco.editor.defineTheme(theme, {
      base: "vs-dark",
      inherit: true,
      rules: rules,
      colors: colors,
    });
  };

  const handleOnMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleEditorValueChange = (value: string | undefined) => {
    setValue(value ?? "");
  };

  const handleRun = () => {
    onRunCode({ code: value, language });
  };

  const handleSubmit = () => {
    // TODO: Implement submit logic
  };

  return (
    <Card className="shadow-lg h-full w-full pt-4 pb-4">
      <div className="flex flex-col h-full">
        <EditorControls
          language={language}
          setLanguage={setLanguage}
          isLoading={isLoading}
          onRun={handleRun}
          onSubmit={handleSubmit}
        />
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            theme={theme}
            language={language}
            value={value}
            options={editorOptions}
            beforeMount={handleBeforeMount}
            onChange={handleEditorValueChange}
            onMount={handleOnMount}
          />
        </div>
      </div>
    </Card>
  );
};

export default CodeEditor;
