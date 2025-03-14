import {ethers} from "ethers"
import claimsModel from '../models/claims-model';
import SMART_CONTRACT from "../utils/smart-contract/contract_abi.json";

const { OWNER_PRIVATE_KEY, CONTRACT_ADDRESS, RPC_PROVIDER } = process.env;
if (!OWNER_PRIVATE_KEY || !CONTRACT_ADDRESS) {
    console.error("OWNER_PRIVATE_KEY, CONTRACT_ADDRESS environment variables are required");
    process.exit(1);
}

async function getContractABI(){
    const abi = SMART_CONTRACT['abi'];
    return abi;
}

class ClaimsService {
    private provider = new ethers.JsonRpcProvider(RPC_PROVIDER as string);
    private ownerPrivateKey = OWNER_PRIVATE_KEY as string;
    private ownerWallet = new ethers.Wallet(this.ownerPrivateKey, this.provider);

    private async getFaucetContract() {
        const abi = await getContractABI();
        return new ethers.Contract(CONTRACT_ADDRESS as string, abi, this.ownerWallet);
    }

    public async transfer({ etherAddress, cosmosAddress }: { etherAddress: string, cosmosAddress: string }) {
            console.log(`Initiating transfer of tokens to ${etherAddress}...`);

            const faucetContract = await this.getFaucetContract();

            const txResponse = await faucetContract.transfer(etherAddress);
            console.log("Transaction submitted. Hash:", txResponse.hash);

            const newClaim = await claimsModel.create({ cosmosAddress, etherAddress, transactionHash: txResponse.hash });
            console.log("Document created:", newClaim);

            const receipt = await txResponse.wait();
            console.log(`Transaction confirmed in block ${receipt.blockNumber}`);


            return txResponse.hash;
    }

    public async eligibleForFaucet({ cosmosAddress }: { etherAddress: string, cosmosAddress: string }) {
        const claims = await claimsModel.find({ cosmosAddress }).sort({ createdAt: -1 }).limit(3);
        console.debug("All claims:", claims);

        const last3TransactionsWithin24Hours = claims.filter(claim => {
            if (!claim.createdAt) return false;
            const createdAtDate = new Date(claim.createdAt);
            return Date.now() - createdAtDate.getTime() < 24 * 60 * 60 * 1000;
        });

        console.debug("Claims in the last 24 hours:", last3TransactionsWithin24Hours);
        if (last3TransactionsWithin24Hours.length >= 3) {
            return { eligible: false, message: "You have already claimed 3 times in the last 24 hours" };
        }

        if (claims.length && Date.now() - claims[0].createdAt.getTime() < 6 * 60 * 60 * 1000) {
            return { eligible: false, message: "You have already claimed in the last 6 hours" };
        }

        return { eligible: true };
    }
}

export default new ClaimsService();