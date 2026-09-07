import { redirect } from 'next/navigation'; 

export default function instructorRootPage() {
  redirect('/instructor/assignedprograms');
}