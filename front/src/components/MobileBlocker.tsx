import LogoIcon from "@icons/logo.svg?react";

const MobileBlocker = () => {
  return (
    <div className="hidden max-md:flex fixed inset-0 z-50 bg-kAppLightGray2 flex-col items-center justify-center gap-4 p-8 text-center">
      <LogoIcon className="mb-2" />
      <h1 className="text-xl font-bold">Desktop Only</h1>
      <p className="text-kAppCoolGray max-w-xs">
        Food EPOS isn&apos;t optimized for mobile devices yet. Please open
        this app on a desktop or tablet screen to continue.
      </p>
    </div>
  );
};

export default MobileBlocker;
