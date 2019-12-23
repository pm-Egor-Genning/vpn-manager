import { combineEpics, createEpicMiddleware, ofType } from 'redux-observable';
import { mapTo, switchMap } from 'rxjs/operators';
import { addVPNClient, fetchVPNClients } from './actions';
import { fromFetch } from 'rxjs/fetch';
import { applyMiddleware, createStore } from 'redux';

const fetchClients = (action$: any) => action$.pipe(
  ofType(fetchVPNClients.type),
  mapTo({ type: 'PONG' })
);

const createClient = (action$: any) => action$.pipe(
  ofType(addVPNClient.type),
  switchMap((action: any) => fromFetch('/clients', {
    method: 'POST',
    body: action.payload
  }))
);

export const rootEpic = combineEpics(
  fetchClients,
  createClient
);

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  () => {
  },
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);
