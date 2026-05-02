export type PlaceCategory =
  | "opd"
  | "pharmacy"
  | "lab"
  | "toilet"
  | "elevator"
  | "parking"
  | "shuttle"
  | "information"
  | "emergency"
  | "cafeteria"
  | "atm"
  | "other";

export type Direction = "left" | "right" | "straight" | "up" | "down";

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface OpeningException {
  date: string;
  open?: string;
  close?: string;
  closed: boolean;
  reason_th?: string;
  reason_en?: string;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  exceptions: OpeningException[];
}

export interface Place {
  id: string;
  name_th: string;
  name_en: string;
  aliases: string[];
  category: PlaceCategory;
  building_id: string;
  floor: string;
  room_number?: string;
  description_th?: string;
  description_en?: string;
  phone?: string;
  opening_hours: OpeningHours;
  nearby_landmark_th?: string;
  nearby_landmark_en?: string;
  image_url?: string;
  thumbnail_url?: string;
  map_x: number;
  map_y: number;
  is_accessible: boolean;
  accessibility_notes?: string;
  is_active: boolean;
  search_priority: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface Building {
  id: string;
  name_th: string;
  name_en: string;
  code: string;
  floors: string[];
  color_hex: string;
}

export type NodeType = "entrance" | "junction" | "elevator" | "stairs" | "place";

export interface Node {
  id: string;
  name: string;
  type: NodeType;
  building_id: string;
  floor: string;
  map_x: number;
  map_y: number;
  qr_code_id?: string;
  is_accessible: boolean;
}

export interface Route {
  id: string;
  from_node_id: string;
  to_node_id: string;
  distance_meter: number;
  estimated_seconds: number;
  instruction_th: string;
  instruction_en: string;
  direction: Direction;
  is_accessible: boolean;
  landmark_image_url?: string;
  bidirectional: boolean;
}

export interface SearchLog {
  id: string;
  query: string;
  language: "th" | "en";
  results_count: number;
  clicked_place_id?: string;
  device_type: "mobile" | "tablet" | "desktop";
  timestamp: string;
}

export interface RouteResult {
  steps: Route[];
  totalDistance: number;
  totalSeconds: number;
}
