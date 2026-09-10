/** Public, stable image URL: never includes a visitor's calculation or settings. */
export function socialImagePath(path: string): string {
  return `/social/${path === "/" ? "sleep-calculator" : path.slice(1)}.png`;
}
