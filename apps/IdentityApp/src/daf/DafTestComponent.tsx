import React from 'react';
import { View } from 'react-native';
import { generateMnemonic } from '@rsksmart/rif-id-mnemonic';

import { SquareButton } from '../Libraries/Button';
import { identityProvider, agent } from './dafSetup';

interface DafTestComponentProps {}

const DafTestComponent: React.FC<DafTestComponentProps> = ({}) => {
  const createIdentity = async () => {
    console.log('getting Identities!');
    const identities = await agent.identityManager.getIdentities();
    console.log('existinging:', identities.length);
    if (identities.length !== 0) {
      return console.log('it exists:', identities[0]);
    }

    console.log('creating Identity');
    const mnemonic = generateMnemonic(12);
    console.log('mnemonic:', mnemonic);
    await identityProvider.importMnemonic(mnemonic);
    console.log(identityProvider);
    const identity = await agent.identityManager.createIdentity();

    console.log('Identity Created!');
    console.log(identity);
  };

  const deleteIdentity = async () => {
    console.log('deleting');
    await identityProvider.kms.deleteKey();
    console.log('deleted');
  };

  return (
    <View>
      <SquareButton title="Create Identity" variation="hollow" onPress={createIdentity} />
      <SquareButton title="delete" variation="hollow" onPress={deleteIdentity} />
    </View>
  );
};

export default DafTestComponent;
