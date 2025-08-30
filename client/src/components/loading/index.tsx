import type { FC } from 'react';
import { memo } from 'react';

import { cn } from '@util/tn-merge';

interface Props {
  className?: string;
}
const Loading: FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex h-screen items-center justify-center space-x-2 bg-white dark:invert', className)}>
      <span className="sr-only">Loading...</span>
      <div className="bg-primary h-4 w-4 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
      <div className="bg-primary h-4 w-4 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
      <div className="bg-primary h-4 w-4 animate-bounce rounded-full"></div>
    </div>
  );
};

export default memo(Loading);
