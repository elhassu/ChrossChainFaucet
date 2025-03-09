import { Request, Response } from "express";

export function faucetController(req: Request, res: Response) {
	const { etherAddress, cosmosAddress } = req.body as { etherAddress: string, cosmosAddress: string };

    if (!etherAddress) {
        res.status(400).json({ error: 'Missing etherAddress' });
        return;
    }

    if (!cosmosAddress) {
        res.status(400).json({ error: 'Missing cosmosAddress' });
        return;
    }

    let cosmosAddressValid = true;
    // perform validate cosmos address

}
