import type { Preview } from '@storybook/react';
import { WithStore } from '../src/stores/WithStore';
import { theme } from '../src/theme';
import { ThemeProvider } from '@mui/material';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  decorators: [
    (Story) => (
      <WithStore>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </WithStore>
    ),
  ],
};

export default preview;
