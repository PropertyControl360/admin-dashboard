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
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';

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

export default function AppErrorLog({ title, subheader, tableData, tableLabels, ...other }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      
      <Divider />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppErrorLogRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

     {location.pathname === paths.dashboard.root && <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          onClick={() => navigate(paths.dashboard.errorLogs.root)}
        >
          View All
        </Button>
      </Box>
}
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppErrorLogRowProps = {
  row: ErrorLogProps;
};

function AppErrorLogRow({ row }: AppErrorLogRowProps) {
  const popover = usePopover();

 

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

  const getLabelColor = (errorType: string) => {
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

  return (
    <>
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

    </>
  );
}
