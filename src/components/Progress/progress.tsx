import { ProgressProps } from './type';

export const Progress = ({ percent, showText, strokeHeight, styles, theme = 'primary' }: ProgressProps) => {
  const maxPercent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
  return (
    <div className="progress" style={styles}>
      <div className="progress-bar" style={{ height: `${strokeHeight}px` }}>
        <div className={`progress-bar-outer color-${theme}`} style={{ width: `${maxPercent}%` }}>
          {showText && <span className="progress-bar-inner-text">{`${maxPercent}%`}</span>}
        </div>
      </div>
    </div>
  );
};
