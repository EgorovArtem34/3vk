import { ChangeEvent } from "react";
import styles from "./Select.module.scss";

export interface SelectOption {
  value: string;
  content: string;
}

interface Select {
  options: SelectOption[];
  value: string;
  label: string;
  onChange?: (value: string) => void;
}

export const Select = (props: Select) => {
  const { options, onChange, value, label } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const optionsList = options.map((option) => (
    <option className={styles.option} value={option.value} key={option.value}>
      {option.content}
    </option>
  ));

  return (
    <label>
      {label}
      <select className={styles.select} value={value} onChange={handleChange}>
        {optionsList}
      </select>
    </label>
  );
};
