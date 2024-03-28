import React, { ChangeEvent, KeyboardEvent, useState, useEffect, useRef } from 'react';

import {CustomInputProps} from '../interfaces/generalInterfaces';

// La función usePrevious es correcta y bien definida fuera del componente.
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const CustomInputTSX: React.FC<CustomInputProps> = ({
  defaultValue,
  onBlur,
  onKeyPress, // Asegúrate de que esta prop esté definida en el componente padre.
  className,
  readOnly,
  disabled,
  style,
  placeholder,
  type,
}) => {
  const [tsxValue, setTsxValue] = useState<string | null>(defaultValue);

  useEffect(() => {
    setTsxValue(defaultValue);
  }, [defaultValue]);

  const prevAmount = usePrevious(defaultValue);

  useEffect(() => {
    if ((prevAmount !== null && prevAmount !== '') && (defaultValue === '' || defaultValue === null)) {
      setTsxValue('');
    }
  }, [defaultValue, prevAmount]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTsxValue(e.target.value);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    onBlur(e, e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    // Llama a onKeyPress solo si tsxValue no es null
    if (tsxValue !== null) {
      onKeyPress(e, tsxValue);
    }
  };

  return (
    <input
      type={type}
      readOnly={readOnly}
      style={style}
      disabled={disabled}
      className={className}
      value={tsxValue ?? ''} // Maneja el caso null correctamente.
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress} // Corregido para usar handleKeyPress.
      placeholder={placeholder}
    />
  );
};

export default CustomInputTSX;
