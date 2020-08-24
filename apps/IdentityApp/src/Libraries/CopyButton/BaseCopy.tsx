import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

interface BaseCopyProps {
  children: React.ReactChild;
  value: string;
  prompt?: string;
}

const BaseCopy: React.FC<BaseCopyProps> = ({ value, prompt, children }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handlePress = () => {
    Clipboard.setString(value);
    if (prompt) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>{children}</View>
      {isCopied && <Text>{prompt}</Text>}
    </TouchableOpacity>
  );
};

export default BaseCopy;
