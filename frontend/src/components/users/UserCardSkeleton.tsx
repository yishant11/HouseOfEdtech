import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Shimmer } from "@/components/ui/Shimmer";

export default function UserCardSkeleton() {
  return (
    <Card className="flex flex-col h-full border border-gray-200 rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <Shimmer className="h-6 w-3/4 rounded" />
        <Shimmer className="h-4 w-full mt-2 rounded" />
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <Shimmer className="h-3 w-32 rounded" />
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t border-gray-100">
        <Shimmer className="h-10 w-20 rounded-lg" />
        <Shimmer className="h-10 w-20 rounded-lg" />
      </CardFooter>
    </Card>
  );
}