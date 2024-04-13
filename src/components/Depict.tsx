
import { useState } from "react";
import { Textarea } from "@nextui-org/react";

export default function Depict() {

    const [smiles, setSmiles] = useState("");
    const [annotation, setAnnotation] = useState<string>("None");

    return (
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

        </div>
    )
}

