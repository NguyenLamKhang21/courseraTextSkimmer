import { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [cleanedText, setCleandedText] = useState("");
  const [showToast, setShowToast] = useState(false);

  const cleanText = (text) => {
    const pattern =
      /You are a helpful AI assistant.[\s\S]*?Do you understand\?\.?/gi;

    //replace the matched pattern with an empty string
    const cleaned = text.replace(pattern, "").trim();

    return cleaned;
  };

  //get input from user
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    const cleaned = cleanText(value);
    setCleandedText(cleaned);
  };

  //copoing to clipboard
  const handleCopy = () => {
    if (!cleanedText) return;
    navigator.clipboard
      .writeText(cleanedText)
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      {/* 1. Top Navigation Bar */}
      <nav className="bg-surface border-b border-outline-variant py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold text-primary tracking-tight font-display">
            Text Skimmer
          </span>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <button
              aria-label="Settings"
              className="p-2 rounded hover:bg-surface-container transition-colors flex items-center justify-center group cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
                settings
              </span>
            </button>
            <button
              aria-label="Help"
              className="p-2 rounded hover:bg-surface-container transition-colors flex items-center justify-center group cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
                help
              </span>
            </button>
          </div>
        </div>
      </nav>
      {/* 2. Main Workspace */}
      <main className="flex-grow flex flex-col p-6 max-w-7xl mx-auto w-full gap-6 relative">
        <header className="mb-2">
          <h1 className="font-display text-3xl font-bold mb-1 text-on-surface">
            Skimmer Workspace
          </h1>
          <p className="text-sm text-on-surface-variant">
            Paste your text below... let me get rid of the annoying prompt stuff
            for you.
          </p>
        </header>
        {/* Split View Cards */}
        <div className="flex-grow flex flex-col lg:flex-row gap-6 h-full pb-6">
          {/* Input Box Card */}
          <div className="flex-1 flex flex-col bg-surface-container-low rounded border border-outline-variant focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 group h-[400px] lg:h-auto">
            <div className="flex justify-between items-center px-4 py-2 border-b border-outline-variant bg-surface-container/50">
              <span className="font-code text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Input
              </span>
              <div className="flex items-center gap-2">
                <span className="font-code text-[10px] text-on-surface bg-surface-container-highest px-2 py-1 rounded">
                  {inputText.length} CHARS
                </span>
              </div>
            </div>
            <textarea
              className="flex-grow bg-transparent font-code text-sm text-on-surface p-4 resize-none focus:outline-none border-none placeholder:text-outline-variant w-full h-full"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste your text here..."
            />
          </div>
          {/* Cleaned Output Box Card */}
          <div className="flex-1 flex flex-col bg-surface-container rounded border border-outline-variant focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 group h-[400px] lg:h-auto">
            <div className="flex justify-between items-center px-4 py-2 border-b border-outline-variant bg-surface-container-highest/30">
              <span className="font-code text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  auto_fix_high
                </span>
                Cleaned Output
              </span>
              <div className="flex items-center gap-2">
                <span className="font-code text-[10px] text-on-surface bg-surface-container-highest px-2 py-1 rounded">
                  {cleanedText.length} CHARS
                </span>
                <button
                  aria-label="Copy Output"
                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 p-1.5 rounded transition-colors flex items-center justify-center cursor-pointer"
                  onClick={handleCopy}
                  disabled={!cleanedText}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    content_copy
                  </span>
                </button>
              </div>
            </div>
            <textarea
              className="flex-grow bg-transparent font-code text-sm text-on-surface p-4 resize-none focus:outline-none border-none placeholder:text-outline-variant/50 w-full h-full cursor-text"
              value={cleanedText}
              readOnly
              placeholder="Cleaned text will appear here..."
            />
          </div>
        </div>
      </main>
      {/* 3. Footer */}
      <footer className="border-t border-outline-variant w-full py-4 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 w-full max-w-7xl mx-auto gap-2">
          <span className="font-code text-[10px] text-primary opacity-80">
            © 2026 Text Skimmer Utility
          </span>
          <div className="flex gap-4">
            <a
              className="text-xs text-on-surface-variant hover:text-primary transition-colors opacity-80"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-xs text-on-surface-variant hover:text-primary transition-colors opacity-80"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-xs text-on-surface-variant hover:text-primary transition-colors opacity-80"
              href="#"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
      {/* 4. Toast Notification */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-highest border-t-2 border-primary text-on-surface px-4 py-2 rounded shadow-lg flex items-center gap-2 z-50 transition-all duration-300 ${
          showToast
            ? "opacity-100 translate-y-0 toast-show"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-primary text-[18px]">
          check_circle
        </span>
        <span className="font-code text-xs font-semibold uppercase tracking-wider">
          Copied to clipboard
        </span>
      </div>
    </>
  );
}

export default App;
