import "./AnimatedBackground.css";

export const AnimatedBackground = () => {
  return (
    <>
      {/* Animated Grid Background */}
      <div className="grid-background"></div>

      {/* Animated Gradient Orbs */}
      <div className="orbs-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
    </>
  );
};
