import { Root, Thumb } from "@radix-ui/react-switch";
import { useTheme } from "@/context/ThemeContext";

const Toggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Root
      className="relative h-[25px] w-[42px] rounded-full bg-kAppCoolGray outline-none data-[state=checked]:bg-kAppCoral"
      id="theme-toggle"
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-kAppWhite transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </Root>
  );
};

export default Toggle;
