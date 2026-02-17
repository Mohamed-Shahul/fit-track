import { Autocomplete, TextField, Paper } from "@mui/material";

const ModeAutocomplete = (props) => {
  const {  viewModel } = props;
  const { radioButtonValue, handleEditRadioFetch } = viewModel;

  const options = [
    { label: "Create split", value: "create" },
    { label: "Edit split", value: "edit" },
  ];

  return (
    <Autocomplete
      size="small"
      options={options}
      getOptionLabel={(opt) => opt.label}
      value={options.find((o) => o.value === radioButtonValue) || null}
      onChange={(e, newValue) => handleEditRadioFetch(newValue?.value)}
      disableClearable
      PaperComponent={(props) => (
        <Paper
          {...props}
          sx={{
            bgcolor: "#2b2b2b", // slightly lighter than page
            color: "white",
            border: "1px solid #555", // 👈 visible border
            boxShadow: "0 4px 12px rgba(0,0,0,0.6)", // 👈 elevation
            "& .MuiAutocomplete-option": {
              minHeight: 32,
              fontSize: 13,
            },
            "& .MuiAutocomplete-option[aria-selected='true']": {
              bgcolor: "#1565c0",
            },
            "& .MuiAutocomplete-option:hover": {
              bgcolor: "#444",
            },
          }}
        />
      )}
      sx={{
        width: '50%',
        "& .MuiInputBase-root": {
          height: 32,
          fontSize: 13,
          bgcolor: "#393737",
          color: "white",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#777", // 👈 visible input border
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aaa",
        },
        "& .MuiSvgIcon-root": {
          color: "white",
          fontSize: 18,
        },
      }}
      renderInput={(params) => <TextField {...params} size="small" />}
    />
  );
};

export default ModeAutocomplete;
