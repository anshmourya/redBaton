import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  return (
    <>
      <div className="text-center border-b">
        sign button is always here even though you are signed in. (for the
        recuriter testing purpose)
      </div>
      <div className="container sticky top-0 z-10 flex items-center justify-between px-6 py-2 border-b max-lg:border-b backdrop-blur-sm">
        <Link to="/">
          <div className="logo">Red Baton</div>
        </Link>
        <div>
          <Link to="/signin">
            <Button className="mx-4 max-md:hidden" variant="secondary">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
