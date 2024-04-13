interface MoleculeSVGProps {
    data: {
        smiles: string;
    };
}


function MoleculeSVG({ data }: MoleculeSVGProps) {
    const { smiles } = data;
    // let molecule = OCL.Molecule.fromSmiles(smiles);
    return (
        <>
            <div className="text-updater-node" style={{ borderRadius: '5px', backgroundColor: 'white', border: '1px solid grey' }}>
                <img src={`https://www.simolecule.com/cdkdepict/depict/cot/svg?smi=${smiles}&w=-1&h=-1&abbr=on&hdisp=bridgehead&zoom=${zoom}&annotate=none&r=0`} alt="Molecule" />
                {/* {OCL.StructureView.drawMolecule(molecule)} */}
            </div>
        </>
    );

}

export default MoleculeSVG;
