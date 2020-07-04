import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { Language, languageToString } from '../../../../domain';

type Props = {
  languages: { name: Language; count: number }[];
};

export const LanguagesTable: React.FC<Props> = (props: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align='center'>順位</TableCell>
            <TableCell align='center'>言語</TableCell>
            <TableCell align='center'>求人数</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.languages.sort((a, b) => b.count - a.count).map((language, i) =>
            <TableRow key={i}>
              <TableCell align='center'>{i + 1}</TableCell>
              <TableCell align='center'>
                {languageToString(language.name)}
              </TableCell>
              <TableCell align='center'>{language.count}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
