import FilterButtonIcon from "../../../assets/icons/filter-button.svg?react";
import ComboBox from "../../../components/combobox";

type Props = {};

const comboBoxSx = {
  width: "100%",
  backgroundColor: "#F2F2F2",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#532F7E",
  },
};

function Filter({}: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-10">
        <div className="flex items-center gap-2">
          <FilterButtonIcon />

          <ComboBox
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
            inputLabel="Kişiler"
            sx={comboBoxSx}
          />
        </div>

        <ComboBox
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
          inputLabel="Duruma Göre"
          sx={comboBoxSx}
        />
        <ComboBox
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
          inputLabel="Tarihe Göre"
          sx={comboBoxSx}
        />

        <ComboBox
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
          inputLabel="Etikete Göre"
          sx={comboBoxSx}
        />
      </div>
    </div>
  );
}

export default Filter;
