"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type ViewMode = "gui" | "terminal";

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined
);

const STORAGE_KEY = "rejaka-view-mode";
const TAB_STORAGE_KEY = "rejaka-active-tab";

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>("gui");
  const [activeTab, setActiveTabState] = useState<string>("about");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem(STORAGE_KEY);
    if (storedMode === "terminal" || storedMode === "gui") {
      setViewModeState(storedMode);
    }
    const storedTab = localStorage.getItem(TAB_STORAGE_KEY);
    if (storedTab) {
      setActiveTabState(storedTab);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, viewMode);
    }
  }, [viewMode, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(TAB_STORAGE_KEY, activeTab);
    }
  }, [activeTab, isHydrated]);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
  };

  const toggleViewMode = () => {
    setViewModeState((prev) => (prev === "gui" ? "terminal" : "gui"));
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
  };

  return (
    <ViewModeContext.Provider
      value={{ viewMode, setViewMode, toggleViewMode, activeTab, setActiveTab }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
}
