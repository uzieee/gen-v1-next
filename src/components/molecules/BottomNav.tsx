import { ReactNode } from "react";
import NavItem from "../atoms/NavItem";

export interface NavItemType {
  id: string;
  label: string;
  hasRedDot?: boolean;
  icon: ReactNode;
}

export interface BottomNavProps {
  navItems: NavItemType[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function BottomNav({
  navItems,
  activeTab,
  setActiveTab,
}: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary rounded-t-3xl px-10 py-8 z-50 shadow-lg">
      <div className="flex items-center justify-between">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={item.id === activeTab}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
