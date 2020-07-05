import React from 'react';
import { Box, Link, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { Launch as LaunchIcon } from '@material-ui/icons';
import { Language, languageToString, Website } from '../../../../domain';

type Props = {
  languages: { name: Language; count: number; searchUrl: string }[];
  website: Website | 'all';
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
                {props.website === 'all' ? null : (
                  <Box>
                    <Box display='inline-block'>
                      <Link style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} href={language.searchUrl} target='_blank' rel='noopener'>
                        {props.website.name}
                        <LaunchIcon style={{ fontSize: 12 }}/>
                      </Link>
                    </Box>
                  </Box>
                )}
              </TableCell>
              <TableCell align='center'>{language.count}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
