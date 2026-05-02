import type { Node, Route } from "@/types/wayfinding";

export function SimpleMap({
  nodes,
  highlightedRoutes,
}: {
  nodes: Node[];
  highlightedRoutes: Route[];
}) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return (
    <div className="rounded-xl border-2 border-slate-300 bg-white p-3">
      <svg viewBox="0 0 420 260" className="h-auto w-full" role="img" aria-label="wayfinding map">
        <rect x="0" y="0" width="420" height="260" fill="#eff6ff" />
        {highlightedRoutes.map((route) => {
          const from = byId.get(route.from_node_id);
          const to = byId.get(route.to_node_id);
          if (!from || !to) return null;
          return (
            <line
              key={route.id}
              x1={from.map_x}
              y1={from.map_y}
              x2={to.map_x}
              y2={to.map_y}
              stroke="#0052CC"
              strokeWidth={6}
              strokeLinecap="round"
            />
          );
        })}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.map_x}
              cy={node.map_y}
              r={8}
              fill={node.is_accessible ? "#1d4ed8" : "#b91c1c"}
            />
            <text x={node.map_x + 10} y={node.map_y - 10} fontSize={14} fill="#0f172a">
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
