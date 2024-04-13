import { FaGithub, FaReact } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';


export const Footer = () => {

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-center">
                <p className="text-sm flex items-center">
                    Built with
                    <a
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white ml-1 mr-2 flex items-center"
                    >
                        <FaReact className="inline-block mr-1" />
                        React
                    </a>
                    and
                    <a
                        href="https://www.typescriptlang.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white ml-1 mr-2 flex items-center"
                    >
                        <SiTypescript className="inline-block mr-1" />
                        TypeScript
                    </a>
                    <span className="mx-2">&bull;</span>
                    <a
                        href="https://github.com/rschlm/chem-depict"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white flex items-center"
                    >
                        <FaGithub className="inline-block mr-2" />
                        View on GitHub
                    </a>
                </p>
            </div>
        </footer >
    );
};

