import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import classNames from 'classnames';

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />;

export interface Icon2Props extends Omit<LucideProps, 'ref'> {
  /** 图标集 https://lucide.dev/icons/ */
  name: keyof typeof dynamicIconImports;
  size?: string | number;
  color?: string;
  width: string | number;
  height: string | number;
  strokeWidth: number | string;
  absoluteStrokeWidth?: boolean;
  fill?: string | undefined;
  spin?: boolean;
}

export const Icon2 = ({ name, spin = false, className, ...props }: Icon2Props) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  const classes = classNames(className, {
    'icon-loading': spin,
  });

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} className={classes} />
    </Suspense>
  );
};
