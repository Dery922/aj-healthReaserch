// src/types/index.ts

export type ServiceType =
  | "Research"
  | "Data Analytics"
  | "Project Management"
  | "Health Economics Evaluation"
  | "Logistics & Supply Chain";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  service?: ServiceType;
}

export type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
}

export type DropdownState = Record<string, boolean>;

export interface Service {
  title: string;
  description: string;
}
