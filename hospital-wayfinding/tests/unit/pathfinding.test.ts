import { describe, expect, it } from "vitest";

import { findPath } from "@/lib/pathfinding";
import type { Node, Route } from "@/types/wayfinding";

const nodes: Node[] = [
  {
    id: "n-entry",
    name: "Main Entry",
    type: "entrance",
    building_id: "b-main",
    floor: "1",
    map_x: 20,
    map_y: 100,
    is_accessible: true,
  },
  {
    id: "n-elevator",
    name: "Elevator",
    type: "elevator",
    building_id: "b-main",
    floor: "1",
    map_x: 140,
    map_y: 100,
    is_accessible: true,
  },
  {
    id: "n-stairs",
    name: "Stairs",
    type: "stairs",
    building_id: "b-main",
    floor: "1",
    map_x: 140,
    map_y: 40,
    is_accessible: false,
  },
  {
    id: "n-opd",
    name: "OPD",
    type: "place",
    building_id: "b-main",
    floor: "1",
    map_x: 260,
    map_y: 100,
    is_accessible: true,
  },
];

const routes: Route[] = [
  {
    id: "r1",
    from_node_id: "n-entry",
    to_node_id: "n-stairs",
    distance_meter: 20,
    estimated_seconds: 30,
    instruction_th: "เดินตรงไปยังบันได",
    instruction_en: "Walk to stairs",
    direction: "straight",
    is_accessible: false,
    bidirectional: true,
  },
  {
    id: "r2",
    from_node_id: "n-stairs",
    to_node_id: "n-opd",
    distance_meter: 20,
    estimated_seconds: 30,
    instruction_th: "เดินไปที่ OPD",
    instruction_en: "Walk to OPD",
    direction: "right",
    is_accessible: false,
    bidirectional: true,
  },
  {
    id: "r3",
    from_node_id: "n-entry",
    to_node_id: "n-elevator",
    distance_meter: 40,
    estimated_seconds: 45,
    instruction_th: "เดินไปที่ลิฟต์",
    instruction_en: "Walk to elevator",
    direction: "straight",
    is_accessible: true,
    bidirectional: true,
  },
  {
    id: "r4",
    from_node_id: "n-elevator",
    to_node_id: "n-opd",
    distance_meter: 40,
    estimated_seconds: 45,
    instruction_th: "เดินตรงไปที่ OPD",
    instruction_en: "Walk to OPD",
    direction: "straight",
    is_accessible: true,
    bidirectional: true,
  },
];

describe("findPath", () => {
  it("returns shortest path when accessibility filter is off", () => {
    const path = findPath(nodes, routes, "n-entry", "n-opd", false);
    expect(path.totalDistance).toBe(40);
    expect(path.steps.map((step) => step.id)).toEqual(["r1", "r2"]);
  });

  it("returns accessible-only path when requested", () => {
    const path = findPath(nodes, routes, "n-entry", "n-opd", true);
    expect(path.totalDistance).toBe(80);
    expect(path.steps.map((step) => step.id)).toEqual(["r3", "r4"]);
  });

  it("throws on unreachable route", () => {
    expect(() => findPath(nodes, routes, "n-opd", "n-entry", true)).not.toThrow();
  });
});
