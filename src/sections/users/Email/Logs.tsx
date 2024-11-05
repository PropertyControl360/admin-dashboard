import React, { useState, useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TablePaginationCustom, TableEmptyRows, TableNoData, emptyRows } from 'src/components/table';
import { paths } from 'src/routes/paths';
import Stack from '@mui/material/Stack';
import FilledInput from '@mui/material/FilledInput';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, InputBase, SelectChangeEvent, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type EmailLogProps = {
  id: string;
  userId: string | null;
  reason: string;
  message: string;
  status: boolean;
  createdAt: string;
  user?: User;
  email: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: EmailLogProps[];
  tableLabels: any;
}

enum Filter {
  All = 'all',
  RegisterError = 'registererror',
  LoginError = 'loginerror',
  EmailVerificationError = 'emailverificationerror',
  PasswordResetError = 'passwordreseterror',
  ReferralError = 'referralerror'
}

enum SortBy {
  Newest = 'newest',
  Oldest = 'oldest'
}


export default function EmailDetails({ title, subheader, tableData, tableLabels, ...other }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');


  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let data = tableData;

    // Filter by search term
    if (searchQuery) {
      data = data.filter(row =>
        row.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.user?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.user?.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    // Sort data
    if (sortBy === SortBy.Newest) {
      data = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === SortBy.Oldest) {
      data = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return data;
  }, [tableData, searchQuery, sortBy]);

  const dataInPage = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const denseHeight = 56;
  const emptyRowsCount = emptyRows(page, rowsPerPage, filteredData.length);
  const notFound = !dataInPage.length;

  const theme = useTheme();

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value);
  }, []);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Divider />

      {/* Filter and Search Area */}
      <Box sx={{ p: 2 }}>
        <Stack flexDirection="row" justifyContent="flex-end" alignItems="center" flexWrap="wrap" spacing={1.5}>


          <Box sx={{ borderBottom: `solid 1px ${theme.palette.primary},` }}>
            <InputBase
              fullWidth
              autoFocus
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" width={17} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }

            />
          </Box>
          <Stack flexDirection="row" alignItems="center" spacing={1}>
            <Typography fontSize={14} fontWeight={400} color="text.secondary">Sort by</Typography>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Select value={sortBy} onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as SortBy)} sx={{ color: 'primary.main' }}>
                <MenuItem value={SortBy.Newest}>Newest</MenuItem>
                <MenuItem value={SortBy.Oldest}>Oldest</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {dataInPage.map((row) => (
                <EmailLog key={row.id} row={row} />
              ))}

              <TableEmptyRows height={denseHeight} emptyRows={emptyRowsCount} />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />


      {/* Pagination */}
      <TablePaginationCustom
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type EmailLogRowProps = {
  row: EmailLogProps;
};

function EmailLog({ row }: EmailLogRowProps) {
  const formatDate = (date: string) => {
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    } as Intl.DateTimeFormatOptions;
    return new Date(date).toLocaleDateString('en-GB', options);
  };


  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="body2" color="text.primary">
          {row?.email || ''}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="caption" color="text.secondary">
          {row?.message}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.primary">
          {row.reason}
        </Typography>
      </TableCell>
      <TableCell>
        <Label color={row.status ? 'success' : 'error'}>{row.status ? 'Sent' : 'Failed'}</Label>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.primary">
          {formatDate(row.createdAt)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
