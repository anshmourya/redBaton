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
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

const Dashboard = () => {
  const { markDelete } = useUser();
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
              <TableHead>Mark Deleted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Link to={item.url}>
                    <Button variant="link">vist</Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`https://news.ycombinator.com/${item.hackerNewsUrl}`}
                  >
                    <Button variant="link">hacker news</Button>
                  </Link>
                </TableCell>
                <TableCell>{item.upvotes}</TableCell>
                <TableCell>{item.postedBy}</TableCell>
                <TableCell>
                  {datefns.formatDistance(item.postedOn, Date.now(), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <Button onClick={() => markDelete(item.id)}>delete</Button>
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
