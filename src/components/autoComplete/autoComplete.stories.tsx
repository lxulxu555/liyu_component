import { Meta, StoryObj } from '@storybook/react';
import { AutoComplete } from './autoComplete';
import { action } from '@storybook/addon-actions';
import { AutoCompleteDataSourceType } from './type';

const meta: Meta<typeof AutoComplete> = {
  title: 'AutoComplete',
  component: AutoComplete,
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export const DefaultAutoComplete: Story = {
  render: (args) => {
    const handleFetch = (query: string) => {
      return fetch('https://api.github.com/search/users?q=' + query)
        .then((res) => res.json())
        .then(({ items }) => {
          return items?.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
        });
    };

    const renderOption = (item: AutoCompleteDataSourceType) => {
      const itemWithGithub = item as AutoCompleteDataSourceType<GithubUserProps>;
      return (
        <>
          <b>Name：{itemWithGithub.value}</b>
          <span>Url: {itemWithGithub.url}</span>
        </>
      );
    };
    return (
      <AutoComplete fetchSuggestions={handleFetch} placeholder="输入 Github 用户名试试" onSelect={action('selected')} renderOption={renderOption} />
    );
  },
};
