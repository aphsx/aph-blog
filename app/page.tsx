import { redirect } from "next/navigation";

/** TIH เปิดมาที่หน้า docs โดยตรง — redirect ไป overview */
export default function Home() {
  redirect("/guide/overview");
}
