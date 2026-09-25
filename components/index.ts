// Unified barrel re-exports for components
export { default as Shell } from "./layout/Shell";
export { default as Sidebar } from "./layout/Sidebar";
export { default as Header } from "./layout/Header";
export { default as Footer } from "./layout/Footer";
export { default as TocDesktop, TocMobile } from "./layout/Toc";
export { default as DocBreadcrumbs } from "./layout/DocBreadcrumbs";
export { default as DocPaginator } from "./layout/DocPaginator";
export { Shoutout } from "./layout/DocContentHeader";

export { default as Article } from "./content/Article";
export { default as GuidePage } from "./content/GuidePage";
export { default as CopyButton } from "./content/CopyButton";

export { default as BlogHome } from "./home/BlogHome";

export { LocaleProvider, useLocale } from "./providers/LocaleProvider";
export { default as LanguageToggle } from "./providers/LanguageToggle";
export { default as LastPathTracker } from "./providers/LastPathTracker";
