import React, { useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Typography,
  Checkbox,
  FormControlLabel,
  Toolbar,
  IconButton,
  Tooltip,
  Box 
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';

const users = [
  { name: 'Angelique Morse', email: 'benny89@yahoo.com', phone: '500-268-4826', company: 'Wuckert Inc', role: 'Sales Representative', status: 'Banned' },
  { name: 'Ariana Lang', email: 'avery43@hotmail.com', phone: '408-439-8033', company: 'Feest Group', role: 'Customer Service Associate', status: 'Pending' },
  { name: 'Aspen Schmitt', email: 'mireya13@hotmail.com', phone: '531-492-6028', company: 'Kihn, Marquardt and Crist', role: 'Content Strategist', status: 'Banned' },
  { name: 'Brycen Jimenez', email: 'tyrel_greenholt@gmail.com', phone: '201-465-1954', company: 'Rempel, Hand and Herzog', role: 'Software Developer', status: 'Active' },
  { name: 'Chase Day', email: 'joana.simonis84@gmail.com', phone: '285-840-9338', company: 'Mraz, Donnelly and Collins', role: 'Creative Director', status: 'Banned' },
];

const UserList: React.FC = () => {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [dense, setDense] = useState(false);

  const handleNewUser = () => {
    router.push('/user/create'); // Navigate to the existing create user page
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = users.map((_, index) => index);
      setSelectedUsers(newSelecteds);
      return;
    }
    setSelectedUsers([]);
  };

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedIndex = selectedUsers.indexOf(index);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = newSelected.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > -1) {
      newSelected = newSelected.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1),
      );
    }

    setSelectedUsers(newSelected);
  };

  const isSelected = (index: number) => selectedUsers.indexOf(index) !== -1;

  const handleDeleteUsers = () => {
    // Implement delete functionality
    console.log('Deleting users:', selectedUsers);
    // Reset selection after deletion
    setSelectedUsers([]);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">
          List<Typography variant="body2" sx={{ mb: 3 }}>
        Dashboard &gt; User &gt; Edit user
      </Typography>
        </Typography>
        
        <Button variant="contained" color="primary" style={{ backgroundColor: 'black' }} onClick={handleNewUser}>
          + New User
        </Button>
      </Box>
      {selectedUsers.length > 0 && (
        <Toolbar>
          <Typography variant="subtitle1" component="div">
            {selectedUsers.length} selected
          </Typography>
          <IconButton onClick={handleDeleteUsers}>
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      )}
      <TableContainer component={Paper}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                  checked={users.length > 0 && selectedUsers.length === users.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              const isItemSelected = isSelected(index);
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={index}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleCheckboxClick(event, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar alt={user.name} src={`https://i.pravatar.cc/150?img=${index + 1}`} style={{ marginRight: '10px' }} />
                      <Box>
                        <Typography>{user.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: user.status === 'Active' ? 'green' : user.status === 'Pending' ? 'orange' : 'red',
                      }}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <FormControlLabel
        control={<Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />}
        label="Dense"
      />
    </Container>
  );
};

export default UserList;
