import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { type ChangeEvent, type FC, memo, useCallback } from "react";

export const DatasetOriginInput: FC<{
  value: string;
  onChange: (v: string) => unknown;
}> = memo(({ onChange, value }) => {
  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => onChange(value),
    [onChange],
  );
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" sx={{ color: "text.primary" }}>
        {`แหล่งที่มาของข้อมูล`}
      </FormLabel>
      <RadioGroup row value={value} onChange={handleChange}>
        <FormControlLabel
          value={"0"}
          control={
            <Radio disableFocusRipple disableRipple disableTouchRipple />
          }
          label="ประชากร"
        />
        <FormControlLabel value={"1"} control={<Radio />} label="กลุ่มตัวอย่าง" />
      </RadioGroup>
    </FormControl>
  );
});
