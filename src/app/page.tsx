/**
 * Root page
 * Redirects to the puzzle page
 * @returns Redirects to the puzzle page
 */

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/puzzle");
}
