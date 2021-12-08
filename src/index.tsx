import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

export const InputNumberCommas: FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [num, setNum] = useState<number>(
    typeof props.value === 'number' ? props.value : 0
  );
  const [numAsString, setNumAsString] = useState(num.toString());
  useEffect(() => {
    setNumAsString(Intl.NumberFormat('en-US').format(num));
  }, [num]);
  useEffect(() => {
    if (typeof props.value === 'number') {
      setNum(props.value);
    }
  }, [props.value]);

  const { onChange: propsOnChange } = props;
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const max = ref.current?.max
        ? Number(ref.current.max)
        : Number.MAX_SAFE_INTEGER;
      const min = ref.current?.min
        ? Number(ref.current.min)
        : Number.MIN_SAFE_INTEGER;
      const step = Number(ref.current?.step);
      if (!isNaN(step)) {
        if (e.key === 'ArrowUp') {
          setNum((v) => {
            const newValue = Math.min(v + step, max);
            propsOnChange?.({
              ...e,
              // @ts-expect-error
              target: { ...e.target, value: newValue.toString() },
            });
            return newValue;
          });
        } else if (e.key === 'ArrowDown') {
          setNum((v) => {
            const newValue = Math.max(v - step, min);
            propsOnChange?.({
              ...e,
              // @ts-expect-error
              target: { ...e.target, value: newValue.toString() },
            });
            return newValue;
          });
        }
      }
    },
    [propsOnChange]
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const valWithoutCommas = e.target.value.replaceAll(',', '');
      const asNumber = Number(valWithoutCommas);
      if (!isNaN(asNumber)) {
        setNum(asNumber);
        propsOnChange?.({
          ...e,
          target: { ...e.target, value: asNumber.toString() },
        });
      }
    },
    [propsOnChange]
  );

  return (
    <input
      {...props}
      name={props.name}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={ref}
      step={props.step ?? 1}
      value={numAsString}
    />
  );
};
export type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
