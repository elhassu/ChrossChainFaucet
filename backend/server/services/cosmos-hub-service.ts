import axios from "axios"
class CosmosHub {
    private REST_URL:string = "https://rest.cosmos.directory/cosmoshub"

    public getDelegatorValidators = async (address:string): Promise<{
        validators: string[]
    }> => {
        const url = `${this.REST_URL}/cosmos/distribution/v1beta1/delegators/${address}/validators`
        const response = await axios({
            method: "GET",
            url
        })
        return response.data
    }
}

export default new CosmosHub()