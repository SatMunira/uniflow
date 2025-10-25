import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import cls from "./Sidebar.module.scss";

export function BrandBadge() {
  return (
    <Link to="/" aria-label="Open Dashboard" className={cls.brand}>
      <BrainCircuit className={cls.brandIcon} />
    </Link>
  );
}
