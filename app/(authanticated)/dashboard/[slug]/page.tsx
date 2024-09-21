import UserDetailsForm from "@/components/user-details";

export default function EditPage({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  return (
    <div>
      <UserDetailsForm />
    </div>
  );
}
