import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { Play, RotateCcw } from 'lucide-react';

const APP_FILE = '/App.js';

const compatibilityImports = `import React from "react";
import {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
  createContext,
  useReducer,
  Fragment,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import * as ReactRouterDOM from "react-router-dom";

`;

const renderAppPattern =
  /(?:ReactDOM\.)?createRoot\s*\(\s*(?:document\.getElementById\(['"]root['"]\)|root)\s*\)\s*\.render\s*\(\s*<App\s*\/>\s*\)\s*;?/g;

function prepareSandboxCode(code) {
  const withoutLegacyRender = code.replace(renderAppPattern, '').trim();
  const hasImports = /^\s*import\s/m.test(withoutLegacyRender);
  const hasDefaultExport = /^\s*export\s+default\s/m.test(withoutLegacyRender);
  const definesApp = /(?:function|const|let|var)\s+App\b/.test(withoutLegacyRender);
  const exportApp = !hasDefaultExport && definesApp ? '\n\nexport default App;' : '';

  if (hasImports) {
    return `${withoutLegacyRender}${exportApp}\n`;
  }

  return `${compatibilityImports}${withoutLegacyRender}${exportApp}\n`;
}

function SandboxControls() {
  const { sandpack } = useSandpack();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => sandpack.runSandpack()}
        className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Play className="w-3 h-3" /> Run
      </button>
      <button
        onClick={() => sandpack.resetAllFiles()}
        className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-secondary/40 text-muted-foreground hover:bg-secondary/70 transition-colors"
      >
        <RotateCcw className="w-3 h-3" /> Reset
      </button>
    </div>
  );
}

export default function CodeSandbox({ starterCode }) {
  const files = {
    [APP_FILE]: {
      code: prepareSandboxCode(starterCode),
      active: true,
    },
  };

  return (
    <SandpackProvider
      key={starterCode}
      template="react"
      files={files}
      customSetup={{
        dependencies: {
          'react-router-dom': '^6.26.0',
        },
      }}
      options={{
        activeFile: APP_FILE,
        visibleFiles: [APP_FILE],
        autorun: true,
        autoReload: true,
        recompileMode: 'delayed',
        recompileDelay: 800,
      }}
      theme="dark"
    >
      <div className="rounded-xl border border-border overflow-hidden bg-[#0d0d12]">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/20">
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
            <span className="ml-2">sandbox.jsx</span>
          </span>
          <SandboxControls />
        </div>
        <SandpackLayout className="!m-0 !rounded-none !border-0 !bg-transparent">
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            wrapContent
            showTabs={false}
            style={{ minHeight: 400, height: 400 }}
          />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            showSandpackErrorOverlay
            style={{ minHeight: 400, height: 400 }}
          />
        </SandpackLayout>
      </div>
    </SandpackProvider>
  );
}
