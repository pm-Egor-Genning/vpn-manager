import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchVPNClients } from './actions';
import { ClientList } from './ClientList';

export function Home() {
  const dispatch = useDispatch();
  const clients = useSelector((state: any) => {
      return state.clients;
    },
    (a, b) => {
      return shallowEqual(a, b);
    });
  useEffect(
    () => {
      dispatch(fetchVPNClients());
      return () => {
      };
    },
    [dispatch]
  );
  return (<>
      <Link to="/add">Add new client</Link>
      <ClientList clients={clients.map(({ paths }: any) => paths)}/>
    </>
  );
}
