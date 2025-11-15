import React from "react";

export const Input = ({
  placeholder,
  changeValue,
  style = {},
  value = "",
  type = "text",
}: {
  placeholder: string;
  changeValue: (value: string) => void;
  style?: React.CSSProperties;
  value?: string;
  type?: React.HTMLInputTypeAttribute | "textarea";
}) => {
  const baseClass =
    "w-full border-0 border-b-2 border-gray-300 focus:border-black outline-none";

  if (type === "textarea") {
    return (
      <textarea
        placeholder={placeholder}
        onChange={(e) => changeValue(e.currentTarget.value)}
        value={value}
        style={{ ...style }}
        className={baseClass}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => changeValue(e.currentTarget.value)}
      value={value}
      style={style}
      className={baseClass}
    />
  );
};
