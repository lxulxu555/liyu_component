import { useEffect, useRef, useState } from 'react';
import { AutoCompleteDataSourceType, AutoCompleteProps } from './type';
import { CSSTransition } from 'react-transition-group';
import Input from '../Input/input';
import { Icon } from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

export const AutoComplete = ({ fetchSuggestions, onSelect, value, renderOption, ...restProps }: AutoCompleteProps) => {
  const [inputValue, setInputVlue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<AutoCompleteDataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputVlue(value);
    triggerSearch.current = true;
  };

  const handleSelect = (item: AutoCompleteDataSourceType) => {
    setInputVlue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 'ArrowUp':
        highlight(highlightIndex - 1);
        break;
      case 'ArrowDown':
        highlight(highlightIndex + 1);
        break;
      case 'Escape':
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const renderTemplate = (item: AutoCompleteDataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <CSSTransition in={suggestions.length > 0 || loading} timeout={300} classNames="zoom-in-top" unmountOnExit>
        <ul className="suggestion-wrapper">
          {loading && (
            <div className="suggestion-loading-icon">
              <Icon name="loader" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'item-highlighted': index === highlightIndex,
            });
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </CSSTransition>
    );
  };

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      {generateDropdown()}
    </div>
  );
};
