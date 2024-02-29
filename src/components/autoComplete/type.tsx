import { InputProps } from '../Input/type';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => AutoCompleteDataSourceType[] | Promise<AutoCompleteDataSourceType[]>;
  onSelect?: (item: AutoCompleteDataSourceType) => void;
  renderOption?: (item: AutoCompleteDataSourceType) => React.ReactElement;
}

interface DataSourceObject {
  value: string;
}

export type AutoCompleteDataSourceType<T = {}> = T & DataSourceObject;
