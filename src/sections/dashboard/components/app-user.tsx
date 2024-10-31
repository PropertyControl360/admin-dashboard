import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { emptyRows, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import {
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputBase,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';

import Pagination from '@mui/material/Pagination';

import { deleteUser, toggleUserActiveStatus } from 'src/api/user';
import { paths } from 'src/routes/paths';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEventListener } from "src/hooks/use-event-listener";
import { useBoolean } from "src/hooks/use-boolean";
import useSWR from "swr";
import { endpoints, fetcher } from "src/utils/axios";

// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  email: string;
  phoneNumber: string;
  createdAt: string; // Registration Timestamp
  isEmailVerified: boolean;
  tenancyInfo: {
    activeTenancies: number;
    inactiveTenancies: number;
  };
  subscriptionInfo: {
    status: string;
  };
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
  refetch: Function;
}

export default function AppUser({ title, subheader, tableData, tableLabels, refetch, ...other }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const search = useBoolean();


  const [searchQuery, setSearchQuery] = useState('');


  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
  }, [search]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);
  const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [paginationPageSize, setPaginationPageSize] = useState<number>(0);

  // Add filter  Mechanism
  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let data = tableData;

    // Filter by type
    if (filter !== Filter.All) {
      setSearchQuery('');
      // Not verified
      if (filter === Filter.EmailNotVerified) {
        data = data.filter(row => !row.isEmailVerified);
      }
      //  verified
      if (filter === Filter.EmailVerified) {
        data = data.filter(row => row.isEmailVerified);
      }
      // Active
      if (filter === Filter.Active) {
        data = data.filter(row => row.isActive);
      }
      // Inactive
      if (filter === Filter.Inactive) {
        data = data.filter(row => !row.isActive);
      }

    }

    // Filter by search term
    if (searchQuery) {
      data = data.filter(row =>
        row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort data
    if (sortBy === SortBy.Newest) {
      data = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === SortBy.Oldest) {
      data = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return data;
  }, [tableData, filter, searchQuery, sortBy]);

  // Filtering user information make it ssr


  const theme = useTheme();

  const dataInPage = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );




  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      {/* Filter and Search Area */}
      <Box sx={{ p: 2 }}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          spacing={1.5}
        >
          <Stack flexDirection="row" spacing={1.25}>
            <Chip
              label="Show All"
              variant={filter === Filter.All ? 'filled' : 'outlined'}
              color="primary"
              onClick={() => setFilter(Filter.All)}
            />
            <Chip
              label="Active"
              variant={filter === Filter.Active ? 'filled' : 'outlined'}
              color="primary"
              onClick={() => setFilter(Filter.Active)}
            />
            <Chip
              label="InActive"
              variant={filter === Filter.Inactive ? 'filled' : 'outlined'}
              color="primary"
              onClick={() => setFilter(Filter.Inactive)}
            />
            <Chip
              label="Verified Email"
              variant={filter === Filter.EmailVerified ? 'filled' : 'outlined'}
              color="primary"
              onClick={() => setFilter(Filter.EmailVerified)}
            />
            <Chip
              label="Not Verified Email"
              variant={filter === Filter.EmailNotVerified ? 'filled' : 'outlined'}
              color="primary"
              onClick={() => setFilter(Filter.EmailNotVerified)}
            />
          </Stack>


          <Stack flexDirection="row" alignItems="center" spacing={1}>
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
            <Typography fontSize={14} fontWeight={400} color="text.secondary">
              Sort by
            </Typography>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Select
                value={sortBy}
                onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as SortBy)}
                sx={{ color: 'primary.main' }}
              >
                <MenuItem value={SortBy.Newest}>Newest</MenuItem>
                <MenuItem value={SortBy.Oldest}>Oldest</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {dataInPage.map((row) => (
                <AppUserRow key={row.id} row={row} refetch={refetch} />
              ))}
              <TableEmptyRows height={56} emptyRows={emptyRows(page, rowsPerPage, filteredData.length)} />

              <TableNoData notFound={!dataInPage.length} />
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
            onClick={() => navigate(paths.dashboard.users.root)}
          >
            View All
          </Button>
        </Box>
      )}
      <Grid container justifyContent="flex-end" alignItems="center" mb={4} mt={4} >
        <Grid item md={7} >
          <Grid container justifyContent="flex-end" alignItems="flex-end">
            <Pagination
              count={Math.ceil(filteredData.length / pageSize)}
              shape="rounded"
              page={pageIndex}
              // eslint-disable-next-line @typescript-eslint/no-shadow
              onChange={(_, page) => setPageIndex(page)}
              sx={{
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#0085FF',
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item md={1} lg={1} xl={0.6} mr={3} >
          <Select
            labelId=""
            id="simple-select-pageSize"
            sx={{
              width: '100%',
              border: '1px solid #0085FF',
              height: '40px',
              '& fieldset': { border: 'none' },
            }}
            size="small"
            value={pageSize}
            label=""
            disabled={filteredData.length === 0}
            onChange={(e) => {
              const newPageSize = e.target.value as number;
              const newMaxPageIndex = Math.ceil(filteredData.length / newPageSize);
              const currentPageIndex = Math.min(pageIndex, newMaxPageIndex);
              setPageSize(newPageSize);
              setPageIndex(currentPageIndex);
            }}
          >
            {[5, 7, 10, 15, 25].map((term) => (
              <MenuItem value={term} key={term}>
                {term}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppUserRowProps = {
  row: RowProps;
  refetch: Function;
};
enum Filter {
  All = 'all',
  Active = 'active',
  Inactive = 'inactive',
  Subscribed = 'subscribed',
  EmailVerified = 'emailVerified',
  EmailNotVerified = 'emailNotVerified',
}
enum SortBy {
  Newest = 'newest',
  Oldest = 'oldest',
}

function AppUserRow({ row, refetch }: AppUserRowProps) {
  const popover = usePopover();
  const navigate = useNavigate();
  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row.id);
  };
  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row.id);
  };

  const handleDelete = async () => {
    popover.onClose();
    console.info('DELETE', row.id);
    try {
      await deleteUser(row.id);
      refetch();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleToggleActiveStatus = async (userId: string) => {
    try {
      await toggleUserActiveStatus(userId);
      refetch();
    } catch (error) {
      console.error('Failed to toggle user active status', error);
    }
  };
  const formatDate = (date: string) => {
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions;
    return new Date(date).toLocaleDateString('en-GB', options);
  };
  function getSubscriptionStatusLabel(status: string) {
    if (status === 'active') {
      return 'success';
    }
    if (status === 'inactive') {
      return 'error';
    }
    return 'warning';
  }

  function getSubscriptionStatusText(status: string): string {
    if (status === 'none') {
      return 'Not Subscribed';
    }
    return status;
  }

  return (
    <>
      <TableRow>
        <TableCell> {`${row.firstName} ${row.lastName}`}</TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>{row.phoneNumber}</TableCell>

        <TableCell>{formatDate(row.createdAt)}</TableCell>
        <TableCell>
          <Label color={getSubscriptionStatusLabel(row.subscriptionInfo.status)}>
            {getSubscriptionStatusText(row.subscriptionInfo.status)}
          </Label>
        </TableCell>
        <TableCell>
          <Label variant="soft" color={row.isEmailVerified ? 'success' : 'error'}>
            {row.isEmailVerified ? 'Verified' : 'Not Verified'}
          </Label>
        </TableCell>

        <TableCell align="center">{row.tenancyInfo.activeTenancies}</TableCell>

        <TableCell align="center">{row.tenancyInfo.inactiveTenancies}</TableCell>

        <TableCell>
          <FormControlLabel
            sx={{
              width: '100%',
            }}
            control={
              <Switch
                onChange={(event) => {
                  handleToggleActiveStatus(row.id);
                }}
                checked={row.isActive}
                value={row.isActive}
                color="success"
                size="small"
              />
            }
            label={row.isActive ? 'Active' : 'Inactive'}
            labelPlacement="start"
          />
        </TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
        <MenuItem onClick={() => navigate(`detail/${row.id}`)} sx={{ color: 'error.main' }}>
          <Iconify icon="mdi:alert" />
          Errors
        </MenuItem>
      </CustomPopover >
    </>
  );
}