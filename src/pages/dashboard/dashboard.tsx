

import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { green, yellow, red, blue } from '@mui/material/colors';


const pieData = [
  { name: 'Mac', value: 400, color: red[500] },
  { name: 'Windows', value: 300, color: yellow[500] },
  { name: 'iOS', value: 300, color: blue[500] },
  { name: 'Android', value: 200, color: green[500] },
];

const lineData = [
  { name: 'Jan', Asia: 40, America: 24 },
  { name: 'Feb', Asia: 30, America: 13 },
  { name: 'Mar', Asia: 20, America: 98 },
  { name: 'Apr', Asia: 27, America: 39 },
  { name: 'May', Asia: 18, America: 48 },
  { name: 'Jun', Asia: 23, America: 38 },
  { name: 'Jul', Asia: 34, America: 43 },
  { name: 'Aug', Asia: 23, America: 22 },
  { name: 'Sep', Asia: 44, America: 23 },
  { name: 'Oct', Asia: 33, America: 33 },
  { name: 'Nov', Asia: 36, America: 31 },
  { name: 'Dec', Asia: 35, America: 25 },
];

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, padding: theme.spacing(3) }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: theme.spacing(2), borderRadius: theme.spacing(1) }}>
            <Typography variant="subtitle2">Total Active Users</Typography>
            <Typography variant="h5" sx={{ marginTop: theme.spacing(1) }}>
              18,765
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ marginTop: theme.spacing(1) }}>
              +2.6%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: theme.spacing(2) }}>
            <Typography variant="subtitle2">Total Installed</Typography>
            <Typography variant="h5" sx={{ marginTop: theme.spacing(1) }}>
              4,876
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ marginTop: theme.spacing(1) }}>
              +0.2%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: theme.spacing(2) }}>
            <Typography variant="subtitle2">Total Downloads</Typography>
            <Typography variant="h5" sx={{ marginTop: theme.spacing(1) }}>
              678
            </Typography>
            <Typography variant="body2" color="error.main" sx={{ marginTop: theme.spacing(1) }}>
              -0.1%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: theme.spacing(2) }}>
            <Typography variant="subtitle2">Current Download</Typography>
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={40}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Typography variant="h5" align="center" sx={{ marginTop: theme.spacing(1) }}>
              188,245
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: theme.spacing(2), height: 300 }}>
            <Typography variant="subtitle2">Area Installed</Typography>
            <Typography variant="caption">(+43%) than last year</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <Line type="monotone" dataKey="Asia" stroke={green[500]} strokeWidth={2} />
                <Line type="monotone" dataKey="America" stroke={yellow[500]} strokeWidth={2} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
