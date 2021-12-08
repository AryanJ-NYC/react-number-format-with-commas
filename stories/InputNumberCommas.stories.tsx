import { Meta, Story } from '@storybook/react';
import React from 'react';
import { InputNumberCommas, Props } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: InputNumberCommas,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => <InputNumberCommas {...args} />;

export const Default = Template.bind({});

Default.args = {};
