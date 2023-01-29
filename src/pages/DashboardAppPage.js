import { useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { kpupContext } from '../context';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const { category } = useContext(kpupContext)
  const theme = useTheme();


  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
          Hi, Welcome back to <span style={{ "color": "#00A73C" }}>LuigiMart</span>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Top Department" total={"Electronics"} icon={'fluent-emoji-high-contrast:department-store'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Top Product" total={"Mangoes"} color="info" icon={'icon-park:ad-product'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Items" total={124} color="warning" icon={'carbon:inventory-management'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Profit" total={"Rs 234000"} color="error" icon={'tabler:pig-money'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Sales Analysis"
              subheader="(+43%) than last year"
              chartLabels={category?.length !== 0 && category?.map((item) => `${item.substring(0, 5)}...`)}
              chartData={[
                {
                  name: 'Sales',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21],
                },
                {
                  name: 'Expenditure(Rs)',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41],
                },
                {
                  name: 'Profit(Rs)',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Category Distribution"
              chartData={[
                { label: 'Amazon Launchpad', value: 13014 },
                { label: 'Sports, Fitness & Outdoors', value: 29802 },
                { label: 'Bags, Wallets and Luggage', value: 24548 },
                { label: 'Books', value: 20000 },
                { label: 'Computers & Accessories', value: 9285 },
                { label: 'Grocery & Gourmet Foods', value: 50280 },
                { label: 'Office Products', value: 8338 },
                { label: 'Electronics', value: 19038 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Track Products"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppTrafficBySite
              title="Suggested Products"
              list={[
              ]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppTasks
              title="Daily Todos"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
