import { combineEpics, createEpicMiddleware, ofType } from 'redux-observable';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';
import logger from 'redux-logger';
import {
  addVPNClient,
  addVPNClientError,
  addVPNClientSuccess,
  fetchVPNClients,
  fetchVPNClientsError,
  fetchVPNClientsSuccess
} from './actions';
import { fromFetch } from 'rxjs/fetch';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { of } from 'rxjs';

const fetchClients = (action$: any) => action$.pipe(
  ofType(fetchVPNClients.type),
  switchMap((action: any) => {
    return fromFetch('http://localhost:3002/clients', {
      method: 'GET'
    }).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json();
        } else {
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError(err => {
        console.error(err);
        return of({ error: true, message: err.message });
      })
    );
  }),
  map((result: Response) => {
    return fetchVPNClientsSuccess(result);
  }),
  catchError((error) => {
    return of(fetchVPNClientsError(error));
  })
);

const createClient = (action$: any) => action$.pipe(
  ofType(addVPNClient.type),
  switchMap((action: any) => {
    return fromFetch('http://localhost:3002/client',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      }
    ).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json();
        } else {
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError(err => {
        console.error(err);
        return of({ error: true, message: err.message });
      })
    );
  }),
  map((result: Response) => {
    return addVPNClientSuccess(result);
  }),
  catchError((error) => {
    return of(addVPNClientError(error));
  })
);

const reloadOnAdd = (action$: any) => action$.pipe(
  ofType(addVPNClientSuccess.type),
  mapTo(fetchVPNClients())
);

export const rootEpic = combineEpics(
  fetchClients,
  createClient,
  reloadOnAdd,
);

const epicMiddleware = createEpicMiddleware();


const clientListReducer = (state = [], action: any) => {
  switch (action.type) {
    case fetchVPNClientsSuccess.type:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
    clients: clientListReducer
  }
);

export const store: any = createStore(
  rootReducer,
  applyMiddleware(
    epicMiddleware,
    logger
  )
);

epicMiddleware.run(rootEpic);
