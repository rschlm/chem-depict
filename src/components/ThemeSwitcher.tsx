// components/ThemeSwitcher.tsx
import { useTheme } from "next-themes";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { MdOutlineLightMode } from "react-icons/md";
import { LuMoonStar } from "react-icons/lu";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div>
            <Dropdown className="min-w-0 w-fit">
                <DropdownTrigger>
                    <Button isIconOnly variant="flat">
                        {theme === 'system' ? <HiMiniComputerDesktop /> : theme === 'light' ? <MdOutlineLightMode /> : <LuMoonStar />}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className="w-30">
                    <DropdownItem color="primary" onClick={() => setTheme('light')}>
                        <div className="flex items-center">
                            <MdOutlineLightMode className="mr-2" /> Light
                        </div>
                    </DropdownItem>
                    <DropdownItem color="primary" onClick={() => setTheme('dark')}>
                        <div className="flex items-center">
                            <LuMoonStar className="mr-2" /> Dark
                        </div>
                    </DropdownItem>
                    <DropdownItem color="primary" onClick={() => setTheme('system')}>
                        <div className="flex items-center">
                            <HiMiniComputerDesktop className="mr-2" /> System
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
};