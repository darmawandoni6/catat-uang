import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import type { InitialState } from '../types';
import { Context, HandleContext, initialState } from './use-context';

interface Props {
  children: ReactNode;
}
export const Provider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<InitialState>(initialState);

  const providers = [<Context.Provider value={state} />, <HandleContext.Provider value={setState} />];

  return providers.reduceRight((acc, providers) => {
    return { ...providers, props: { ...providers.props, children: acc } };
  }, children);
};
