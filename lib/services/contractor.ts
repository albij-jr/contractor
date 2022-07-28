import { gql, useApolloClient } from "@apollo/client"
import { Contractor } from "../../types/data-types/Contractor";
import {initializeApollo} from '../../lib/core/apollo/apollo'


export interface ContractorServiceType {
    storeContractorsAPI: CallableFunction,
    getContractorsAPI : CallableFunction,
}
const client = initializeApollo();

const contractor_type = `
contractors(id: $id){
    name
    telephone
    email
    services
}`;
export const ContractorService : ContractorServiceType = {

    // store contractors
    storeContractorsAPI :  async (contractor : Contractor[]) => {
        return client.writeQuery({
            query: gql`
                query StoreContractor($id: Int!){
                    ${contractor_type}
                }
            `,
            data: {
                contractors: contractor
            }
        })
    },

    // get Contractors
    getContractorsAPI : async (contractor_id?: number) => {
        return client.readQuery({
            query: gql`{
                    contractors(id: $id){
                        name
                        telephone
                        email
                        services
                    }
                }
            `,
            variables: (!!contractor_id) ? { id: contractor_id! } : {}
        })
    },
}