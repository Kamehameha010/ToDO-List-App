import { fireEvent, render } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';
import Tab from './tab';
import TabItem from './tab-item';
import type { TabKeys, TabItem as TTabItem } from './types';
import { useState } from 'preact/hooks';

const tabs: TTabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
  },
  {
    id: 'tab2',
    label: 'Tab 2',
  },
];

function Wrapper() {
  const [active, setActive] = useState<TabKeys>('tab1');

  return (
    <>
      <Tab>
        {tabs.map((tab) => (
          <TabItem
            id={tab.id}
            active={active == tab.id}
            onClick={() => setActive(tab.id)}
            key={tab.id}
          >
            {tab.label}
          </TabItem>
        ))}
      </Tab>
    </>
  );
}

describe('<Tab />', () => {
  it('Should be render tab container and tab items', () => {
    const { getByTestId } = render(<Wrapper />);

    const container = getByTestId(/tab/i);

    expect(container).toBeDefined();
    expect(container.querySelector('#tab1')).toBeDefined();
    expect(container.querySelector('#tab1')?.textContent).toMatch('Tab 1');
    expect(container.querySelector('#tab2')).toBeDefined();
    expect(container.querySelector('#tab2')?.textContent).toMatch('Tab 2');
    expect(container.querySelector('#tab4')).toBeNull();
  });

  it('Should be change between tab items', () => {
    const { getByTestId } = render(<Wrapper />);

    const tab1 = getByTestId(/tab/i).querySelector(
      '#tab1'
    ) as HTMLButtonElement;
    const tab2 = getByTestId(/tab/i).querySelector(
      "button[id='tab2']"
    ) as HTMLButtonElement;

    fireEvent.click(tab2);
    expect(tab2.ariaSelected).toMatch('true')
    expect(tab1.ariaSelected).toMatch('false')

    fireEvent.click(tab1);
    expect(tab2.ariaSelected).toMatch('false')
    expect(tab1.ariaSelected).toMatch('true')
    
  });
});
