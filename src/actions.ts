import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const fetchVPNClients = actionCreator('FETCH_VPN_CLIENTS');
export const addVPNClient = actionCreator<any>('ADD_VPN_CLIENT');
