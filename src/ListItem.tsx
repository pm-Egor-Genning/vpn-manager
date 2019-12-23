import React from 'react';

export function ListItem(props: any) {
  const value = props.value;
  return (
    <li>
      {value}
    </li>
  );
}
