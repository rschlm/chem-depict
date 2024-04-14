import React from 'react'
import { useState, useEffect } from 'react'
import { Textarea } from "@nextui-org/react";
import { Button } from '@nextui-org/react';
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Header } from './components/Header';
import { Tooltip } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";



import { Footer } from './components/Footer';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [smiles, setSmiles] = useState("");
  const [annotation, setAnnotation] = useState<string>("None");
  const [style, setStyle] = useState<string>("Color on Clear");
  const [hydrogens, setHydrogens] = useState<string>("Chiral Hydrogens (SMARTS)");
  const [reactionType, setReactionType] = useState<string>("Plain");
  const [zoom, setZoom] = useState<number>(1.3);
  const [inputZoomValue, setInputZoomValue] = useState<string>("0.2");
  const [smilesList, setSmilesList] = useState<{ smile: string, name: string }[]>([]);
  const [modalSmiles, setModalSmiles] = useState<string>("");
  const [modalName, setModalName] = useState<string>("");

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

  const annotations_list = [
    "No annotation",
    "Atom Numbers",
    "Atom Mapping",
    "Color Mapping",
    "Atom Value",
    "CIP Stereolabel"
  ]
  const style_list = [
    "Color on White",
    "Color on Black",
    "Color on Clear",
    "Black on White",
    "Black on Clear",
    "White on Black",
    "Neon on Black",
  ]
  const hydrogens_list = [
    "Minimal Hydrogens",
    "Chiral Hydrogens",
    "Chiral Hydrogens (SMARTS)",
    "Default Hydrogens",
  ]

  const reaction_list = [
    "Plain",
    "Equilibrium",
    "No Go",
    "Retrosynthesis",
    "Resonance",
  ]
  function retrieveSmilesList(smiles: string): { smile: string, name: string }[] {
    return smiles.split('\n').map((entry) => {
      const [smile, name] = entry.trim().split(/[\s,;]/);
      if (smile !== "") {
        return { smile, name: name || '' };
      }
      return { smile: '', name: '' }; // Return an empty object instead of null
    }).filter((entry) => entry.smile !== ''); // Filter out empty objects
  }

  useEffect(() => {
    setSmilesList(retrieveSmilesList(smiles));
  }, [smiles]);

  const handleZoomChange = (value: number) => {
    if (isNaN(Number(value))) return;
    setZoom(value);
    setInputZoomValue(value.toString());
  };

  const handleOpen = (smile: string, name: string) => {
    setModalSmiles(smile);
    setModalName(name);
    onOpen();
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-8 py-4 text-center">
        <Header />

        <div className="container mx-auto">
          <Textarea
            placeholder="Enter SMILES here"
            value={smiles}
            onValueChange={setSmiles}
            disableAnimation
            disableAutosize
            classNames={{
              base: "w-full",
              input: "resize-y min-h-[200px]",
            }}
          />
          <div className="flex justify-center items-center mt-4">
            <Button color='danger' onClick={
              () => {
                setSmiles('')
              }
            }>Clear</Button>
            <Button color="primary" className="mx-4" onClick={
              () => {
                navigator.clipboard.readText().then(
                  (text) => {
                    setSmiles(smiles + '\n' + text)
                  }
                )
              }
            }><Kbd keys={["command"]}>V</Kbd>Paste</Button>
            <Select
              label="Style"
              className="max-w-[150px] mx-2"
              value={style}
              size='sm'
              defaultSelectedKeys={["Color on Clear"]}
              onChange={(e) => setStyle(style_list[Number(e.target.value)])}
            >
              <SelectSection>
                {style_list.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>
            <Select
              label="Annotation"
              className="max-w-[170px] mx-2"
              value={annotation}
              size='sm'
              defaultSelectedKeys={["No annotation"]}
              onChange={(e) => setAnnotation(annotations_list[Number(e.target.value)])}
            >
              <SelectSection>
                {annotations_list.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>
            <Select
              label="Hydrogens"
              className="max-w-[240px] mx-2"
              value={hydrogens}
              size='sm'
              defaultSelectedKeys={["Chiral Hydrogens (SMARTS)"]}
              onChange={(e) => setHydrogens(hydrogens_list[Number(e.target.value)])}
            >
              <SelectSection>
                {hydrogens_list.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>
            <Input
              placeholder="SMARTS pattern search"
              size="md"
              className="max-w-[250px] mx-2"
            />

          </div>
          <Accordion variant="splitted" className='my-5'>
            <AccordionItem key="1" aria-label="settings" title="More settings">
              <Select
                label="Reaction type"
                className="max-w-[170px] mx-2"
                value={reactionType}
                onChange={(e) => setReactionType(reaction_list[Number(e.target.value)])}
              >
                <SelectSection>
                  {reaction_list.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectSection>
              </Select>
              <Slider
                label="Zoom"
                size="sm"
                step={0.01}
                maxValue={5}
                minValue={0.1}
                color="foreground"
                classNames={{
                  base: "max-w-md",
                  label: "text-medium",
                }}
                // we extract the default children to render the input
                renderValue={({ children, ...props }) => (
                  <output {...props}>
                    <Tooltip
                      className="text-tiny text-default-500 rounded-md"
                      content="Press Enter to confirm"
                      placement="left"
                    >
                      <input
                        className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                        type="text"
                        aria-label="Zoom"
                        value={inputZoomValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const v = e.target.value;

                          setInputZoomValue(v);
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter" && !isNaN(Number(inputZoomValue))) {
                            setZoom(Number(inputZoomValue));
                          }
                        }}
                      />
                    </Tooltip>
                  </output>
                )}
                value={zoom}
                onChange={(value: number | number[]) => handleZoomChange(Array.isArray(value) ? value[0] : value)}
              />
            </AccordionItem>
          </Accordion>
        </div>
        {smilesList.length === 0 || smiles === "" ? null : (
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 my-10">
            {smilesList.map(({ smile, name }, index) => (
              <Card
                className="transition-transform duration-500 ease-in-out transform hover"
                shadow="sm"
                key={index}
                isPressable
                onPress={() => handleOpen(smile, name)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    className="w-full object-contain h-[140px]"
                    src={`https://www.simolecule.com/cdkdepict/depict/${map_style[style as keyof typeof map_style]}/svg?smi=${smile}&w=-1&h=-1&abbr=on&hdisp=bridgehead&showtitle=false&sma=&zoom=${zoom}&annotate=${annotation_map[annotation as keyof typeof annotation_map]}&r=0`}
                  ></Image>
                </CardBody>
                {name !== "" && (
                  <CardFooter className="text-small justify-between">
                    <b>{name.charAt(0).toUpperCase() + name.slice(1)}</b>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                {modalName !== "" ? (
                  <ModalHeader className="flex flex-col gap-1">
                    {modalName.charAt(0).toUpperCase() + modalName.slice(1)}
                  </ModalHeader>
                ) : (
                  <ModalHeader className="flex flex-col gap-1">Unnamed molecule</ModalHeader>
                )}
                <ModalBody>
                  <p>{modalSmiles}</p>

                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    className="w-full object-contain h-[300px]"
                    src={`https://www.simolecule.com/cdkdepict/depict/${map_style[style as keyof typeof map_style]}/svg?smi=${modalSmiles}&w=-1&h=-1&abbr=on&hdisp=bridgehead&showtitle=false&sma=&zoom=1.3&annotate=none&r=0`}
                  ></Image>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="success"
                    onPress={() => {
                      navigator.clipboard.writeText(modalSmiles);
                      <Tooltip content="Copied!" delay={0} closeDelay={0} />
                    }}
                  >
                    Copy SMILES
                  </Button>
                  <Dropdown className="min-w-0 w-fit">
                    <DropdownTrigger>
                      <Button color="primary">Save as</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" className="w-30">
                      <DropdownItem key="pdf" color="default">
                        PDF
                      </DropdownItem>
                      <DropdownItem key="svg" color="default">
                        SVG
                      </DropdownItem>
                      <DropdownItem key="png" color="default">
                        PNG
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Footer />
      </div>
    </>
  );
}

export default App
