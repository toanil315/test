import { useEffect, useState } from 'react';

export interface UseBroadCastChannelParams<T> {
  name: string;
}

export type UseBroadCastChannel = <T>(params: UseBroadCastChannelParams<T>) => BroadcastChannel;

export const useBroadCastChannel: UseBroadCastChannel = ({ name }) => {
  const [broadCastChannel, setBroadCastChannel] = useState<BroadcastChannel>(
    new BroadcastChannel(name),
  );

  useEffect(() => {
    if (!name) {
      return broadCastChannel.close();
    }
    const newBroadcastChannel = new BroadcastChannel(name);
    setBroadCastChannel(newBroadcastChannel);
    return () => {
      newBroadcastChannel.close();
    };
  }, [name]);

  return broadCastChannel;
};
