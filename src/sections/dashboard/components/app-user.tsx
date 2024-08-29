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
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { FormControlLabel, Switch } from '@mui/material';
import { deleteUser, toggleUserActiveStatus } from 'src/api/user';
import { paths } from 'src/routes/paths';

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
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppUserRow key={row.id} row={row} refetch={refetch} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

    { location.pathname === paths.dashboard.root &&  <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          onClick={() => navigate(paths.dashboard.users.root)}
        >
          View All
        </Button>
      </Box>
}
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppUserRowProps = {
  row: RowProps;
  refetch: Function;
};

function AppUserRow({ row , refetch}: AppUserRowProps) {
  const popover = usePopover();

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

  const handleDelete = async() => {
    popover.onClose();
    console.info('DELETE', row.id);
    try {
      await deleteUser(row.id);
      refetch()
    }
    catch (error) {
      console.error('Failed to delete user', error)
    }
  };

  const handleToggleActiveStatus = async (userId:string) => {
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
          <Label  variant="soft" color={row.isEmailVerified ? 'success' : 'error'}>
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
      </CustomPopover>
    </>
  );
}
