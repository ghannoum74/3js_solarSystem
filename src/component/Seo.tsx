import { useEffect } from "react";
import bodyInfo from "../utilities/Body_info.js";

const defaultTitle = "Interactive 3D Solar System Explorer";
const defaultDescription =
  "Explore the Sun, planets, Moon, and Pluto in an interactive 3D solar system. Discover each world's size, gravity, temperature, orbit, and distance.";

const setMetaContent = (selector: string, content: string) => {
  document
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", content);
};

interface SeoProps {
  selectedBody: string | null;
}

const Seo = ({ selectedBody }: SeoProps) => {
  useEffect(() => {
    const info = selectedBody ? bodyInfo[selectedBody] : undefined;
    const title = info
      ? `${info.name} Facts | Interactive 3D Solar System`
      : defaultTitle;
    const description = info
      ? `${info.description} Explore ${info.name} in an interactive 3D solar system and learn its essential facts.`
      : defaultDescription;
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const previewUrl = `${window.location.origin}/solar-system-preview.svg`;

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[property="og:image"]', previewUrl);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', previewUrl);

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }, [selectedBody]);

  return null;
};

export default Seo;
