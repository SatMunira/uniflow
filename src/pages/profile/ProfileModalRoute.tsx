import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileModal from "@/pages/profile/ProfileModal";
import type { ProfileData } from "@/pages/profile/ProfileModal";

const mockUser: ProfileData = {
  name: "Adelya Musaeva",
  role: "Student",
  email: "adelya@example.com",
  phone: "+996 555 123 456",
  location: "Bishkek, Kyrgyzstan",
  attendancePct: 70,
  focusMinutes: 120,
};

export default function ProfileModalRoute() {
  const nav = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => { setOpen(true); }, []);

  const handleClose = () => {
    setOpen(false);
    // вернёмся на предыдущую страницу или на домашнюю, если историй нет
    setTimeout(() => {
      if (window.history.length > 1) nav(-1);
      else nav("/");
    }, 0);
  };

  return (
    <ProfileModal
      isOpen={open}
      onClose={handleClose}
      data={mockUser}
    />
  );
}
