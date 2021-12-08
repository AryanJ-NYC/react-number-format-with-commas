# React Number Formatted with Commas

It's just an input form with commas that returns the number (as a string sans commas) to the supplied onChange handler.

## Installation

```shell
yarn add react-number-format-with-commas
```

or

```shell
npm install react-number-format-with-commas
```

## Usage

```tsx
import { InputNumberCommas } from 'react-number-format-with-commas';

const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
  (e) => setValue(e.target.value), // e.target.value is a string sans commas here
  [setValue]
);

<InputNumberCommas onChange={onChange} />;
```
