import type { Node, Route, RouteResult } from "@/types/wayfinding";

type QueueItem = { nodeId: string; distance: number };

function routeWeight(route: Route): number {
  return route.distance_meter;
}

function buildAdjacency(routes: Route[], wheelchairOnly: boolean) {
  const adjacency = new Map<string, Route[]>();
  for (const route of routes) {
    if (wheelchairOnly && !route.is_accessible) {
      continue;
    }
    const fromEdges = adjacency.get(route.from_node_id) ?? [];
    fromEdges.push(route);
    adjacency.set(route.from_node_id, fromEdges);

    if (route.bidirectional) {
      const reverse: Route = {
        ...route,
        id: `${route.id}-reverse`,
        from_node_id: route.to_node_id,
        to_node_id: route.from_node_id,
      };
      const reverseEdges = adjacency.get(reverse.from_node_id) ?? [];
      reverseEdges.push(reverse);
      adjacency.set(reverse.from_node_id, reverseEdges);
    }
  }
  return adjacency;
}

export function findPath(
  nodes: Node[],
  routes: Route[],
  fromNodeId: string,
  toNodeId: string,
  wheelchairOnly = false,
): RouteResult {
  const nodeSet = new Set(nodes.map((node) => node.id));
  if (!nodeSet.has(fromNodeId) || !nodeSet.has(toNodeId)) {
    throw new Error("Invalid node id");
  }

  const adjacency = buildAdjacency(routes, wheelchairOnly);
  const distances = new Map<string, number>();
  const previousRoute = new Map<string, Route>();
  const visited = new Set<string>();
  const queue: QueueItem[] = [{ nodeId: fromNodeId, distance: 0 }];
  distances.set(fromNodeId, 0);

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift()!;
    if (visited.has(current.nodeId)) {
      continue;
    }
    visited.add(current.nodeId);
    if (current.nodeId === toNodeId) {
      break;
    }

    const edges = adjacency.get(current.nodeId) ?? [];
    for (const edge of edges) {
      const nextDistance = current.distance + routeWeight(edge);
      const knownDistance = distances.get(edge.to_node_id) ?? Number.POSITIVE_INFINITY;
      if (nextDistance < knownDistance) {
        distances.set(edge.to_node_id, nextDistance);
        previousRoute.set(edge.to_node_id, edge);
        queue.push({ nodeId: edge.to_node_id, distance: nextDistance });
      }
    }
  }

  if (!previousRoute.has(toNodeId) && fromNodeId !== toNodeId) {
    throw new Error("Route not found");
  }

  const steps: Route[] = [];
  let cursor = toNodeId;
  while (cursor !== fromNodeId) {
    const step = previousRoute.get(cursor);
    if (!step) {
      break;
    }
    steps.unshift(step);
    cursor = step.from_node_id;
  }

  const totalDistance = steps.reduce((acc, route) => acc + route.distance_meter, 0);
  const totalSeconds = steps.reduce((acc, route) => acc + route.estimated_seconds, 0);
  return { steps, totalDistance, totalSeconds };
}
