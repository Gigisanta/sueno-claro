import { expect, it } from 'vitest';
import { getGuideExamples } from './examples';
import { getPage, pages } from './pages';
import { readSharedSettings } from '../privacy';
import { calculate, nextLocalTime, safeSettings } from '../sleep/calculate';

it('worked examples lead to the localized calculator and reproduce their displayed times through its real engine', () => {
  const now = new Date(2026, 5, 30, 12, 0);
  let checked = 0;
  for (const page of pages) {
    const examples = getGuideExamples(page.path);
    if (page.kind !== 'guide') {
      expect(examples, page.path).toBeUndefined();
      continue;
    }
    expect(examples, page.path).toBeDefined();
    expect(page.sections.some(section => section.id === examples!.afterSectionId), page.path).toBe(true);
    for (const card of examples!.cards) {
      const url = new URL(card.href, 'https://sleeplike.maat.work');
      const tool = getPage(url.pathname);
      expect(tool?.kind, card.title).toBe('tool');
      expect(tool?.locale, card.title).toBe(page.locale);
      expect(url.origin).toBe('https://sleeplike.maat.work');
      expect(url.search).toBe('');
      const params = readSharedSettings(url.href);
      expect(params.get('mode')).toBe('wake');
      const settings = safeSettings({
        sleepLatencyMinutes: Number(params.get('latency')),
        cycleLengthMinutes: Number(params.get('cycle')),
        timeFormat: '24h',
      });
      const wakeAt = nextLocalTime(params.get('wake')!, now);
      expect(wakeAt, card.title).toBeDefined();
      const outcome = calculate({ mode: 'wake', now, settings, wakeAt });
      expect(outcome.issues, card.title).toEqual([]);
      const option = outcome.results.find(row => row.cycles === 5)!;
      const bedtime = new Date(option.bedtime);
      const clock = `${String(bedtime.getHours()).padStart(2, '0')}:${String(bedtime.getMinutes()).padStart(2, '0')}`;
      expect(params.get('wake'), card.title).toBe(card.facts[0].value);
      expect(clock, card.title).toBe(card.facts[1].value);
      expect(option.sleepMinutes, card.title).toBe(450);
      expect(option.inBedMinutes - option.sleepMinutes, card.title).toBe(Number.parseInt(card.facts[3].value, 10));
      checked += 1;
    }
  }
  expect(checked).toBe(12);
});
