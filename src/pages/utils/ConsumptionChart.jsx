'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../auth/config';
import { IoIosArrowDown } from 'react-icons/io';
// const chartData = [
//   { month: 'January', desktop: 18 },
//   { month: 'February', desktop: 30 },
//   { month: 'March', desktop: 239 },
//   { month: 'April', desktop: 73 },
//   { month: 'May', desktop: 20 },
//   { month: 'June', desktop: 21 },
//   { month: 'July', desktop: 10 },
//   { month: 'August', desktop: 2000 },
//   { month: 'September', desktop: 10 },
//   { month: 'October', desktop: 30 },
//   { month: 'November', desktop: 100 },
//   { month: 'December', desktop: 8000 },
// ];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
};
export function ConsumptionChart() {
  const [selected, setSelected] = useState('Yearly');
  const [yearly, setYearly] = useState([]);
  const [half_yearly, setHalf_yearly] = useState([]);
  const [quarter_yearly, setQuarter_yearly] = useState([]);
  const [chartData, setChartData] = useState([]);
  const data = [
    { name: 'Yearly' },
    { name: 'Half-Yearly' },
    { name: 'Quarterly' },
  ];
  useEffect(() => {
    if (selected === 'Yearly') {
      setChartData(yearly);
    }
    if (selected === 'Half-Yearly') {
      setChartData(half_yearly);
    }
    if (selected === 'Quarterly') {
      setChartData(quarter_yearly);
    }
  }, [selected]);
  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.get('admin/consumption');

      const transformedData = Object.entries(
        response.data.data.yearlyConsumption
      )
        .map(([month, number]) => ({
          month,
          number,
        }))
        .reverse();

      const transformedDataHalf = Object.entries(
        response.data.data.halfYearlyConsumption.readings
      )
        .map(([month, number]) => ({
          month,
          number,
        }))
        .reverse();
      const transformedDataQuarter = Object.entries(
        response.data.data.quarterlyConsumption.readings
      )
        .map(([month, number]) => ({
          month,
          number,
        }))
        .reverse();

      setYearly(transformedData);
      setHalf_yearly(transformedDataHalf);
      setQuarter_yearly(transformedDataQuarter);
      setChartData(transformedData);
    };
    getData();
  }, []);

  return (
    yearly &&
    yearly.length > 0 && (
      <Card className='w-full'>
        <CardHeader>
          <div className='flex w-full items-center justify-between'>
            <div>
              <CardTitle className='text-xl'>Consumption Curve</CardTitle>
              <CardDescription></CardDescription>
            </div>
            <div>
              {' '}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='  w-32 flex items-center justify-around '
                    variant='outline'
                  >
                    <span className=''>{selected}</span>
                    <span className='flex items-center mt-[2px]'>
                      <IoIosArrowDown />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-32'>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {data.map((item) => {
                      return (
                        <DropdownMenuItem
                          key={item.name}
                          onClick={(key) => {
                            setSelected(item.name);
                          }}
                        >
                          {item.name}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer className='h-80 w-full' config={chartConfig}>
            <AreaChart
              accessibilityLayer
              // data={yearly}
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)} // Show first 3 letters of month
              />
              <YAxis tickMargin={8} height={36} dataKey='number' />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator='dot' hideLabel />}
              />
              <Area
                dataKey='number'
                type='linear'
                fill='green'
                fillOpacity={0.4}
                stroke='green'
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  );
}
