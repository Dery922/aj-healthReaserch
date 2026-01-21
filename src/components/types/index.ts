// Add these to your existing types

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  path?: string;
  children?: NavItem[];
}

export interface DropdownState {
  [key: string]: boolean;
}