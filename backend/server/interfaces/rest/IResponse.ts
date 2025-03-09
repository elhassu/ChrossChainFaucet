export interface IErrorToBeCaught {
    message: string;
    statusCode: number;
}

export function isErrorToCatch(err: any): IErrorToBeCaught | Error {
  if (err.statusCode && err.message) {
    return err as IErrorToBeCaught;
  } else return err as Error;
}