
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image } from "@nextui-org/react";


interface FocusProps {
    smi: string
    name: string
    annotation: string;
    style: string;
}


export default function Focus({ smi, name, annotation, style }: FocusProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalSmiles, setModalSmiles] = useState("");
    const [modalName, setModalName] = useState("");

    const map_style = {
        "Color on White": "cow",
        "Color on Black": "cob",
        "Color on Clear": "cot",
        "Black on White": "bow",
        "Black on Clear": "bot",
        "White on Black": "wob",
        "Neon on Black": "nob"
    }

    const annotation_map = {
        "No annotation": "none",
        "Atom Numbers": "number",
        "Atom Mapping": "mapidx",
        "Color Mapping": "colmap",
        "Atom Values": "atomvalue",
        "CIP Stereolabel": "cip"
    }

    const handleOpen = (smi, name) => {
        setModalSmiles(smi);
        setModalName(name);
        onOpen();
    }

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        {name !== "" ? (
                            <ModalHeader className="flex flex-col gap-1">{name.charAt(0).toUpperCase() + name.slice(1)}</ModalHeader>
                        ) : (
                            <ModalHeader className="flex flex-col gap-1">Unnamed molecule</ModalHeader>
                        )}
                        <ModalBody>
                            <p>
                                {smi}
                            </p>

                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                className="w-full object-contain h-[300px]"
                                src={`https://www.simolecule.com/cdkdepict/depict/${map_style[style]}/svg?smi=${smi}&w=-1&h=-1&abbr=on&hdisp=bridgehead&showtitle=false&sma=&zoom=1.3&annotate=none&r=0`}
                            ></Image>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="success" onPress={
                                () => {
                                    navigator.clipboard.writeText(smi);
                                }
                            }>
                                Copy SMILES
                            </Button>
                            <Dropdown className="min-w-0 w-fit">
                                <DropdownTrigger>
                                    <Button
                                        color="primary"
                                    >
                                        Save as
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Dynamic Actions" className="w-30">
                                    <DropdownItem
                                        key="pdf"
                                        color="default"
                                    >
                                        PDF
                                    </DropdownItem>
                                    <DropdownItem
                                        key="svg"
                                        color="default"
                                    >
                                        SVG
                                    </DropdownItem>
                                    <DropdownItem
                                        key="png"
                                        color="default"
                                    >
                                        PNG
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
