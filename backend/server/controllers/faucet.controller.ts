import { Request, Response } from "express";
import cosmosHubService from "../services/cosmos-hub.service";
import config from "../config";
import { IErrorToBeCaught } from "../interfaces/rest/IResponse";

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

    if (!delegatorValidators.length) throw { statusCode: 400, message: 'No Validators Found' } as IErrorToBeCaught;
    if (!delegatorValidators.includes(config.VALIDATOR_ADDRESS)) throw { statusCode: 400, message: 'Validator Not Found' } as IErrorToBeCaught;

    // todo - implement faucet logic

    res.json({
        message: 'Faucet request successful',
        // transactionHash:
    });
}
