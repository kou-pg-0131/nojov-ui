import React from 'react';

// material-ui
import { Typography, Box, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import { IndeterminateCheckBox as IndeterminateCheckBoxIcon, CheckBox as CheckBoxIcon } from '@material-ui/icons';

// other
import { Language, languageToString, languageToColor } from '../../../../../domain';

type Props = {
  languages: Map<Language, boolean>;
  onCheck: (languages: Map<Language, boolean>) => void;
};

// component
export const Checkboxes: React.FC<Props> = (props: Props) => {
  const handleCheck = (e: { target: { value: string; checked: boolean; } }) => {
    props.onCheck(new Map<Language, boolean>([...(Array.from(props.languages.entries())), [e.target.value as Language, e.target.checked]]));
  };

  const handleAllCheck = () => {
    props.onCheck(new Map<Language, boolean>(Array.from(props.languages.entries()).map(([language, _]) => [language, getCheckedStatus() === 'none'])));
  };

  const getCheckedStatus = (): 'all' | 'indeterminate' | 'none' => {
    switch (true) {
      case Array.from(props.languages.entries()).every(([_, checked]) => checked):
        return 'all';
      case Array.from(props.languages.entries()).some(([_, checked]) => checked):
        return 'indeterminate';
      default:
        return 'none';
    }
  };

  return (
    <Box>
      <Box>
        <FormControl>
          <FormControlLabel
            labelPlacement='end'
            label={<Typography>全てチェック</Typography>}
            control={
              <Checkbox
                checked={getCheckedStatus() !== 'none'}
                onChange={handleAllCheck}
                checkedIcon={getCheckedStatus() === 'all' ? <CheckBoxIcon/> : <IndeterminateCheckBoxIcon/>}
              />
            }
          />
        </FormControl>
      </Box>
      <Box>
        {Array.from(props.languages.entries()).map(([language, checked]) =>
          <FormControl key={language}>
            <FormControlLabel
              labelPlacement='end'
              label={<Typography>{languageToString(language)}</Typography>}
              control={
                <Checkbox
                  checked={checked}
                  value={language}
                  onChange={handleCheck}
                  style={{ color: languageToColor(language) }}
                />
              }
            />
          </FormControl>
        )}
      </Box>
    </Box>
  );
};
