import React from 'react';
import { ListItem } from './ListItem';

export function ClientList(props: { clients: any[] }) {
  const clients = props.clients;
  if (clients) {
    return (
      <ul>
        {clients.map((item: any) =>
          <ListItem key={item.toString()}
                    value={item}/>
        )}
      </ul>
    );
  }
  return null;
}
