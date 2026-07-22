import type { ComponentPropsWithoutRef } from "react";
import { Callout } from "@/components/blog/Callout";

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-scroll">
      <table {...props} />
    </div>
  );
}

/**
 * Components made available inside article MDX bodies, e.g. `<Callout variant="warning">...</Callout>`.
 * `table` is overridden so wide tables scroll horizontally instead of breaking mobile layout.
 */
export const mdxComponents = {
  Callout,
  table: Table,
};
