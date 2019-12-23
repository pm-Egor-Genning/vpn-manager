import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const fetchVPNClients = actionCreator('FETCH_VPN_CLIENTS');
export const fetchVPNClientsSuccess = actionCreator<any>('SUCCESS_ALL_CLIENTS');
export const fetchVPNClientsError = actionCreator<any>('ERROR_FETCH_CLIENTS');
export const addVPNClient = actionCreator<any>('ADD_VPN_CLIENT');
export const addVPNClientSuccess = actionCreator<any>('SUCCESS_ADD_CLIENT');
export const addVPNClientError = actionCreator<any>('ERROR_ADD_CLIENTS');
