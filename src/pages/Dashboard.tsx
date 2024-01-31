import React from "react";
import useScrap from "@/hooks/useScrap";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as datefns from "date-fns";
const Dashboard = (): JSX.Element => {
  const { scrapData } = useScrap();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["scrapData"],
    queryFn: scrapData,
  });
  if (isLoading) {
    return <h1>loding</h1>;
  }
  if (isError) {
    return <h1>error</h1>;
  }
  return (
    <>
      <div className="container">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Sr no</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>visit Url</TableHead>
              <TableHead>hackerN Url</TableHead>
              <TableHead>Upvotes</TableHead>
              <TableHead>posted By</TableHead>
              <TableHead>posted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Button variant="link">vist</Button>
                </TableCell>
                <TableCell>
                  <Button variant="link">hacker news</Button>
                </TableCell>
                <TableCell>{item.upvotes}</TableCell>
                <TableCell>{item.postedBy}</TableCell>
                <TableCell>
                  {datefns.formatDistance(item.postedOn, Date.now(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
