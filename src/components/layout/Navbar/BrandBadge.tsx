import { BrainCircuit } from "lucide-react";
import cls from "./Sidebar.module.scss";

export function BrandBadge() {
  return (
    <div className={cls.brand}>
      <BrainCircuit className={cls.brandIcon} />
    </div>
  );
}
