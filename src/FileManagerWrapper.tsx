import React from 'react';
// @ts-ignore
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
// @ts-ignore
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';
import { useDispatch } from 'react-redux';
import { addVPNClient } from './actions';

export const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `http://localhost:3020` // Or you local Server Node V1 installation.
};

export function FileManagerWrapper() {
  const dispatch = useDispatch();

  return (
    <FileManager>
      <FileNavigator
        id="filemanager-1"
        api={connectorNodeV1.api}
        apiOptions={apiOptions}
        capabilities={connectorNodeV1.capabilities}
        listViewLayout={connectorNodeV1.listViewLayout}
        viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
        onSelectionChange={(resourceId: any) => {
          if (resourceId.length) {
            connectorNodeV1.api.getResourceById(
              apiOptions,
              resourceId[0]
            ).then((res: any) => {
              console.log(res);
              const path = res.ancestors
                .map(({ name }: any) => name)
                .join('/')
                .concat(`/${res.name}`);
              console.log(path);
              dispatch(addVPNClient({ path }));
            });
          }
        }}
      />
    </FileManager>
  );
}
