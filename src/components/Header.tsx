import { ThemeSwitcher } from './ThemeSwitcher';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import { Tooltip } from "@nextui-org/react";


export const Header = () => {
    return (
        <div className='flex justify-center items-center'>
            <h2 className="text-3xl text-center my-5 font-bold">ChemDepict</h2>
            <div className="ml-auto">
                <ThemeSwitcher />
            </div>
            <div className='ml-3'>
                <a href="https://github.com/rschlm/chem-depict" target="_blank" rel="noopener noreferrer">
                    <Tooltip content="View on GitHub" delay={0} closeDelay={0}>
                        <Button isIconOnly variant="flat">
                            <FaGithub />
                        </Button>
                    </Tooltip>
                </a>
            </div>
        </div >
    )

};

export default Header;