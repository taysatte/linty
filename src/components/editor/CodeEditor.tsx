"use client";

import React, { useRef, useMemo, useCallback, useEffect } from "react";
import RosePine from "@/themes/rose-pine.json";
import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { options } from "@/components/editor/options";
import { EditorControls } from "@/components/editor/EditorControls";
import { useIsMobile } from "@/lib/useMediaQuery";
import { CodeEditorProps } from "@/components/editor/types";
import { Card } from "../ui/card";

const CodeEditor = ({
  value,
  onChange,
  language,
  onLanguageChange,
  onRunCode,
  onReset,
  isLoading,
}: CodeEditorProps) => {
  const [theme] = React.useState<string>("RosePine");
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

  const handleBeforeMount = useCallback(
    (monaco: Monaco) => {
      const { rules, colors } = RosePine;
      monaco.editor.defineTheme(theme, {
        base: "vs-dark",
        inherit: true,
        rules: rules,
        colors: colors,
      });
    },
    [theme]
  );

  const handleOnMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorRef.current = editorInstance;
    },
    []
  );

  const handleEditorValueChange = useCallback(
    (newValue: string | undefined) => {
      onChange(newValue ?? "");
    },
    [onChange]
  );

  const handleRun = useCallback(() => {
    onRunCode({ code: value, language });
  }, [onRunCode, value, language]);

  const handleFormat = useCallback(() => {
    const editorInstance = editorRef.current;
    const formatAction = editorInstance?.getAction?.(
      "editor.action.formatDocument"
    );
    if (formatAction) {
      formatAction.run().catch(() => {
        // Silently handle cancellation errors from Monaco Editor
      });
    }
  }, []);

  // Suppress Monaco Editor cancellation errors
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress cancellation errors from Monaco Editor
      if (
        event.reason &&
        (event.reason?.message === "Canceled" ||
          event.reason?.name === "Canceled" ||
          (typeof event.reason === "string" && event.reason === "Canceled"))
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        try {
          editorRef.current.dispose();
        } catch (error) {
          // Silently handle disposal errors
        }
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="h-full w-full gap-2 pt-2">
      <div className="flex flex-col h-full">
        <EditorControls
          language={language}
          setLanguage={onLanguageChange}
          isLoading={isLoading}
          onRun={handleRun}
          onReset={onReset}
          onFormat={handleFormat}
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
