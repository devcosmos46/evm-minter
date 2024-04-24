export async function callMintFunction(hash: string, signature: string): Promise<void> {

    if (!contract) {
        await loadContract();
    }

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) {
        throw new NoAccountsError("No accounts found. Ensure your Ethereum client is configured correctly.");
    }

    try {
        await contract.methods.mint(hash, signature).send({ from: accounts[0] });
    } catch (error: unknown) {

        if (error instanceof Error) {
            // console.error('Error during minting:', error.message);
            throw new MintingError('Failed to mint NFT: ' + error.message);
        } else {
            // console.error('An unexpected error occurred during minting');
            throw new MintingError('An unexpected error occurred');
        }

    }
}
