import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface ComboBoxProps {
  options: {
    label: string;
    value: string;
  }[];
  inputLabel: string;
  sx?: any;
  isMulti?: boolean;
}

export default function ComboBox({ options, inputLabel, sx={}, isMulti=false }: ComboBoxProps) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      multiple={isMulti}
  
      sx={{ width: 300, ...sx }}
      // @ts-ignore
      renderInput={(params) => <TextField {...params} label={inputLabel}
      color={'#532F7E'}
      />}
    />
  );
}
