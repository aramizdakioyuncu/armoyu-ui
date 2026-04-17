export interface NavItem {
  name: string;
  href: string;
  submenu?: NavItem[];
}
