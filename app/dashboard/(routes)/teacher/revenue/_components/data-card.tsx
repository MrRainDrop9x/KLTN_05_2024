import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export const DataCard = ({
  value,
  label,
  shouldFormat,
  type
}: DataCardProps) => {

  const Icon = iconMap[type];

  return (
   <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <div className="flex">
    {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
      <CardTitle className="text-sm font-medium ml-2">
        {label}
      </CardTitle>
    </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {shouldFormat ? formatPrice(value) : value}
      </div>
    </CardContent>
   </Card>
  )
}