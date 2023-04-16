import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import { useRef, useState } from "react";
import Chart from "react-apexcharts";

interface ITop10Chart {
  [key: string]: any;
}

const Top10Chart: React.FC<ITop10Chart> = ({
  color,
  chart,
  title,
  description,
  footer,
}) => {
  return (
    <Card className="h-fit w-full">
      <CardHeader variant="gradient" color={color}>
        <Chart {...chart} />
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default Top10Chart;
