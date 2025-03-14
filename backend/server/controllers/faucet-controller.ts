import { Request, Response } from "express";
import cosmosHubService from "../services/cosmos-hub-service";
import config from "../config/config";
import { IErrorToBeCaught } from "../interfaces/rest/IResponse";
import claimsService from "../services/claims-service";

export async function faucetController(req: Request, res: Response) {
    const { etherAddress, cosmosAddress } = req.body as { etherAddress?: string, cosmosAddress?: string };

    if (!etherAddress) throw { statusCode: 400, message: 'Missing Ether Address' } as IErrorToBeCaught;
    if (!cosmosAddress) throw { statusCode: 400, message: 'Missing Cosmos Address' } as IErrorToBeCaught;

    let delegatorValidators: string[];

    try {
        delegatorValidators = (await cosmosHubService.getDelegatorValidators(cosmosAddress)).validators;
    } catch (error) {
        throw { statusCode: 400, message: 'Invalid Cosmos Address' } as IErrorToBeCaught;
    }

    if (!delegatorValidators?.length) throw { statusCode: 400, message: 'No Validators Found' } as IErrorToBeCaught;
    if (!delegatorValidators.includes(config.VALIDATOR_ADDRESS)) throw { statusCode: 400, message: 'Validator Not Found' } as IErrorToBeCaught;

    const { eligible, message } = await claimsService.eligibleForFaucet({ etherAddress, cosmosAddress });

    if (!eligible) throw { statusCode: 400, message } as IErrorToBeCaught;

    const transactionHash = await claimsService.transfer({ etherAddress, cosmosAddress });

    res.json({
        message: 'Faucet request successful',
        transactionHash
    });
}
