import React from 'react';
import { View } from 'react-native';
import { generateMnemonic } from '@rsksmart/rif-id-mnemonic';

import { SquareButton } from '../Libraries/Button';
import { rifIdentityProvider, agent, dropDb } from './dafSetup';

interface DafTestComponentProps {}

const DafTestComponent: React.FC<DafTestComponentProps> = ({}) => {
  const createIdentity = async () => {
    console.log('getting Identities!');
    const identities = await agent.identityManager.getIdentities();
    console.log('existing:', identities.length);
    if (identities.length !== 0) {
      return console.log('it exists:', identities[0]);
    }

    console.log('creating Identity');
    const mnemonic = generateMnemonic(12);
    console.log('mnemonic:', mnemonic);
    await rifIdentityProvider.importMnemonic(mnemonic);

    // console.log(rifIdentityProvider);
    // const seed = await seedStore.get();
    // console.log('seed:', seed);

    const identity = await rifIdentityProvider.createIdentity().catch(e => console.log(e));
    // const identity = await agent.identityManager.createIdentity();

    console.log('Identity Created!');
    console.log(identity);
  };

  const deleteIdentity = async () => await dropDb()

  return (
    <View>
      <SquareButton title="Create Identity" variation="hollow" onPress={createIdentity} />
      <SquareButton title="delete" variation="hollow" onPress={deleteIdentity} />
    </View>
  );
};

export default DafTestComponent;
