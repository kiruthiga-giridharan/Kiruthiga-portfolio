import type { Block, BookPage } from "../data/types";

/**
 * Pagination for the book reader. Instead of scrolling inside a page, each
 * authored page is broken into small pieces ("units"), the pieces are measured
 * at the reader's real page size, and they are packed into as many physical
 * pages as needed. Long lists continue on the next page under the same title.
 */

/** One measurable piece of a page. `parent` is the block it came from. */
export type Unit = { parent: number; block: Block };

/** One physical page in the reader. */
export type PhysicalPage = { title: string; continued: boolean; source: number; units: Unit[] };

/** Splits a block into the smallest pieces that still read well on their own. */
function split(block: Block, narrow: boolean): Block[] {
  switch (block.type) {
    case "list":
      return block.items.map((item) => ({ ...block, items: [item] }));
    case "metrics":
      return block.items.map((item) => ({ ...block, items: [item] }));
    case "routine":
      // Each recurring activity is its own piece; its group heading repeats if the group continues.
      return block.groups.flatMap((group) => group.items.map((item) => ({ ...block, groups: [{ when: group.when, items: [item] }] })));
    case "timeline":
      return block.items.map((item) => ({ ...block, items: [item] }));
    case "flow":
      return block.steps.map((step, index) => ({
        ...block,
        steps: [step],
        start: index,
        caption: index === block.steps.length - 1 ? block.caption : undefined,
      }));
    case "lanes":
      return block.lanes.map((lane, index) => ({
        ...block,
        lanes: [lane],
        caption: index === block.lanes.length - 1 ? block.caption : undefined,
      }));
    case "toolsSkills":
      // Side by side on wide pages; on narrow pages each column flows on its own.
      if (!narrow) return [block];
      return [
        ...block.tools.map((tool) => ({ ...block, tools: [tool], skills: [], part: "tools" as const })),
        ...block.skills.map((skill) => ({ ...block, tools: [], skills: [skill], part: "skills" as const })),
      ];
    case "tools":
      return block.items.map((item) => ({ ...block, items: [item] }));
    case "mockup":
      if (block.kind !== "gmail-chat") return [block];
      return Array.from({ length: GMAIL_MESSAGES }, (_, index) => ({ ...block, from: index, to: index + 1 }));
    default:
      return [block];
  }
}

/** Number of messages in the Gmail conversation mockup (see PageContent). */
export const GMAIL_MESSAGES = 4;

export function toUnits(page: BookPage, narrow: boolean): Unit[] {
  return page.blocks.flatMap((block, parent) => split(block, narrow).map((piece) => ({ parent, block: piece })));
}

/** Joins neighbouring pieces of the same block back into one block for display. */
export function mergeUnits(units: Unit[]): Block[] {
  const merged: { parent: number; block: Block }[] = [];
  for (const unit of units) {
    const last = merged[merged.length - 1];
    const a = last?.block;
    const b = unit.block;
    if (last && last.parent === unit.parent && a.type === b.type) {
      if (a.type === "list" && b.type === "list") { a.items = [...a.items, ...b.items]; continue; }
      if (a.type === "metrics" && b.type === "metrics") { a.items = [...a.items, ...b.items]; continue; }
      if (a.type === "routine" && b.type === "routine") {
        const lastGroup = a.groups[a.groups.length - 1];
        if (lastGroup.when === b.groups[0].when) lastGroup.items = [...lastGroup.items, ...b.groups[0].items];
        else a.groups = [...a.groups, ...b.groups];
        continue;
      }
      if (a.type === "mockup" && b.type === "mockup") { a.to = b.to; continue; }
      if (a.type === "cards" && b.type === "cards") { a.items = [...a.items, ...b.items]; continue; }
      if (a.type === "tools" && b.type === "tools") { a.items = [...a.items, ...b.items]; continue; }
      if (a.type === "timeline" && b.type === "timeline") { a.items = [...a.items, ...b.items]; continue; }
      if (a.type === "flow" && b.type === "flow") {
        a.steps = [...a.steps, ...b.steps];
        a.caption = b.caption;
        continue;
      }
      if (a.type === "lanes" && b.type === "lanes") {
        a.lanes = [...a.lanes, ...b.lanes];
        a.caption = b.caption;
        continue;
      }
      if (a.type === "toolsSkills" && b.type === "toolsSkills" && a.part === b.part) {
        a.tools = [...a.tools, ...b.tools];
        a.skills = [...a.skills, ...b.skills];
        continue;
      }
    }
    merged.push({ parent: unit.parent, block: structuredClone(b) });
  }
  return merged.map((entry) => entry.block);
}

/**
 * Packs measured units into physical pages. Every authored page starts a new
 * physical page; pieces that do not fit continue on the next one.
 */
export function packPages(
  pages: BookPage[],
  units: Unit[][],
  sizes: { title: number[]; units: number[][]; available: number; gap: number; innerGap: number; continued: number },
): PhysicalPage[] {
  const result: PhysicalPage[] = [];
  pages.forEach((page, source) => {
    let current: PhysicalPage = { title: page.title, continued: false, source, units: [] };
    let used = sizes.title[source];
    units[source].forEach((unit, index) => {
      const previous = current.units[current.units.length - 1];
      const gap = previous ? (previous.parent === unit.parent ? sizes.innerGap : sizes.gap) : 0;
      const height = sizes.units[source][index] + gap;
      if (current.units.length && used + height > sizes.available) {
        result.push(current);
        current = { title: page.title, continued: true, source, units: [] };
        used = sizes.title[source] + sizes.continued;
      }
      current.units.push(unit);
      used += current.units.length === 1 ? sizes.units[source][index] : height;
    });
    result.push(current);
  });
  return result;
}
