    public RpcResponse<String> authorizeFacultyNftMint(CustomMintRequest customMintRequest) {

        log.info("Signing message: " + customMintRequest.toString());

        byte[] toSign;
        try {
            toSign = Utils.getConfiguredObjectMapper().writeValueAsString(customMintRequest).getBytes();
        } catch (Exception e) {
            return RpcResponse.withError("Failed to serialize message: " + e.getMessage());
        }

        try {
            Credentials credentials = facultyCredentials.getCredentials();

            Sign.SignatureData signatureData = Sign.signMessage(toSign, credentials.getEcKeyPair(), true);

            byte[] value = new byte[65];
            System.arraycopy(signatureData.getR(), 0, value, 0, 32);
            System.arraycopy(signatureData.getS(), 0, value, 32, 32);
            System.arraycopy(signatureData.getV(), 0, value, 64, 1);

            return RpcResponse.of(Numeric.toHexString(value));
        } catch (Exception e) {
            return RpcResponse.withError("Failed to sign message: " + e.getMessage());
        }
    }
