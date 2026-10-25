export function NightPicture({ alt, inline = false }: { alt: string; inline?: boolean }) {
  return (
    <span className={inline ? "night-window" : "night-panorama"} data-shutter>
      <img src="/open/night-earth.jpg" width="1920" height="1280" alt={alt} fetchPriority="high" />
    </span>
  );
}
