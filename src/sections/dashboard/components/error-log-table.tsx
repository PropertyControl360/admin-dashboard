import React, { useState, useMemo } from 'react';
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
import { SelectChangeEvent } from '@mui/material';

// ----------------------------------------------------------------------

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type ErrorLogProps = {
  id: string;
  userId: string | null;
  errorMessage: string;
  errorType: string;
  createdAt: string;
  user?: User;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: ErrorLogProps[];
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
export const getLabelColor = (errorType: string) => {
  switch (errorType.toLowerCase()) {
    case 'registererror':
      return 'warning';
    case 'loginerror':
      return 'error';
    case 'emailverificationerror':
      return 'info';
    case 'passwordreseterror':
      return 'error';
    case 'referralerror':
      return 'warning';
    default:
      return 'default';
  }
};

export default function AppErrorLog({ title, subheader, tableData, tableLabels, ...other }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let data = tableData;

    // Filter by type
    if (filter !== Filter.All) {
      data = data.filter(row => row.errorType.toLowerCase() === filter);
    }

    // Filter by search term
    if (search) {
      data = data.filter(row => 
        row.errorMessage.toLowerCase().includes(search.toLowerCase()) ||
        (row.user?.firstName.toLowerCase().includes(search.toLowerCase()) ||
         row.user?.lastName.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Sort data
    if (sortBy === SortBy.Newest) {
      data = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === SortBy.Oldest) {
      data = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return data;
  }, [tableData, filter, search, sortBy]);

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

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Divider />

      {/* Filter and Search Area */}
      <Box sx={{ p: 2 }}>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={1.5}>
          
          <Stack flexDirection="row" spacing={1.25}>
            <Chip label="Show All" variant={filter === Filter.All ? 'filled' : 'outlined'} color="primary" onClick={() => setFilter(Filter.All)} />
            <Chip label="Register Error" variant={filter === Filter.RegisterError ? 'filled' : 'outlined'} color={getLabelColor("registererror")} onClick={() => setFilter(Filter.RegisterError)} />
            <Chip label="Login Error" variant={filter === Filter.LoginError ? 'filled' : 'outlined'} color={getLabelColor("loginerror")} onClick={() => setFilter(Filter.LoginError)} />
            <Chip label="Email Verification Error" variant={filter === Filter.EmailVerificationError ? 'filled' : 'outlined'} color={getLabelColor("emailverificationerror")} onClick={() => setFilter(Filter.EmailVerificationError)} />
            <Chip label="Password Reset Error" variant={filter === Filter.PasswordResetError ? 'filled' : 'outlined'} color={getLabelColor("passwordreseterror")} onClick={() => setFilter(Filter.PasswordResetError)} />
            <Chip label="Referral Error" variant={filter === Filter.ReferralError ? 'filled' : 'outlined'} color={getLabelColor("referralerror")} onClick={() => setFilter(Filter.ReferralError)} />
          </Stack>
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
                <AppErrorLogRow key={row.id} row={row} />
              ))}

              <TableEmptyRows height={denseHeight} emptyRows={emptyRowsCount} />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {location.pathname === paths.dashboard.root && (
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
            onClick={() => navigate(paths.dashboard.errorLogs.root)}
          >
            View All
          </Button>
        </Box>
      )}

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

type AppErrorLogRowProps = {
  row: ErrorLogProps;
};

function AppErrorLogRow({ row }: AppErrorLogRowProps) {
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
          {row.user ? `${row.user.firstName} ${row.user.lastName}` : 'N/A'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.user?.email || 'No Email'}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.primary">
          {row.errorMessage}
        </Typography>
      </TableCell>
      <TableCell>
        <Label color={getLabelColor(row.errorType)}>{row.errorType}</Label>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.primary">
          {formatDate(row.createdAt)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
