export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  name: string;
  isButton?: boolean;
  imageUrl?: string | null;
  disabled?: boolean;
}
