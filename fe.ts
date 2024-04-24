    const onMintGenesisNft = async (link:string) => {

        const hash = calculateMessageHash("general", "12345");

        console.log('Message Hash:', hash);

        console.log('Minting Genesis NFT:', link);

        const nftId = link === 'faculty-minting-3' ? "genesis" : "kasu";

        // get form api later
        const singnature = "0x3ab079135afbb360d4b37aedb0395ff8621d76dedef58daffb2dd13b4b4b8b964386df1c26faad7ddebda9de7666b2ffbcfd7881e477a272471bc6b044c56a0c1c"

        try {
            await callMintFunction(hash, singnature);
        } catch (error) {
            if (error instanceof NoAccountsError || error instanceof MintingError) {
                // TODO: show error message to user
                console.error('Blockchain-related error:', error.message);

            }
        }
    }
