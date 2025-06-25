import { redirect } from 'next/navigation';

export default function AboutUsRedirect() {
  redirect('/?scrollTarget=aboutus-section');
}
