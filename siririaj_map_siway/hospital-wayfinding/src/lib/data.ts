import buildings from "@/data/buildings.json";
import nodes from "@/data/nodes.json";
import places from "@/data/places.json";
import routes from "@/data/routes.json";
import type { Building, Node, Place, Route } from "@/types/wayfinding";

export function getBuildings(): Building[] {
  return buildings as Building[];
}

export function getPlaces(): Place[] {
  return places as Place[];
}

export function getNodes(): Node[] {
  return nodes as Node[];
}

export function getRoutes(): Route[] {
  return routes as Route[];
}

export function getPlaceById(id: string): Place | undefined {
  return getPlaces().find((place) => place.id === id);
}

export function getNodeByPlaceId(placeId: string): Node | undefined {
  return getNodes().find((node) => node.id === `n-${placeId.replace("p-", "")}`);
}
